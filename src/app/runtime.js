import rubiks from "../../build/rubiks.js";
import rubiksModule from "../../build/rubiks.wasm";

export const createRuntime = async () => {
    const runtime = await rubiks({
        locateFile(path) {
            if (path.endsWith(".wasm")) {
                return rubiksModule;
            }
            return path;
        },
    });

    // Initialize the transformation and optimization tables
    runtime._init();

    return {
        performOperation(cubeData, operation) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(54);
            for (var i = 0; i < 54; ++i) {
                runtime.setValue(ptr + i, cubeData[i]);
            }
            runtime._perform(ptr, operation);
            const result = new Array(54);
            for (i = 0; i < 54; ++i) {
                result[i] = runtime.getValue(ptr + i);
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        performAlgorithm(cubeData, algorithm) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(54);
            var algoPtr = runtime.stackAlloc(4 * algorithm.length);
            for (var i = 0; i < 54; ++i) {
                runtime.setValue(ptr + i, cubeData[i]);
            }
            for (i = 0; i < algorithm.length; ++i) {
                runtime.setValue(algoPtr + 4 * i, algorithm[i], "i32");
            }
            runtime._perform_algorithm(ptr, algoPtr, algorithm.length);
            const result = new Array(54);
            for (i = 0; i < 54; ++i) {
                result[i] = runtime.getValue(ptr + i);
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        invertAlgorithm(algorithm) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(4 * algorithm.length);
            for (var i = 0; i < algorithm.length; ++i) {
                runtime.setValue(ptr + 4 * i, algorithm[i], "i32");
            }
            runtime._invert_algorithm(ptr, algorithm.length);
            const result = new Array(algorithm.length);
            for (i = 0; i < algorithm.length; ++i) {
                result[i] = runtime.getValue(ptr + 4 * i, "i32");
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        optimizeAlgorithm(algorithm) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(4 * algorithm.length);
            for (var i = 0; i < algorithm.length; ++i) {
                runtime.setValue(ptr + 4 * i, algorithm[i], "i32");
            }
            const length = runtime._optimize_algorithm(ptr, algorithm.length);
            const result = new Array(length);
            for (i = 0; i < length; ++i) {
                result[i] = runtime.getValue(ptr + 4 * i, "i32");
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        reorientCube(cubeData) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(54);
            for (var i = 0; i < 54; ++i) {
                runtime.setValue(ptr + i, cubeData[i]);
            }
            runtime._reorient_cube(ptr);
            const result = new Array(54);
            for (i = 0; i < 54; ++i) {
                result[i] = runtime.getValue(ptr + i);
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        solve(cubeData) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(54);
            var out = runtime.stackAlloc(512 * 4);
            for (var i = 0; i < 54; ++i) {
                runtime.setValue(ptr + i, cubeData[i]);
            }
            const length = runtime._solve(ptr, out);
            const result = new Array(length);
            for (i = 0; i < length; ++i) {
                result[i] = runtime.getValue(out + i * 4, "i32");
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        generateScramble(length, onlyBasic = true) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(length * 4);
            runtime._generate_scramble(ptr, length, onlyBasic ? 1 : 0);
            const result = new Array(length);
            for (var i = 0; i < length; ++i) {
                const operationCode = runtime.getValue(ptr + i * 4, "i32");
                result[i] = operationCode;
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        isSolved(cubeData) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(54);
            for (var i = 0; i < 54; ++i) {
                runtime.setValue(ptr + i, cubeData[i]);
            }
            const result = runtime._is_solved(ptr);
            runtime.stackRestore(stackPtr);
            return result !== 0;
        },
    };
};
