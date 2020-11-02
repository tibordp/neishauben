import { createRuntime } from "./runtime.js";

createRuntime().then((runtime) => {
    console.log("Worker initialized!");
    onmessage = async (event) => {
        const { action, index, args } = event.data;
        try {
            const result = runtime[action](...args);
            postMessage({ action: "success", index, result });
        } catch (error) {
            postMessage({ action: "failure", index, error });
        }
    };
    postMessage({ action: "initialized" });
});
