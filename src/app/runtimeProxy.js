import RuntimeWorker from "./runtime.worker.js";

export const createWorkerRuntime = () => {
    return new Promise((mainResolve) => {
        const worker = new RuntimeWorker();

        var index = 0;
        const promises = {};

        const workerProxy = new Proxy(worker, {
            get: function (target, prop) {
                return (...args) => {
                    return new Promise((resolve, reject) => {
                        const promiseIndex = index++;
                        promises[promiseIndex] = [resolve, reject];
                        target.postMessage({
                            action: prop,
                            index: promiseIndex,
                            args,
                        });
                    });
                };
            },
        });

        const terminate = () => worker.terminate();

        worker.onmessage = function (event) {
            const { action } = event.data;
            switch (action) {
                case "initialized":
                    mainResolve([workerProxy, terminate]);
                    break;
                case "success": {
                    const { index, result } = event.data;
                    const [resolve] = promises[index];
                    resolve(result);
                    delete promises[index];
                    break;
                }
                case "failure": {
                    const { index, error } = event.data;
                    const [, reject] = promises[index];
                    reject(error);
                    delete promises[index];
                    break;
                }
            }
        };
    });
};
