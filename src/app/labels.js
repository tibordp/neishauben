import {
    CanvasTexture,
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    Quaternion,
    SRGBColorSpace,
    Vector3,
} from "three";
import { createRoundRect } from "./threeUtils";
import { planePermutations } from "./constants";

// How long it takes a label to settle (rotate back / crossfade) after the
// cubicle it rode along with has snapped back into place.
const TRANSITION_MS = 250;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const createLabelTexture = (text) => {
    const canvas = document.createElement("canvas");
    canvas.height = 256;
    canvas.width = 256;
    const context = canvas.getContext("2d");
    context.font = "75pt Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.offset.set(0.5, 0.5);
    return texture;
};

const createLabelMesh = (geometry) => {
    const material = new MeshBasicMaterial({
        color: 0xffffff,
        map: null,
        side: DoubleSide,
        transparent: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -8,
    });
    const mesh = new Mesh(geometry, material);
    // Drawn after the sticker it sits on, which is coplanar.
    mesh.renderOrder = 1;
    // Drag controls raycast into the cubicles recursively and expect to
    // hit either the cubicle body or one of its stickers.
    mesh.raycast = () => {};
    mesh.visible = false;
    return mesh;
};

const positionKey = (vector) =>
    [vector.x, vector.y, vector.z].map((c) => Math.round(c * 2)).join(",");

// Positional face labels (U, D, L, R, F, B) live on the center stickers.
// They travel with the cubicle during an animation, and once the cubicle
// snaps back into its resting place the label that should be at that
// position is (a) the same letter, rotated by some quarter turns, or (b) a
// different letter altogether. Instead of snapping, the label starts out
// exactly as it was displayed and then eases into place: rotating back for
// (a), and crossfading between the two letters while rotating for (b).
export const createLabels = (centerFaces) => {
    const textures = Object.fromEntries(
        planePermutations.map(({ name }) => [name, createLabelTexture(name)])
    );
    const geometry = createRoundRect(0.88, 0.88, 0.05);

    const labels = centerFaces.map((face) => {
        const name = planePermutations.find(
            ({ center: [a, b, c] }) =>
                face.userData[0] == a &&
                face.userData[1] == b &&
                face.userData[2] == c
        ).name;
        const current = createLabelMesh(geometry);
        current.material.map = textures[name];
        current.visible = true;
        const outgoing = createLabelMesh(geometry);
        face.add(current, outgoing);
        return {
            face,
            name,
            // Letter currently mapped onto `current` (differs from `name`
            // only until a crossfade has been started).
            shown: name,
            current,
            outgoing,
            // The state the label eases away from, or null when at rest.
            transition: null,
        };
    });

    var snapshot = null;

    const worldPosition = new Vector3();
    const worldQuaternion = new Quaternion();

    const settle = (label) => {
        label.current.rotation.z = 0;
        label.current.material.opacity = 1;
        label.outgoing.visible = false;
        label.transition = null;
    };

    return {
        // Record what every center position is currently showing. Must be
        // called with world matrices reflecting the last rendered frame,
        // i.e. before the cubicles are reset.
        capture() {
            snapshot = {};
            labels.forEach((label) => {
                label.face.getWorldPosition(worldPosition);
                label.current.getWorldQuaternion(worldQuaternion);
                snapshot[positionKey(worldPosition)] = {
                    name: label.shown,
                    opacity: label.current.material.opacity,
                    quaternion: worldQuaternion.clone(),
                };
            });
        },
        // Start easing every label from what was captured to its resting
        // state. World matrices must reflect the reset cubicles.
        begin(now) {
            if (snapshot === null) {
                return;
            }
            const resting = new Quaternion();
            const delta = new Quaternion();
            labels.forEach((label) => {
                label.face.getWorldPosition(worldPosition);
                const arrived = snapshot[positionKey(worldPosition)];
                if (!arrived) {
                    settle(label);
                    return;
                }
                label.face.getWorldQuaternion(resting);
                // Rotation, in the face's local frame, that takes the
                // resting orientation to what was on screen. Both share
                // the face normal, so it is a rotation about local z.
                delta.copy(resting).invert().multiply(arrived.quaternion);
                const angle = 2 * Math.atan2(delta.z, delta.w);
                const sameLetter = arrived.name === label.name;
                if (
                    sameLetter &&
                    Math.abs(angle) < 1e-3 &&
                    arrived.opacity > 0.999
                ) {
                    settle(label);
                    return;
                }
                label.transition = {
                    start: now,
                    angle,
                    crossfade: !sameLetter,
                    fromOpacity: sameLetter ? arrived.opacity : 0,
                    outgoingOpacity: arrived.opacity,
                };
                label.current.material.map = textures[label.name];
                label.shown = label.name;
                if (sameLetter) {
                    label.outgoing.visible = false;
                } else {
                    label.outgoing.material.map = textures[arrived.name];
                    label.outgoing.material.opacity = arrived.opacity;
                    label.outgoing.visible = true;
                }
            });
            snapshot = null;
        },
        // Advance the transitions; returns whether any is still running.
        step(now) {
            var active = false;
            labels.forEach((label) => {
                const transition = label.transition;
                if (transition === null) {
                    return;
                }
                const t = Math.min(1, (now - transition.start) / TRANSITION_MS);
                const progress = easeOut(t);
                const angle = transition.angle * (1 - progress);
                label.current.rotation.z = angle;
                label.current.material.opacity =
                    transition.fromOpacity +
                    (1 - transition.fromOpacity) * progress;
                if (transition.crossfade) {
                    label.outgoing.rotation.z = angle;
                    label.outgoing.material.opacity =
                        transition.outgoingOpacity * (1 - progress);
                }
                if (t >= 1) {
                    settle(label);
                } else {
                    active = true;
                }
            });
            return active;
        },
    };
};
