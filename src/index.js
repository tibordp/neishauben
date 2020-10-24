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

import rubiks from './rubiks.js'
import rubiksModule from './rubiks.wasm'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import './index.css'
import { Vector3 } from 'three'

const colors = [0x009b48, 0xffffff, 0xb71234, 0xffd500, 0x0046ad, 0xff5800]

const promise = rubiks({
    locateFile(path) {
        if (path.endsWith('.wasm')) {
            return rubiksModule
        }
        return path
    },
})

promise.then((module) => {
    console.log(module)
    console.log(JSON.stringify(module._fib(12)))
})

function init() {
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )

    var renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    function createBoxWithRoundedEdges(
        width,
        height,
        depth,
        radius0,
        smoothness
    ) {
        let shape = new THREE.Shape()
        let eps = 0.00001
        let radius = radius0 - eps
        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true)
        shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true)
        shape.absarc(
            width - radius * 2,
            height - radius * 2,
            eps,
            Math.PI / 2,
            0,
            true
        )
        shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true)
        let geometry = new THREE.ExtrudeBufferGeometry(shape, {
            amount: depth - radius0 * 2,
            bevelEnabled: true,
            bevelSegments: smoothness * 2,
            steps: 1,
            bevelSize: radius,
            bevelThickness: radius0,
            curveSegments: smoothness,
        })

        geometry.center()

        return geometry
    }

    const makeCube = (color) => {
        var geometry = createBoxWithRoundedEdges(1, 1, 1, 0.05, 2)
        var material = new THREE.MeshStandardMaterial({ color })
        const cube = new THREE.Mesh(geometry, material)
        return cube
    }

    var light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 0, 10)
    camera.add(light)

    const cube = new THREE.Group()
    const wholeCube = []

    for (var i = 0; i < 3; ++i) {
        const plane = []
        for (var j = 0; j < 3; ++j) {
            const row = []
            for (var k = 0; k < 3; ++k) {
                const cube1 = makeCube(colors[(i * 9 + j * 3 + k) % 6])
                cube1.position.set(i - 1, j - 1, k - 1)
                row.push(cube1)
                cube.add(cube1)
            }
            plane.push(row)
        }
        wholeCube.push(plane)
    }

    scene.add(cube)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = false

    camera.position.z = 6
    scene.add(camera)

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', onWindowResize, false)

    function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
        pointIsWorld = pointIsWorld === undefined ? false : pointIsWorld

        if (pointIsWorld) {
            obj.parent.localToWorld(obj.position) // compensate for world coordinate
        }

        obj.position.sub(point) // remove the offset
        obj.position.applyAxisAngle(axis, theta) // rotate the POSITION
        obj.position.add(point) // re-add the offset

        if (pointIsWorld) {
            obj.parent.worldToLocal(obj.position) // undo world coordinates compensation
        }

        obj.rotateOnAxis(axis, theta) // rotate the OBJECT
    }

    var remaining = Math.PI / 2
    var initialPos = wholeCube[0][1][1].position
    var plane = 0
    console.log(wholeCube[plane][1][1].matrix.clone())

    var animate = function () {
        requestAnimationFrame(animate)
        //console.log(wholeCube[0][1][1].position);

        if (remaining < 0.0001) {
            remaining = Math.PI / 2
            plane = (plane + 1) % 3
            console.log(wholeCube[plane][1][1].matrix.clone())
        }

        const theta = remaining / 10
        remaining -= theta

        wholeCube[plane].forEach((row) =>
            row.forEach((cubicle) => {
                rotateAboutPoint(
                    cubicle,
                    new Vector3(0, 0, 0),
                    initialPos,
                    theta,
                    true
                )
                //cubicle.rotateOnWorldAxis(, 0.001)
            })
        )

        renderer.render(scene, camera)
    }

    animate()
}

init()
