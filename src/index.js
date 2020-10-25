import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './index.css';
import { Vector3 } from 'three';
import { createRuntime } from './runtime';
import { createBoxWithRoundedEdges, rotateAboutPoint } from './threeUtils';
import { colors, runtimeFacePermutation, solvedCube } from './constants';

async function init() {
    var runtime = await createRuntime();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const makeCube = (color) => {
        var geometry = createBoxWithRoundedEdges(1, 1, 1, 0.05, 2);
        var material = new THREE.MeshStandardMaterial({ color });
        const cube = new THREE.Mesh(geometry, material);
        return cube;
    };

    var light = new THREE.PointLight(0xffffff, 1.2, 100);
    light.position.set(0, 0, 5);
    camera.add(light);

    const cube = new THREE.Group();
    const wholeCube = [];

    const createFace = (i, j, k, label) => {
        if (typeof label !== 'undefined') {
            var canvas = document.createElement('canvas');
            canvas.height = 100;
            canvas.width = 100;

            var context = canvas.getContext('2d');
            const size = 18;
            const text = `${label}`;
            context.font = size + 'pt Arial';

            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = 'white';
            context.fillText(text, canvas.width / 2, canvas.height / 2);
            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
        }

        var geo = new THREE.PlaneBufferGeometry(0.9, 0.9, 1, 1);
        geo.center();
        var mat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            map: texture,
            side: THREE.DoubleSide,
        });
        var planed = new THREE.Mesh(geo, mat);
        // Somewhat arbitrary rotations, but just to ensure that normal is facing outwards
        // everywhere (so text labels show up nicely)
        if (i !== 0) {
            planed.rotateY(i * (Math.PI / 2));
        } else if (j !== 0) {
            planed.rotateX(-j * (Math.PI / 2));
        } else if (k == -1) {
            planed.rotateY(Math.PI);
        }
        planed.position.set(i / 2, j / 2, k / 2);
        planed.position.multiplyScalar(1.001);
        return planed;
    };

    const getRank = (i, j, k) => {
        return Math.abs(i) + Math.abs(j) + Math.abs(k);
    };

    const resetCubicle = (cubicle) => {
        const [i, j, k] = cubicle.userData;
        cubicle.position.set(i, j, k);
        cubicle.rotation.set(0, 0, 0);
    };

    const allFaces = [];

    for (var i = -1; i < 2; ++i) {
        const plane = [];
        for (var j = -1; j < 2; ++j) {
            const row = [];
            for (var k = -1; k < 2; ++k) {
                const faces = [];
                switch (getRank(i, j, k)) {
                    case 0: // center of the cube
                        break;
                    case 1: // center of the face
                        faces.push(createFace(i, j, k));
                        break;
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
                const cubicle = makeCube(0xcccccc);
                cubicle.userData = [i, j, k];
                resetCubicle(cubicle);

                cubicle.add(...faces);
                allFaces.push(...faces);

                cube.add(cubicle);
                row.push(cubicle);
            }
            plane.push(row);
        }
        wholeCube.push(plane);
    }

    const setColors = (cubeData) => {
        for (var i = 0; i < 6 * 9; ++i) {
            allFaces[runtimeFacePermutation[i]].material.color.setHex(
                colors[cubeData[i]]
            );
        }
    };

    var currentCube = [...solvedCube];
    setColors(currentCube);

    scene.add(cube);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    camera.position.z = 6;
    scene.add(camera);

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    function getCubiclesForPlane(which) {
        const permuatations = [
            [0, 0, 1],
            [0, 0, -1],
            [0, 1, 0],
            [0, -1, 0],
            [-1, 0, 0],
            [1, 0, 0],
        ];
        const results = [];
        let centerFace = null;

        for (var i = -1; i < 2; ++i) {
            for (var j = -1; j < 2; ++j) {
                for (var k = -1; k < 2; ++k) {
                    if (
                        (!permuatations[which][0] ||
                            permuatations[which][0] === i) &&
                        (!permuatations[which][1] ||
                            permuatations[which][1] === j) &&
                        (!permuatations[which][2] ||
                            permuatations[which][2] === k)
                    ) {
                        const cubicle = wholeCube[i + 1][j + 1][k + 1];
                        if (getRank(i, j, k) == 1) {
                            centerFace = cubicle;
                        }
                        results.push(cubicle);
                    }
                }
            }
        }
        return [centerFace, results];
    }
    var quarterTurn = Math.PI / 2;
    var remaining = quarterTurn;
    var plane = 0;
    var [centerFace, cubicles] = getCubiclesForPlane(plane);

    var animate = function () {
        requestAnimationFrame(animate);
        // eslint-disable-next-line no-constant-condition
        if (true) {
            if (remaining < 0.0001) {
                currentCube = runtime.performOperation(
                    currentCube,
                    plane * 2 + 1
                );
                setColors(currentCube);
                remaining = quarterTurn;
                plane = (plane + 1) % 6;
                cubicles.forEach((cubicle) => resetCubicle(cubicle));
                [centerFace, cubicles] = getCubiclesForPlane(plane);
            }

            const theta =
                (1.1 -
                    Math.pow((2 * remaining - quarterTurn) / quarterTurn, 2)) *
                0.07;
            remaining -= theta;

            cubicles.forEach((cubicle) => {
                rotateAboutPoint(
                    cubicle,
                    new Vector3(0, 0, 0),
                    centerFace.position,
                    theta,
                    true
                );
            });
        }
        renderer.render(scene, camera);
    };

    animate();
}

init();
