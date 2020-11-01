exports.performOperation = (runtime, cubeData, operation) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(54);
    for (var i = 0; i < 54; ++i) {
        runtime.setValue(ptr + i, cubeData[i]);
    }
    runtime._perform(ptr, operation);
    const result = new Array(54);
    for (i = 0; i < 54; ++i) {
        result[i] = runtime.getValue(ptr + i);
    }
    runtime.stackRestore(stackPtr);
    return result;
};

exports.performAlgorithm = (runtime, cubeData, algorithm) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(54);
    var algoPtr = runtime.stackAlloc(4 * algorithm.length);
    for (var i = 0; i < 54; ++i) {
        runtime.setValue(ptr + i, cubeData[i]);
    }
    for (i = 0; i < algorithm.length; ++i) {
        runtime.setValue(algoPtr + 4 * i, algorithm[i], "i32");
    }
    runtime._perform_algorithm(ptr, algoPtr, algorithm.length);
    const result = new Array(54);
    for (i = 0; i < 54; ++i) {
        result[i] = runtime.getValue(ptr + i);
    }
    runtime.stackRestore(stackPtr);
    return result;
};

exports.invertAlgorithm = (runtime, algorithm) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(4 * algorithm.length);
    for (var i = 0; i < algorithm.length; ++i) {
        runtime.setValue(ptr + 4 * i, algorithm[i], "i32");
    }
    runtime._invert_algorithm(ptr, algorithm.length);
    const result = new Array(algorithm.length);
    for (i = 0; i < algorithm.length; ++i) {
        result[i] = runtime.getValue(ptr + 4 * i, "i32");
    }
    runtime.stackRestore(stackPtr);
    return result;
};

exports.recolor = (runtime, cubeData) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(54);
    for (var i = 0; i < 54; ++i) {
        runtime.setValue(ptr + i, cubeData[i]);
    }
    runtime._recolor(ptr);
    const result = new Array(54);
    for (i = 0; i < 54; ++i) {
        result[i] = runtime.getValue(ptr + i);
    }
    runtime.stackRestore(stackPtr);
    return result;
};

exports.solve = (runtime, cubeData) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(54);
    var out = runtime.stackAlloc(512 * 4);
    for (var i = 0; i < 54; ++i) {
        runtime.setValue(ptr + i, cubeData[i]);
    }
    const length = runtime._solve(ptr, out);
    const result = new Array(length);
    for (i = 0; i < length; ++i) {
        result[i] = runtime.getValue(out + i * 4, "i32");
    }
    runtime.stackRestore(stackPtr);
    return result;
};

exports.scramble = (runtime, length) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(length * 4);
    runtime._scramble(ptr, length);
    const result = new Array(length);
    for (var i = 0; i < length; ++i) {
        const operationCode = runtime.getValue(ptr + i * 4, "i32");
        result[i] = operationCode;
    }
    runtime.stackRestore(stackPtr);
    return result;
};

exports.scrambled = (runtime, depth) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(54);
    runtime._scrambled_cube(ptr, depth);
    const result = new Array(54);
    for (var i = 0; i < 54; ++i) {
        result[i] = runtime.getValue(ptr + i);
    }
    runtime.stackRestore(stackPtr);
    return result;
};

exports.isSolved = (runtime, cubeData) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(54);
    for (var i = 0; i < 54; ++i) {
        runtime.setValue(ptr + i, cubeData[i]);
    }
    const result = runtime._is_solved(ptr);
    runtime.stackRestore(stackPtr);
    return result !== 0;
};
