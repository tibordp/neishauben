import { expect, test } from "vitest";
import { Vector3 } from "three";
import { findOperation } from "./dragControls";

const X = new Vector3(1, 0, 0);
const Y = new Vector3(0, 1, 0);
const Z = new Vector3(0, 0, 1);

const name = (axis, sense, layers, layerCoord) =>
    findOperation(axis, sense, layers, layerCoord)?.displayName;

test("maps outer layer rotations to face turns", () => {
    expect(name(Y, -1, 1, 1)).toBe("U");
    expect(name(Y, 1, 1, 1)).toBe("U'");
    expect(name(Y, -1, 1, -1)).toBe("D'");
    expect(name(Y, 1, 1, -1)).toBe("D");
    expect(name(Z, -1, 1, 1)).toBe("F");
    expect(name(Z, 1, 1, 1)).toBe("F'");
    expect(name(Z, 1, 1, -1)).toBe("B");
    expect(name(X, -1, 1, 1)).toBe("R");
    expect(name(X, 1, 1, -1)).toBe("L");
});

test("maps middle layer rotations to slice turns", () => {
    expect(name(Y, 1, -1, 0)).toBe("E");
    expect(name(Y, -1, -1, 0)).toBe("E'");
    expect(name(X, 1, -1, 0)).toBe("M");
    expect(name(X, -1, -1, 0)).toBe("M'");
    expect(name(Z, -1, -1, 0)).toBe("S");
    expect(name(Z, 1, -1, 0)).toBe("S'");
});

test("maps wide outer layer rotations to two-layer turns", () => {
    expect(name(Y, -1, 2, 1)).toBe("u");
    expect(name(Y, 1, 2, 1)).toBe("u'");
    expect(name(Y, 1, 2, -1)).toBe("d");
    expect(name(Z, -1, 2, 1)).toBe("f");
    expect(name(X, -1, 2, 1)).toBe("r");
    expect(name(X, 1, 2, -1)).toBe("l");
});

test("maps wide middle rotations to whole-cube rotations", () => {
    expect(name(Y, -1, 3, 0)).toBe("y");
    expect(name(Y, 1, 3, 0)).toBe("y'");
    expect(name(Z, -1, 3, 0)).toBe("z");
    expect(name(Z, 1, 3, 0)).toBe("z'");
    expect(name(X, -1, 3, 0)).toBe("x");
    expect(name(X, 1, 3, 0)).toBe("x'");
});

test("every quarter-turn drag has a matching operation", () => {
    for (const axis of [X, Y, Z]) {
        for (const sense of [-1, 1]) {
            for (const layerCoord of [-1, 0, 1]) {
                for (const wide of [false, true]) {
                    const layers = wide
                        ? layerCoord === 0
                            ? 3
                            : 2
                        : layerCoord === 0
                          ? -1
                          : 1;
                    expect(
                        findOperation(axis, sense, layers, layerCoord)
                    ).toBeDefined();
                }
            }
        }
    }
});
