import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./index.css";
import "purecss/build/pure.css";

import { Vector3 } from "three";
import { createRuntime } from "./runtime";
import { createBoxWithRoundedEdges, rotateAboutPoint } from "./threeUtils";
import {
    colors,
    runtimeFacePermutation,
    solvedCube,
    planePermutations,
} from "./constants";
import { createControls } from "./controls";

const getRank = (i, j, k) => {
    return Math.abs(i) + Math.abs(j) + Math.abs(k);
};

const resetCubicle = (cubicle) => {
    const [i, j, k] = cubicle.userData;
    cubicle.position.set(i, j, k);
    cubicle.rotation.set(0, 0, 0);
};

const getCubiclesForPlane = (allCubicles, plane, numLayers) => {
    const results = [];
    let pivotCubicle = null;

    function coordinateMatches(coordinateSelector, coordinate, numLayers) {
        switch (numLayers) {
            case -1:
                // middle layer
                return coordinateSelector === 0 || coordinate == 0;

            case 1:
                // just pivot layer
                return (
                    coordinateSelector === 0 ||
                    coordinateSelector === coordinate
                );
            case 2:
                // pivot layer and the middle layer
                return (
                    coordinateSelector === 0 ||
                    coordinateSelector === coordinate ||
                    coordinate == 0
                );
            case 3:
                // whole cube
                return true;
        }
    }

    const planeSelector = planePermutations[plane].center;
    function coordinatesMatch(i, j, k, numLayers) {
        return (
            coordinateMatches(planeSelector[0], i, numLayers) &&
            coordinateMatches(planeSelector[1], j, numLayers) &&
            coordinateMatches(planeSelector[2], k, numLayers)
        );
    }

    allCubicles.forEach((cubicle) => {
        const [i, j, k] = cubicle.userData;
        if (coordinatesMatch(i, j, k, numLayers)) {
            results.push(cubicle);
        }
        if (getRank(i, j, k) === 1 && coordinatesMatch(i, j, k, 1)) {
            pivotCubicle = cubicle;
        }
    });

    return [pivotCubicle, results];
};

const createAnimation = (allCubicles, operation) => {
    const { plane, direction, layers, quarterTurns } = operation;
    const targetRotation = (quarterTurns * Math.PI) / 2;
    var remaining = targetRotation;
    const [pivotCubicle, cubicles] = getCubiclesForPlane(
        allCubicles,
        plane,
        layers
    );

    return {
        step() {
            if (remaining <= 0) {
                return;
            }

            const theta =
                (1.1 -
                    Math.pow(
                        (2 * remaining - targetRotation) / targetRotation,
                        2
                    )) *
                0.07 *
                quarterTurns;
            remaining -= theta;

            cubicles.forEach((cubicle) => {
                rotateAboutPoint(
                    cubicle,
                    new Vector3(0, 0, 0),
                    pivotCubicle.position,
                    theta * direction,
                    true
                );
            });
        },
        reset() {
            cubicles.forEach((cubicle) => resetCubicle(cubicle));
        },
        finished() {
            return remaining <= 0;
        },
    };
};

const createCubicle = (color) => {
    var geometry = createBoxWithRoundedEdges(1, 1, 1, 0.05, 5);
    var material = new THREE.MeshStandardMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
};

const createFace = (i, j, k, label) => {
    if (typeof label !== "undefined") {
        var canvas = document.createElement("canvas");
        canvas.height = 256;
        canvas.width = 256;

        var context = canvas.getContext("2d");
        const size = 48;
        const text = `${label}`;
        context.font = size + "pt Arial";

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "black";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
    }

    const geometry = new THREE.PlaneBufferGeometry(0.9, 0.9, 1, 1);
    geometry.center();

    const material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        map: texture || null,
        side: THREE.DoubleSide,
    });
    var face = new THREE.Mesh(geometry, material);

    // Somewhat arbitrary rotations, but just to ensure that normal is facing outwards
    // everywhere (so text labels show up nicely)
    if (i !== 0) {
        face.rotateY(i * (Math.PI / 2));
    } else if (j !== 0) {
        face.rotateX(-j * (Math.PI / 2));
    } else if (k == -1) {
        face.rotateY(Math.PI);
    }
    face.position.set(i / 2, j / 2, k / 2);
    face.position.multiplyScalar(1.001);
    face.userData = [i, j, k];

    return face;
};

const setColors = (allFaces, cubeData) => {
    for (var i = 0; i < 6 * 9; ++i) {
        allFaces[runtimeFacePermutation[i]].material.color.setHex(
            colors[cubeData[i]]
        );
    }
};

const createRubiksCube = () => {
    const allFaces = [];
    const allCubicles = [];

    const rubiksCube = new THREE.Group();
    for (var i = -1; i < 2; ++i) {
        for (var j = -1; j < 2; ++j) {
            for (var k = -1; k < 2; ++k) {
                const faces = [];
                // Order in which faces are created is very important, as the mapping
                // from face to position in the array for interacting with the runtime
                // is defined in runtimeFacePermutation.

                switch (getRank(i, j, k)) {
                    case 0: // center of the cube
                        break;
                    case 1: {
                        // center of the face
                        const label = planePermutations.find(
                            ({ center: [a, b, c] }) =>
                                a == i && b == j && c == k
                        ).name;
                        faces.push(createFace(i, j, k, label));
                        break;
                    }
                    case 2: // edge
                        if (i == 0) {
                            faces.push(createFace(i, j, 0));
                            faces.push(createFace(i, 0, k));
                        } else if (j == 0) {
                            faces.push(createFace(i, j, 0));
                            faces.push(createFace(0, j, k));
                        } else if (k == 0) {
                            faces.push(createFace(i, 0, k));
                            faces.push(createFace(0, j, k));
                        }
                        break;
                    case 3: // corner
                        faces.push(createFace(i, 0, 0));
                        faces.push(createFace(0, j, 0));
                        faces.push(createFace(0, 0, k));
                        break;
                }
                const cubicle = createCubicle(0xcccccc);
                cubicle.userData = [i, j, k];
                resetCubicle(cubicle);

                cubicle.add(...faces);
                allFaces.push(...faces);

                rubiksCube.add(cubicle);
                allCubicles.push(cubicle);
            }
        }
    }

    return [rubiksCube, allCubicles, allFaces];
};

async function init() {
    var runtime = await createRuntime();
    window._runtime = runtime;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 6;
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.PointLight(0xffffff, 1.2, 100);
    light.position.set(0, 0, 5);
    camera.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    const [rubiksCube, allCubicles, allFaces] = createRubiksCube();
    scene.add(rubiksCube);

    const state = {
        runtime,
        currentCube: [...solvedCube],
        operationQueue: [],
        setColors: (cubeData) => setColors(allFaces, cubeData),
    };
    setColors(allFaces, state.currentCube);

    var animation = null;
    var currentOperation = null;

    const animate = () => {
        window.requestAnimationFrame(animate);
        // eslint-disable-next-line no-constant-condition
        if (currentOperation !== null) {
            if (animation.finished()) {
                animation.reset();
                state.currentCube = runtime.performOperation(
                    state.currentCube,
                    currentOperation.code
                );
                setColors(allFaces, state.currentCube);
                currentOperation = null;
            } else {
                animation.step();
            }
        }

        if (currentOperation === null && state.operationQueue.length !== 0) {
            currentOperation = state.operationQueue.shift();
            animation = createAnimation(allCubicles, currentOperation);
        }

        renderer.render(scene, camera);
    };

    createControls(state);

    window.requestAnimationFrame(animate);
}

init();
