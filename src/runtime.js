import rubiks from "./rubiks.js";
import rubiksModule from "./rubiks.wasm";
import * as runtimeApi from "./runtimeApi";

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
        performOperation: runtimeApi.performOperation.bind(this, runtime),
        recolor: runtimeApi.performOperation.bind(this, runtime),
        solve: runtimeApi.solve.bind(this, runtime),
        scramble: runtimeApi.scramble.bind(this, runtime),
    };
};
