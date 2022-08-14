export const colors = [
    0x3484d5, 0x41c248, 0xf3df40, 0xeceadd, 0xf7762e, 0xf22d54,
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
    { code: 0,  displayName: "F",  plane: 0, direction: -1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 1,  displayName: "F'", plane: 0, direction:  1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 2,  displayName: "B",  plane: 1, direction: -1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 3,  displayName: "B'", plane: 1, direction:  1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 4,  displayName: "U",  plane: 2, direction: -1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 5,  displayName: "U'", plane: 2, direction:  1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 6,  displayName: "D",  plane: 3, direction: -1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 7,  displayName: "D'", plane: 3, direction:  1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 8,  displayName: "L",  plane: 4, direction: -1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 9,  displayName: "L'", plane: 4, direction:  1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 10, displayName: "R",  plane: 5, direction: -1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 11, displayName: "R'", plane: 5, direction:  1, layers:  1, quarterTurns: 1, category: "Basic" },
    { code: 12, displayName: "f",  plane: 0, direction: -1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 13, displayName: "f'", plane: 0, direction:  1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 14, displayName: "b",  plane: 1, direction: -1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 15, displayName: "b'", plane: 1, direction:  1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 16, displayName: "u",  plane: 2, direction: -1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 17, displayName: "u'", plane: 2, direction:  1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 18, displayName: "d",  plane: 3, direction: -1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 19, displayName: "d'", plane: 3, direction:  1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 20, displayName: "l",  plane: 4, direction: -1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 21, displayName: "l'", plane: 4, direction:  1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 22, displayName: "r",  plane: 5, direction: -1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 23, displayName: "r'", plane: 5, direction:  1, layers:  2, quarterTurns: 1, category: "Two Layers" },
    { code: 24, displayName: "F2", plane: 0, direction:  1, layers:  1, quarterTurns: 2, category: "Basic" },
    { code: 25, displayName: "B2", plane: 1, direction:  1, layers:  1, quarterTurns: 2, category: "Basic" },
    { code: 26, displayName: "U2", plane: 2, direction:  1, layers:  1, quarterTurns: 2, category: "Basic" },
    { code: 27, displayName: "D2", plane: 3, direction:  1, layers:  1, quarterTurns: 2, category: "Basic" },
    { code: 28, displayName: "L2", plane: 4, direction:  1, layers:  1, quarterTurns: 2, category: "Basic" },
    { code: 29, displayName: "R2", plane: 5, direction:  1, layers:  1, quarterTurns: 2, category: "Basic" },
    { code: 30, displayName: "z",  plane: 0, direction: -1, layers:  3, quarterTurns: 1, category: "Whole Cube" },
    { code: 31, displayName: "z'", plane: 0, direction:  1, layers:  3, quarterTurns: 1, category: "Whole Cube" },
    { code: 32, displayName: "y",  plane: 2, direction: -1, layers:  3, quarterTurns: 1, category: "Whole Cube" },
    { code: 33, displayName: "y'", plane: 2, direction:  1, layers:  3, quarterTurns: 1, category: "Whole Cube" },
    { code: 34, displayName: "x'", plane: 5, direction:  1, layers:  3, quarterTurns: 1, category: "Whole Cube" },
    { code: 35, displayName: "x",  plane: 5, direction: -1, layers:  3, quarterTurns: 1, category: "Whole Cube" },
    { code: 36, displayName: "S",  plane: 0, direction: -1, layers: -1, quarterTurns: 1, category: "Middle Layer" },
    { code: 37, displayName: "S'", plane: 1, direction: -1, layers: -1, quarterTurns: 1, category: "Middle Layer" },
    { code: 38, displayName: "E'", plane: 2, direction: -1, layers: -1, quarterTurns: 1, category: "Middle Layer" },
    { code: 39, displayName: "E",  plane: 3, direction: -1, layers: -1, quarterTurns: 1, category: "Middle Layer" },
    { code: 40, displayName: "M",  plane: 4, direction: -1, layers: -1, quarterTurns: 1, category: "Middle Layer" },
    { code: 41, displayName: "M'", plane: 5, direction: -1, layers: -1, quarterTurns: 1, category: "Middle Layer" },
    { code: 42, displayName: "S2", plane: 0, direction:  1, layers: -1, quarterTurns: 2, category: "Middle Layer" },
    { code: 43, displayName: "E2", plane: 2, direction:  1, layers: -1, quarterTurns: 2, category: "Middle Layer" },
    { code: 44, displayName: "M2", plane: 4, direction:  1, layers: -1, quarterTurns: 2, category: "Middle Layer" },
    { code: 45, displayName: "z2", plane: 0, direction:  1, layers:  3, quarterTurns: 2, category: "Whole Cube" },
    { code: 46, displayName: "y2", plane: 2, direction:  1, layers:  3, quarterTurns: 2, category: "Whole Cube" },
    { code: 47, displayName: "x2", plane: 5, direction:  1, layers:  3, quarterTurns: 2, category: "Whole Cube" },
    { code: 48, displayName: "f2",  plane: 0, direction: 1, layers:  2, quarterTurns: 2, category: "Two Layers" },
    { code: 49, displayName: "b2",  plane: 1, direction: 1, layers:  2, quarterTurns: 2, category: "Two Layers" },
    { code: 50, displayName: "u2",  plane: 2, direction: 1, layers:  2, quarterTurns: 2, category: "Two Layers" },
    { code: 51, displayName: "d2",  plane: 3, direction: 1, layers:  2, quarterTurns: 2, category: "Two Layers" },
    { code: 52, displayName: "l2",  plane: 4, direction: 1, layers:  2, quarterTurns: 2, category: "Two Layers" },
    { code: 53, displayName: "r2",  plane: 5, direction: 1, layers:  2, quarterTurns: 2, category: "Two Layers" },
].sort((a, b) => a.category.localeCompare(b.category) || (a.code - b.code));
