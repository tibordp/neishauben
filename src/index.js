const installServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register(__webpack_public_path__ + "service-worker.js")
                .then((registration) => {
                    console.log("SW registered: ", registration);
                })
                .catch((registrationError) => {
                    console.log("SW registration failed: ", registrationError);
                });
        });
    }
};

async function init() {
    installServiceWorker();
    try {
        const { initializeNeishauben } = await import("./app/neishauben.js");
        await initializeNeishauben();
    } finally {
        document.getElementById("spinner").remove();
    }
}

init();
