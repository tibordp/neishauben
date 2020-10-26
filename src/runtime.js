import rubiks from "./rubiks.js";
import rubiksModule from "./rubiks.wasm";

export const createRuntime = async () => {
    const runtime = await rubiks({
        locateFile(path) {
            if (path.endsWith(".wasm")) {
                return rubiksModule;
            }
            return path;
        },
    });

    // Initialize the transformation tables
    runtime._init();

    return {
        performOperation(cubeData, operation) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(54);
            for (var i = 0; i < 54; ++i) {
                runtime.setValue(ptr + i, cubeData[i]);
            }
            runtime._perform(ptr, operation);
            const result = [];
            for (i = 0; i < 54; ++i) {
                result[i] = runtime.getValue(ptr + i);
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        recolor(cubeData) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(54);
            for (var i = 0; i < 54; ++i) {
                runtime.setValue(ptr + i, cubeData[i]);
            }
            runtime._recolor(ptr);
            const result = [];
            for (i = 0; i < 54; ++i) {
                result[i] = runtime.getValue(ptr + i);
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        solve(cubeData) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(54);
            var out = runtime.stackAlloc(1024);
            for (var i = 0; i < 54; ++i) {
                runtime.setValue(ptr + i, cubeData[i]);
            }
            runtime._solve(ptr, out);
            const result = [];
            for (i = 0; i < 1024; ++i) {
                const operationCode = runtime.getValue(out + i);
                if (operationCode === -1) {
                    break;
                } else if (operationCode === -2) {
                    continue;
                }
                result.push(operationCode);
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
        scramble(length) {
            var stackPtr = runtime.stackSave();
            var ptr = runtime.stackAlloc(length + 1);
            runtime._cube_scramble(ptr, length);
            const result = [];
            for (var i = 0; ; ++i) {
                const operationCode = runtime.getValue(ptr + i);
                if (operationCode === -1) {
                    break;
                }
                result[i] = operationCode;
            }
            runtime.stackRestore(stackPtr);
            return result;
        },
    };
};
