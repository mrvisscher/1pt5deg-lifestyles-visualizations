import { viteSingleFile } from "vite-plugin-singlefile"

// vite.config.js
export default {
    "root": "src",
    "build": {
        "outDir": "../dist",
        "emptyOutDir": true,
    },
    "plugins": [viteSingleFile()],
  }