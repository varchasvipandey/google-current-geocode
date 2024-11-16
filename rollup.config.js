import pluginTypeScript from "@rollup/plugin-typescript";
import pluginTenser from "@rollup/plugin-terser";
import pluginNodeResolver from "@rollup/plugin-node-resolve";
import pluginCommonJs from "@rollup/plugin-commonjs";
import pluginPeerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

const rollupConfig = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
      {
        file: packageJson.module,
        format: "esm",
      },
    ],
    plugins: [
      pluginTenser(),
      pluginNodeResolver(),
      pluginCommonJs(),
      pluginTypeScript({ tsconfig: "./tsconfig.json" }),
      pluginPeerDepsExternal(),
    ],
  },
  {
    input: "src/types.ts",
    output: [{ file: packageJson.types }],
    plugins: [dts.default()],
  },
];

export default rollupConfig;
