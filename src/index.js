/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import rubiks from './rubiks.js';
import rubiksModule from './rubiks.wasm';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './index.css';
import { Vector3 } from 'three';

const colors = [0x1919aa, 0x00cd00, 0xffff00, 0xffffff, 0xff7500, 0xde1a1a];
const actualPermuatations = [
    20,
    32,
    53,
    12,
    27,
    45,
    7,
    25,
    40,
    2,
    22,
    35,
    9,
    26,
    42,
    15,
    29,
    48,
    14,
    28,
    47,
    17,
    30,
    50,
    19,
    31,
    52,
    6,
    24,
    39,
    4,
    23,
    37,
    1,
    21,
    34,
    0,
    8,
    13,
    3,
    10,
    16,
    5,
    11,
    18,
    46,
    41,
    33,
    49,
    43,
    36,
    51,
    44,
    38,
];

const promise = rubiks({
    locateFile(path) {
        if (path.endsWith('.wasm')) {
            return rubiksModule;
        }
        return path;
    },
});

promise.then((module) => {
    console.log(module);
    console.log(JSON.stringify(module._fib(12)));
});

function init() {
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

    function createBoxWithRoundedEdges(
        width,
        height,
        depth,
        radius0,
        smoothness
    ) {
        let shape = new THREE.Shape();
        let eps = 0.00001;
        let radius = radius0 - eps;
        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(
            width - radius * 2,
            height - radius * 2,
            eps,
            Math.PI / 2,
            0,
            true
        );
        shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
        let geometry = new THREE.ExtrudeBufferGeometry(shape, {
            amount: depth - radius0 * 2,
            bevelEnabled: true,
            bevelSegments: smoothness * 2,
            steps: 1,
            bevelSize: radius,
            bevelThickness: radius0,
            curveSegments: smoothness,
        });

        geometry.center();

        return geometry;
    }

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
            console.log(canvas.width, canvas.height);
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
        planed.position.multiplyScalar(1.01);
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
                const cubicle = makeCube(0x101010);
                cubicle.userData = [i, j, k];
                resetCubicle(cubicle);

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
                cubicle.add(...faces);
                allFaces.push(...faces);

                cube.add(cubicle);
                row.push(cubicle);
            }
            plane.push(row);
        }
        wholeCube.push(plane);
    }
    console.log(allFaces);

    const setColors = (cubeData) => {
        for (var i = 0; i < 6 * 9; ++i) {
            allFaces[actualPermuatations[i]].material.color.setHex(
                colors[cubeData[i]]
            );
        }
    };

    setColors([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
    ]);

    const populate = (s) => {
        setColors(s.split('').map((ch) => parseInt(ch)));
    };

    populate('000000000111111111222222444555333333444444333555555222');

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

    function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
        pointIsWorld = pointIsWorld === undefined ? false : pointIsWorld;

        if (pointIsWorld) {
            obj.parent.localToWorld(obj.position); // compensate for world coordinate
        }

        obj.position.sub(point); // remove the offset
        obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
        obj.position.add(point); // re-add the offset

        if (pointIsWorld) {
            obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
        }

        obj.rotateOnAxis(axis, theta); // rotate the OBJECT
    }

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
            //console.log(wholeCube[0][1][1].position);
            if (remaining < 0.0001) {
                remaining = quarterTurn;
                plane = (plane + 1) % 6;
                cubicles.forEach((cubicle) => resetCubicle(cubicle));
                [centerFace, cubicles] = getCubiclesForPlane(plane);
                console.log(centerFace.position.clone());
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
