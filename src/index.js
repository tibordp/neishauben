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

import rubiks from "./rubiks.js";
import rubiksModule from "./rubiks.wasm";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import "./index.css";

const promise = rubiks({
  locateFile(path) {
    if (path.endsWith(".wasm")) {
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

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const makeCube = (color) => {
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(geometry, material);
  };

  const cube = new THREE.Group()
  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < 3; ++j) {
      for (var k = 0; k < 3; ++k) {
        const cube1 = makeCube( ((((i + 1) * 50) * 255) + ((j + 1) * 50)) * 255 + ((k + 1) * 50));
        cube1.position.set((i-1)*1.05, (j-1)*1.05, (k-1)*1.05)
        cube.add(cube1);
      }
    }
  }

  scene.add(cube);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.enableZoom = false

  camera.position.z = 6;

  
  const onWindowResize = () => {    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  window.addEventListener( 'resize', onWindowResize, false );

  var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
}



init();
