exports.performOperation = (runtime, cubeData, operation) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(54);
    for (var i = 0; i < 54; ++i) {
        runtime.setValue(ptr + i, cubeData[i]);
    }
    runtime._perform(ptr, operation);
    const result = [];
    for (i = 0; i < 54; ++i) {
        result[i] = runtime.getValue(ptr + i);
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
    const result = [];
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
    runtime._solve(ptr, out);
    const result = [];
    for (i = 0; i < 512; ++i) {
        const operationCode = runtime.getValue(out + i * 4, "i32");
        if (operationCode === -1) {
            break;
        }
        result.push(operationCode);
    }
    runtime.stackRestore(stackPtr);
    return result;
};

exports.scramble = (runtime, length) => {
    var stackPtr = runtime.stackSave();
    var ptr = runtime.stackAlloc(length * 4);
    runtime._scramble(ptr, length);
    const result = [];
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
    const result = [];
    for (var i = 0; i < 54; ++i) {
        result[i] = runtime.getValue(ptr + i);
    }
    runtime.stackRestore(stackPtr);
    return result;
};
