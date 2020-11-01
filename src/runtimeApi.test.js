const {
    scrambled,
    solve,
    scramble,
    performAlgorithm,
    invertAlgorithm,
    isSolved,
} = require("./runtimeApi");
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

const SOLVED_CUBE = new Array(54).fill(0).map((_, i) => Math.floor(i / 9));

test("solves a rubiks cube", () => {
    const scrambledCube = scrambled(runtime, 50);
    const alg = solve(runtime, scrambledCube);

    expect(isSolved(runtime, scrambledCube)).toBe(false);
    const solvedCube = performAlgorithm(runtime, scrambledCube, alg);
    expect(isSolved(runtime, solvedCube)).toBe(true);
});

test("inverts an algorithm", () => {
    const scrambleAlg = scramble(runtime, 50);
    const scrambledCube = performAlgorithm(runtime, SOLVED_CUBE, scrambleAlg);
    expect(isSolved(runtime, scrambledCube)).toBe(false);

    const invertedScrambleAlg = invertAlgorithm(runtime, scrambleAlg);

    const solvedCube = performAlgorithm(
        runtime,
        scrambledCube,
        invertedScrambleAlg
    );
    expect(isSolved(runtime, solvedCube)).toBe(true);
});
