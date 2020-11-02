module.exports = {
    transform: {
        "\\.js$": "babel-jest",
        "\\.wasm$": ["jest-file-loader", "babel-jest"],
    },
};
