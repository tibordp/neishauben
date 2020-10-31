const { scrambled, solve, performOperation } = require("./runtimeApi");
const runtime = require("./rubiks");

beforeAll(() => {
    return new Promise((resolve, reject) => {
        runtime.onRuntimeInitialized = () => {
            try {
                runtime._init();
                console.log("Runtime initialized!");
                resolve();
            } catch (err) {
                reject(err);
            }
        };
    });
});

const solvedCube = new Array(54).fill(0).map((_, i) => Math.floor(i / 9));

test("solves a rubiks cube", () => {
    var cube = scrambled(runtime, 50);
    const alg = solve(runtime, cube);

    alg.forEach((operation) => {
        cube = performOperation(runtime, cube, operation);
    });

    expect(cube).toEqual(solvedCube);
});
