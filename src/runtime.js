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
    };
};
