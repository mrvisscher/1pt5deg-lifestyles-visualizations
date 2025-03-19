import { viteSingleFile } from "vite-plugin-singlefile"

// vite.config.js
export default {
    "root": "src",
    "build": {
        "outDir": "../dist",
        "emptyOutDir": true,
        "rollupOptions":{
            "input":{
                "figure_1/figure_1": "./src/figure_1/figure_1.html",
                "figure_2/figure_2": "./src/figure_2/figure_2.html",
            },
            "output":{
                "entryFileNames": `[name].js`,
                "chunkFileNames": `[name].js`,
                "assetFileNames": `[name]/[name].[ext]`
            }
        }
    },
    //"plugins": [viteSingleFile()],
  }