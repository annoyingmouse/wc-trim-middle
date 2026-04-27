import terser from "@rollup/plugin-terser";
import { readFileSync } from "fs";

const { name, version } = JSON.parse(readFileSync("./package.json", "utf8"));

export default {
  input: "./wc-trim-middle.js",
  output: {
    file: "dist/wc-trim-middle.min.js",
    format: "iife",
    sourcemap: "inline",
    banner: `/* ${name} v${version} */`,
  },
  plugins: [terser()],
};
