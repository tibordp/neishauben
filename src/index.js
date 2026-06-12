import { registerSW } from "virtual:pwa-register";

registerSW();

async function init() {
    try {
        const { initializeNeishauben } = await import("./app/neishauben.js");
        await initializeNeishauben();
    } finally {
        document.getElementById("spinner").remove();
    }
}

init();
