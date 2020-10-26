import { operations, solvedCube } from "./constants";

const addButton = (parent, label, onClick) => {
    var button = document.createElement("div");
    button.className = "pure-button";
    button.innerText = label;
    button.addEventListener("click", onClick);
    parent.appendChild(button);
};

export const createControls = (state) => {
    var target = document.querySelector("body");
    var topBar = document.createElement("div");
    topBar.id = "top-bar";
    var bottomBar = document.createElement("div");
    bottomBar.id = "bottom-bar";

    addButton(topBar, "Clear", () => {
        state.currentCube = [...solvedCube];
        state.setColors(state.currentCube);
    });
    addButton(topBar, "Demo", () => {
        state.operationQueue.push(...operations);
    });
    addButton(topBar, "Stop", () => {
        state.operationQueue = [];
    });
    addButton(topBar, "Scramble", () => {
        state.operationQueue.push(
            ...state.runtime
                .scramble(23)
                .map((c) => operations.find(({ code }) => code === c))
        );
    });
    addButton(topBar, "Recolor", () => {
        state.currentCube = state.runtime.recolor(state.currentCube);
        state.setColors(state.currentCube);
    });
    addButton(topBar, "Solve", () => {
        state.operationQueue.push(
            ...state.runtime
                .solve(state.currentCube)
                .map((c) => operations.find(({ code }) => code === c))
        );
    });

    operations
        //.filter(({ category }) => category === "Basic")
        .forEach((operation) => {
            addButton(bottomBar, operation.displayName, () => {
                state.operationQueue.push(operation);
            });
        });

    target.appendChild(topBar);
    target.appendChild(bottomBar);
};
