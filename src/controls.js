import { operations, solvedCube } from "./constants";
import githubLogo from "../static/github.png";

const addButton = (parent, label, onClick) => {
    var button = document.createElement("button");
    button.className = "pure-button";
    button.innerText = label;
    button.addEventListener("click", onClick);
    parent.appendChild(button);
    return button;
};

const addGithubLink = (parent) => {
    var link = document.createElement("a");
    link.href = "https://github.com/tibordp/neishauben";
    var img = document.createElement("img");
    img.className = "github-link";
    img.src = githubLogo;
    img.alt = "GitHub";

    link.appendChild(img);
    parent.appendChild(link);
    return link;
};

const addSlider = (parent, labelText, onChange) => {
    var container = document.createElement("div");
    container.className = "slider-container";
    var slider = document.createElement("input");
    var label = document.createElement("span");
    label.className = "slider-label";
    label.innerText = labelText;
    slider.type = "range";
    slider.min = 1;
    slider.max = 5;
    slider.value = 1;
    slider.className = "slider";
    slider.oninput = function () {
        onChange(this.value);
    };
    container.appendChild(label);
    container.appendChild(slider);
    parent.appendChild(container);
    return slider;
};

export const createControls = (state) => {
    var target = document.querySelector("body");
    var topBar = document.createElement("div");
    topBar.id = "top-bar";
    var bottomBar = document.createElement("div");
    bottomBar.id = "bottom-bar";
    var rightBar = document.createElement("div");
    rightBar.id = "right-bar";

    const clearButton = addButton(topBar, "Clear", () => {
        state.setColors([...solvedCube]);
    });
    const demoButton = addButton(topBar, "Demo", () => {
        state.enqueueOperation(...operations);
    });
    const stopButton = addButton(topBar, "Stop", () => {
        state.clearQueue();
    });
    const scrambleButton = addButton(topBar, "Scramble", () => {
        state.enqueueOperation(
            ...state.runtime
                .scramble(23)
                .map((c) => operations.find(({ code }) => code === c))
        );
    });
    const solveButton = addButton(topBar, "Solve", () => {
        state.enqueueOperation(
            ...state.runtime
                .solve(state.currentCube)
                .map((c) => operations.find(({ code }) => code === c))
        );
    });
    addSlider(topBar, "Animation speed", (speed) => {
        state.animationSpeed = speed;
    });
    addGithubLink(topBar);

    const operationButtons = operations
        .filter(({ category }) => category === "Basic")
        .map((operation) =>
            addButton(bottomBar, operation.displayName, () => {
                state.enqueueOperation(operation);
            })
        );

    const updateControls = () => {
        const disabledWhenRunning = [
            clearButton,
            demoButton,
            scrambleButton,
            solveButton,
            ...operationButtons,
        ];
        const disabledWhenNotRunning = [stopButton];

        disabledWhenRunning.forEach((button) => {
            button.disabled = state.operationQueue.length !== 0;
        });
        disabledWhenNotRunning.forEach((button) => {
            button.disabled = state.operationQueue.length === 0;
        });
    };
    updateControls();
    state.addQueueChangeListener(updateControls);

    target.appendChild(topBar);
    target.appendChild(bottomBar);
    target.appendChild(rightBar);
};
