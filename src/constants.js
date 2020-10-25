export const colors = [
    0x1919aa,
    0x00cd00,
    0xffff00,
    0xffffff,
    0xff7500,
    0xde1a1a,
];

// prettier-ignore
export const runtimeFacePermutation = [
  20, 32, 53, 12, 27, 45, 7,  25, 40, // front
  2,  22, 35, 9,  26, 42, 15, 29, 48, // back
  14, 28, 47, 17, 30, 50, 19, 31, 52, // up
  6,  24, 39, 4,  23, 37, 1,  21, 34, // down
  0,  8,  13, 3,  10, 16, 5,  11, 18, // left
  46, 41, 33, 49, 43, 36, 51, 44, 38  // right
];

// prettier-ignore
export const solvedCube = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 
    2, 2, 2, 2, 2, 2, 2, 2, 2, 
    3, 3, 3, 3, 3, 3, 3, 3, 3, 
    4, 4, 4, 4, 4, 4, 4, 4, 4, 
    5, 5, 5, 5, 5, 5, 5, 5, 5
]

// prettier-ignore
export const planePermutations = [
  { id: 0, name: "F", center: [ 0,  0,  1] },
  { id: 1, name: "B", center: [ 0,  0, -1] },
  { id: 2, name: "U", center: [ 0,  1,  0] },
  { id: 3, name: "D", center: [ 0, -1,  0] },
  { id: 4, name: "L", center: [-1,  0,  0] },
  { id: 5, name: "R", center: [ 1,  0,  0] },
];

// prettier-ignore
export const operations = [
    { code: 0,  displayName: "F",  plane: 0, direction: -1, layers:  1, quarterTurns: 1 },
    { code: 1,  displayName: "F'", plane: 0, direction:  1, layers:  1, quarterTurns: 1 },
    { code: 2,  displayName: "B",  plane: 1, direction: -1, layers:  1, quarterTurns: 1 },
    { code: 3,  displayName: "B'", plane: 1, direction:  1, layers:  1, quarterTurns: 1 },
    { code: 4,  displayName: "U",  plane: 2, direction: -1, layers:  1, quarterTurns: 1 },
    { code: 5,  displayName: "U'", plane: 2, direction:  1, layers:  1, quarterTurns: 1 },
    { code: 6,  displayName: "D",  plane: 3, direction: -1, layers:  1, quarterTurns: 1 },
    { code: 7,  displayName: "D'", plane: 3, direction:  1, layers:  1, quarterTurns: 1 },
    { code: 8,  displayName: "L",  plane: 4, direction: -1, layers:  1, quarterTurns: 1 },
    { code: 9,  displayName: "L'", plane: 4, direction:  1, layers:  1, quarterTurns: 1 },
    { code: 10, displayName: "R",  plane: 5, direction: -1, layers:  1, quarterTurns: 1 },
    { code: 11, displayName: "R'", plane: 5, direction:  1, layers:  1, quarterTurns: 1 },
    { code: 12, displayName: "f",  plane: 0, direction: -1, layers:  2, quarterTurns: 1 },
    { code: 13, displayName: "f'", plane: 0, direction:  1, layers:  2, quarterTurns: 1 },
    { code: 14, displayName: "b",  plane: 1, direction: -1, layers:  2, quarterTurns: 1 },
    { code: 15, displayName: "b'", plane: 1, direction:  1, layers:  2, quarterTurns: 1 },
    { code: 16, displayName: "u",  plane: 2, direction: -1, layers:  2, quarterTurns: 1 },
    { code: 17, displayName: "u'", plane: 2, direction:  1, layers:  2, quarterTurns: 1 },
    { code: 18, displayName: "d",  plane: 3, direction: -1, layers:  2, quarterTurns: 1 },
    { code: 19, displayName: "d'", plane: 3, direction:  1, layers:  2, quarterTurns: 1 },
    { code: 20, displayName: "l",  plane: 4, direction: -1, layers:  2, quarterTurns: 1 },
    { code: 21, displayName: "l'", plane: 4, direction:  1, layers:  2, quarterTurns: 1 },
    { code: 22, displayName: "r",  plane: 5, direction: -1, layers:  2, quarterTurns: 1 },
    { code: 23, displayName: "r'", plane: 5, direction:  1, layers:  2, quarterTurns: 1 },
    { code: 24, displayName: "F2", plane: 0, direction:  1, layers:  1, quarterTurns: 2 },
    { code: 25, displayName: "B2", plane: 1, direction:  1, layers:  1, quarterTurns: 2 },
    { code: 26, displayName: "U2", plane: 2, direction:  1, layers:  1, quarterTurns: 2 },
    { code: 27, displayName: "D2", plane: 3, direction:  1, layers:  1, quarterTurns: 2 },
    { code: 28, displayName: "L2", plane: 4, direction:  1, layers:  1, quarterTurns: 2 },
    { code: 29, displayName: "R2", plane: 5, direction:  1, layers:  1, quarterTurns: 2 },
    { code: 30, displayName: "z",  plane: 0, direction: -1, layers:  3, quarterTurns: 1 },
    { code: 31, displayName: "z'", plane: 0, direction:  1, layers:  3, quarterTurns: 1 },
    { code: 32, displayName: "y",  plane: 2, direction: -1, layers:  3, quarterTurns: 1 },
    { code: 33, displayName: "y'", plane: 2, direction:  1, layers:  3, quarterTurns: 1 },
    { code: 34, displayName: "x'", plane: 5, direction:  1, layers:  3, quarterTurns: 1 },
    { code: 35, displayName: "x",  plane: 5, direction: -1, layers:  3, quarterTurns: 1 },
    { code: 36, displayName: "S",  plane: 0, direction: -1, layers: -1, quarterTurns: 1 },
    { code: 37, displayName: "S'", plane: 1, direction: -1, layers: -1, quarterTurns: 1 },
    { code: 38, displayName: "E'", plane: 2, direction: -1, layers: -1, quarterTurns: 1 },
    { code: 39, displayName: "E",  plane: 3, direction: -1, layers: -1, quarterTurns: 1 },
    { code: 40, displayName: "M",  plane: 4, direction: -1, layers: -1, quarterTurns: 1 },
    { code: 41, displayName: "M'", plane: 5, direction: -1, layers: -1, quarterTurns: 1 },
    { code: 42, displayName: "S2", plane: 0, direction:  1, layers: -1, quarterTurns: 2 },
    { code: 43, displayName: "E2", plane: 2, direction:  1, layers: -1, quarterTurns: 2 },
    { code: 44, displayName: "M2", plane: 4, direction:  1, layers: -1, quarterTurns: 2 },
    { code: 45, displayName: "z2", plane: 0, direction:  1, layers:  3, quarterTurns: 2 },
    { code: 46, displayName: "y2", plane: 2, direction:  1, layers:  3, quarterTurns: 2 },
    { code: 47, displayName: "x2", plane: 5, direction:  1, layers:  3, quarterTurns: 2 },
];
