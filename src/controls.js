import { operations } from "./constants";
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
    link.target = "_blank";
    var img = document.createElement("img");
    img.className = "github-link";
    img.src = githubLogo;
    img.alt = "Neishauben on GitHub";

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

    var currentOperations = [];
    var remainingOperations = [];

    const clearButton = addButton(topBar, "Clear", () => {
        currentOperations = [];
        remainingOperations = [];
        state.clearQueue();
    });
    const demoButton = addButton(topBar, "Demo", () => {
        currentOperations = [...operations];
        remainingOperations = [];
        state.enqueueOperation(...currentOperations);
    });
    const pauseButton = addButton(topBar, "Pause", () => {
        remainingOperations = [...state.operationQueue];
        state.clearQueue();
    });
    const resumeButton = addButton(topBar, "Resume", () => {
        state.enqueueOperation(...remainingOperations);
        remainingOperations = [];
    });
    const scrambleButton = addButton(topBar, "Scramble", () => {
        remainingOperations = [];
        currentOperations = state.runtime
            .scramble(25)
            .map((c) => operations.find(({ code }) => code === c));
        state.enqueueOperation(...currentOperations);
    });
    const solveButton = addButton(topBar, "Solve", () => {
        remainingOperations = [];
        currentOperations = state.runtime
            .solve(state.currentCube)
            .map((c) => operations.find(({ code }) => code === c));
        state.enqueueOperation(...currentOperations);
    });
    addSlider(topBar, "Animation speed", (speed) => {
        state.animationSpeed = speed;
    });
    addGithubLink(topBar);

    const algorithm = document.createElement("div");
    algorithm.id = "algorithm";
    topBar.appendChild(algorithm);

    const operationButtons = operations
        .filter(({ category }) => category === "Basic")
        .map((operation) =>
            addButton(bottomBar, operation.displayName, () => {
                if (remainingOperations.length > 0) {
                    currentOperations = [];
                    remainingOperations = [];
                    state.clearQueue();
                }
                currentOperations.push(operation);
                state.enqueueOperation(operation);
            })
        );

    const updateControls = () => {
        const isRunning = state.operationQueue.length !== 0;
        const disabledWhenRunning = [
            clearButton,
            demoButton,
            scrambleButton,
            solveButton,
            resumeButton,
            ...operationButtons,
        ];

        const disabledWhenNotRunning = [pauseButton];
        resumeButton.hidden = isRunning || remainingOperations.length === 0;
        pauseButton.hidden = !isRunning && remainingOperations.length > 0;

        algorithm.innerHTML = "";
        for (var i = 0; i < currentOperations.length; ++i) {
            if (i !== 0) {
                algorithm.appendChild(document.createTextNode(" "));
            }

            const node = document.createElement("span");
            node.innerText = currentOperations[i].displayName;

            const remainingOperationsCount =
                state.operationQueue.length + remainingOperations.length;
            const currentPosition =
                currentOperations.length - remainingOperationsCount - 1;

            if (isRunning && i == currentPosition) {
                node.className = "algorithm-current";
            } else if (i <= currentPosition) {
                node.className = "algorithm-done";
            }
            algorithm.appendChild(node);
        }
        disabledWhenRunning.forEach((button) => {
            button.disabled = isRunning;
        });
        disabledWhenNotRunning.forEach((button) => {
            button.disabled = !isRunning;
        });
    };
    updateControls();
    state.addQueueChangeListener(updateControls);

    target.appendChild(topBar);
    target.appendChild(bottomBar);
    target.appendChild(rightBar);
};
