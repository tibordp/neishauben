import { Plane, Raycaster, Vector2, Vector3 } from "three";
import { rotateAboutPoint } from "./threeUtils";
import { operations, planePermutations } from "./constants";

const AXES = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];

const HALF_PI = Math.PI / 2;
// World-space distance the pointer has to travel on the grabbed face
// before we commit to a rotation axis.
const LOCK_THRESHOLD = 0.1;
// While the layer has twisted less than this, the drag may still switch to
// the other candidate axis if the pointer movement clearly favors it.
const GRACE_ANGLE = Math.PI / 12;
// How decisively (in terms of torque) the other axis has to win before we
// switch, so that near-diagonal drags don't flap between the two axes.
const SWITCH_HYSTERESIS = 1.5;
// How much the layer rotates relative to the arc length the pointer covers.
// 1 would be physical drag-the-surface behavior; slightly more feels snappier.
const DRAG_GAIN = 1.3;
const SNAP_EPSILON = 1e-3;

const resetCubicle = (cubicle) => {
    const [i, j, k] = cubicle.userData;
    cubicle.position.set(i, j, k);
    cubicle.rotation.set(0, 0, 0);
    cubicle.updateMatrix();
};

const planeCenter = (operation) =>
    new Vector3(...planePermutations[operation.plane].center);

// An operation animates as a rotation about the center of its plane by
// direction * quarterTurns * 90° (see createAnimation in neishauben.js), so
// for quarter turns this vector fully identifies the rotation it performs.
const rotationVector = (operation) =>
    planeCenter(operation).multiplyScalar(operation.direction);

// Find the quarter-turn operation that rotates the layer at `layerCoord`
// along `axis` by sense * 90°. `layers` has the same meaning as in the
// operations table (1 = outer layer, -1 = middle, 2 = two layers, 3 = cube).
export const findOperation = (axis, sense, layers, layerCoord) => {
    const wantedRotation = axis.clone().multiplyScalar(sense);
    return operations.find((operation) => {
        if (operation.quarterTurns !== 1 || operation.layers !== layers) {
            return false;
        }
        if (
            (layers === 1 || layers === 2) &&
            planeCenter(operation).distanceTo(
                axis.clone().multiplyScalar(layerCoord)
            ) > 0.1
        ) {
            return false;
        }
        return rotationVector(operation).distanceTo(wantedRotation) < 0.1;
    });
};

export const createDragControls = (
    domElement,
    camera,
    allCubicles,
    allFaces,
    state
) => {
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    const dragPlane = new Plane();

    var ready = false;
    state.runtimePromise.then(() => {
        ready = true;
    });

    var drag = null;

    const pointerRay = (event) => {
        const rect = domElement.getBoundingClientRect();
        pointer.set(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            -((event.clientY - rect.top) / rect.height) * 2 + 1
        );
        raycaster.setFromCamera(pointer, camera);
        return raycaster.ray;
    };

    // Map the drag to a rotation angle linearly: the tangential component
    // of the pointer movement counts as arc length at the grab point's
    // radius. Tracking the pointer's angular position around the axis
    // instead would feel right only when the grabbed sticker moves along
    // the pointer; grabbing a sticker whose rotation arc points into the
    // screen would then require dragging far outside the cube to reach a
    // quarter turn.
    const dragAngle = (movement, axis) => {
        const tangent = axis.clone().cross(drag.startPoint);
        const radiusSq = tangent.lengthSq();
        if (radiusSq < 1e-8) {
            return 0;
        }
        return (DRAG_GAIN * movement.dot(tangent)) / radiusSq;
    };

    const rotateLayer = (cubicles, axis, theta) => {
        cubicles.forEach((cubicle) => {
            rotateAboutPoint(cubicle, new Vector3(0, 0, 0), axis, theta);
            cubicle.updateMatrix();
        });
    };

    // The pointer movement applies a torque about the cube center; the
    // candidate axis (perpendicular to the grabbed face) that captures
    // most of it is the axis the user is twisting about. Returns the
    // candidates sorted by descending score.
    const scoreAxes = (movement) => {
        const torque = drag.startPoint.clone().cross(movement);
        const candidates = [];
        AXES.forEach((axis, index) => {
            if (Math.abs(axis.dot(drag.normal)) > 0.5) {
                return;
            }
            candidates.push({ axis, index, score: Math.abs(torque.dot(axis)) });
        });
        return candidates.sort((a, b) => b.score - a.score);
    };

    const applyAxis = ({ axis, index }) => {
        const layerCoord = drag.cubicleCoords[index];
        drag.axis = axis;
        drag.axisIndex = index;
        drag.layerCoord = layerCoord;
        if (drag.wide) {
            drag.layers = layerCoord === 0 ? 3 : 2;
        } else {
            drag.layers = layerCoord === 0 ? -1 : 1;
        }
        drag.cubicles = allCubicles.filter((cubicle) => {
            const coord = cubicle.userData[index];
            if (drag.wide && layerCoord === 0) {
                return true;
            }
            if (drag.wide) {
                return coord === layerCoord || coord === 0;
            }
            return coord === layerCoord;
        });
        drag.theta = 0;
        drag.locked = true;
    };

    const createSnapAnimation = (finishedDrag, quarterTurns, operation) => {
        const { cubicles, axis } = finishedDrag;
        const target = quarterTurns * HALF_PI;
        var theta = finishedDrag.theta;
        return {
            operation,
            step() {
                const remaining = target - theta;
                const stepAngle =
                    Math.sign(remaining) *
                    Math.min(
                        Math.abs(remaining),
                        Math.max(Math.abs(remaining) * 0.3, 0.04)
                    );
                rotateLayer(cubicles, axis, stepAngle);
                theta += stepAngle;
            },
            finished() {
                return Math.abs(target - theta) < SNAP_EPSILON;
            },
            reset() {
                cubicles.forEach(resetCubicle);
            },
        };
    };

    const onPointerDown = (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }
        if (drag !== null) {
            // A twist is in progress; don't let a second pointer start
            // orbiting the camera underneath it.
            event.stopImmediatePropagation();
            return;
        }
        if (
            !ready ||
            state.currentAnimation !== null ||
            state.operationQueue.length !== 0
        ) {
            return;
        }
        pointerRay(event);
        const hits = raycaster.intersectObjects(allFaces, false);
        if (hits.length === 0) {
            // Not on the cube - leave the event to OrbitControls.
            return;
        }
        const hit = hits[0];
        const normal = new Vector3(...hit.object.userData);
        dragPlane.setFromNormalAndCoplanarPoint(normal, hit.point);
        drag = {
            pointerId: event.pointerId,
            startPoint: hit.point.clone(),
            normal,
            cubicleCoords: hit.object.parent.userData,
            wide: event.shiftKey,
            locked: false,
            theta: 0,
        };
        domElement.setPointerCapture(event.pointerId);
        event.stopImmediatePropagation();
        state.isDragging = true;
        state.notifyChange();
    };

    const onPointerMove = (event) => {
        if (drag === null || event.pointerId !== drag.pointerId) {
            return;
        }
        const point = pointerRay(event).intersectPlane(
            dragPlane,
            new Vector3()
        );
        if (point === null) {
            return;
        }
        const movement = point.clone().sub(drag.startPoint);
        if (!drag.locked) {
            if (movement.length() < LOCK_THRESHOLD) {
                return;
            }
            const [best] = scoreAxes(movement);
            if (!best || best.score <= 0) {
                return;
            }
            applyAxis(best);
        } else if (Math.abs(drag.theta) < GRACE_ANGLE) {
            // Within the grace angle the user can still change their mind
            // about which layer they are twisting. Switch if the other
            // axis now decisively dominates the movement.
            const candidates = scoreAxes(movement);
            const [best] = candidates;
            const current = candidates.find(
                (candidate) => candidate.index === drag.axisIndex
            );
            if (
                best.index !== drag.axisIndex &&
                best.score > SWITCH_HYSTERESIS * current.score
            ) {
                drag.cubicles.forEach(resetCubicle);
                applyAxis(best);
            }
        }
        const angle = Math.max(
            -HALF_PI,
            Math.min(HALF_PI, dragAngle(movement, drag.axis))
        );
        rotateLayer(drag.cubicles, drag.axis, angle - drag.theta);
        drag.theta = angle;
        state.checkAndStartRendering();
    };

    const onPointerUp = (event) => {
        if (drag === null || event.pointerId !== drag.pointerId) {
            return;
        }
        if (domElement.hasPointerCapture(event.pointerId)) {
            domElement.releasePointerCapture(event.pointerId);
        }
        const finishedDrag = drag;
        drag = null;
        state.isDragging = false;
        if (finishedDrag.locked) {
            const quarterTurns = Math.round(finishedDrag.theta / HALF_PI);
            const operation =
                quarterTurns !== 0
                    ? findOperation(
                          finishedDrag.axis,
                          Math.sign(quarterTurns),
                          finishedDrag.layers,
                          finishedDrag.layerCoord
                      )
                    : null;
            if (operation) {
                state.recordManualOperation(operation);
            }
            state.currentAnimation = createSnapAnimation(
                finishedDrag,
                quarterTurns,
                operation || null
            );
        }
        state.notifyChange();
        state.checkAndStartRendering();
    };

    domElement.addEventListener("pointerdown", onPointerDown);
    domElement.addEventListener("pointermove", onPointerMove);
    domElement.addEventListener("pointerup", onPointerUp);
    domElement.addEventListener("pointercancel", onPointerUp);
};
