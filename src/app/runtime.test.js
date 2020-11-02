import { expect, test } from "@jest/globals";
import { solvedCube as SOLVED_CUBE } from "./constants";
import { createRuntime } from "./runtime.js";
import { printAlgorithm, parseAlgorithm } from "./cubeUtils";

let runtime;
beforeAll(async () => {
    runtime = await createRuntime();
});

test("solves a rubiks cube", () => {
    const scrambleAlg = parseAlgorithm(
        "D U' R2 U' F' R' B' D' F D L2 U2 D F R D F2 R F B' R' U' R' U R2"
    );
    const scrambledCube = runtime.performAlgorithm(SOLVED_CUBE, scrambleAlg);
    const alg = runtime.solve(scrambledCube);

    expect(runtime.isSolved(scrambledCube)).toBe(false);
    const solvedCube = runtime.performAlgorithm(scrambledCube, alg);
    expect(runtime.isSolved(solvedCube)).toBe(true);
});

test("inverts an algorithm", () => {
    const scrambleAlg = parseAlgorithm(
        "D U' R2 U' F' R' B' D' F D L2 U2 D F R D F2 R F B' R' U' R' U R2"
    );
    const scrambledCube = runtime.performAlgorithm(SOLVED_CUBE, scrambleAlg);
    expect(runtime.isSolved(scrambledCube)).toBe(false);

    const invertedScrambleAlg = runtime.invertAlgorithm(scrambleAlg);

    const solvedCube = runtime.performAlgorithm(
        scrambledCube,
        invertedScrambleAlg
    );
    expect(runtime.isSolved(solvedCube)).toBe(true);
});

test("optimizes an algorithm - basic 1", () => {
    const scrambleAlg = parseAlgorithm("F2 L' L2 L L' L2 L L' L2 L L' L2 L B2");
    const optimizedAlg = runtime.optimizeAlgorithm(scrambleAlg);

    expect(printAlgorithm(optimizedAlg)).toEqual("F2 B2");
});

test("optimizes an algorithm - large lookahead", () => {
    const scrambleAlg = parseAlgorithm("F B F' B'");
    const optimizedAlg = runtime.optimizeAlgorithm(scrambleAlg);

    expect(printAlgorithm(optimizedAlg)).toEqual("");
});

test("optimizes an algorithm - complicated", () => {
    const scrambleAlg = parseAlgorithm("L F B z f' F' M R'");
    const optimizedAlg = runtime.optimizeAlgorithm(scrambleAlg);

    expect(printAlgorithm(optimizedAlg)).toEqual("x'");
});
