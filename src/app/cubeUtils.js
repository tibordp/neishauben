import { operations } from "./constants";

const nameLookup = Object.fromEntries(
    operations.map(({ displayName, code }) => [displayName, code])
);
const codeLookup = Object.fromEntries(
    operations.map(({ displayName, code }) => [code, displayName])
);

export const parseAlgorithm = (algorithm) => {
    return algorithm
        .match(/[^ ]+/g)
        .map((displayName) => nameLookup[displayName]);
};

export const printAlgorithm = (algorithm) => {
    return algorithm.map((code) => codeLookup[code]).join(" ");
};
