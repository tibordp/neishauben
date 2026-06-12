import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    base: "/neishauben/",
    // Allow access via mDNS (<hostname>.local) when testing on other
    // devices with `pnpm dev --host` / `pnpm preview --host`.
    server: {
        allowedHosts: [".local"],
    },
    preview: {
        allowedHosts: [".local"],
    },
    worker: {
        format: "es",
    },
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.png", "apple-touch-icon.png"],
            manifest: {
                name: "Neishauben",
                short_name: "Neishauben",
                description: "Rubik's Cube Simulator",
                background_color: "#f5f2f0",
                theme_color: "#3484d5",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,png,wasm}"],
                maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
            },
        }),
    ],
    test: {
        environment: "node",
    },
});
