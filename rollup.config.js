import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import strip from "@rollup/plugin-strip";

export default {
  input: "packages/components/index.ts", // 入口文件
  output: [
    {
      file: "dist/index.js", // 输出文件
      format: "cjs", // CommonJS 格式
      sourcemap: false, // 生成 sourcemap
      exports: "auto", // 启用 tree-shaking
    },
    {
      file: "dist/index.esm.js", // 输出文件
      format: "esm", // ES Module 格式
      sourcemap: false, // 生成 sourcemap
      exports: "auto", // 启用 tree-shaking
    },
  ],
  plugins: [
    strip({
      include: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
      debugger: true,
      functions: ["console.*", "assert.*"],
      sourceMap: true,
      directives: ["use client", "use server"],
    }),
    react({
      include: "**/*.{jsx,tsx}",
      babel: {
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-transform-react-jsx"],
      },
    }),
    peerDepsExternal(), // 外部化 peerDependencies（如 react 和 antd）
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"), // 替换环境变量
      preventAssignment: true,
    }),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // 解析的文件扩展名
    }),
    commonjs({
      include: /node_modules/,
    }), // 将 CommonJS 模块转换为 ES6 模块
    typescript({
      tsconfig: "./tsconfig.json", // 指定 tsconfig 文件
      declaration: true, // 生成 .d.ts 文件
      declarationDir: "dist",
      declarationDir: "dist", // 类型声明文件输出目录
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: [
        [
          "import",
          {
            libraryName: "antd",
            libraryDirectory: "es",
            style: true,
          },
        ],
      ],
    }),
    postcss({
      modules: false, // 如果你的组件库不需要 CSS Modules，可以关闭
      extract: true, // 将 CSS 提取到单独的文件
      minimize: true, // 压缩 CSS
      use: ["less"], // 使用 less 预处理器（antd 使用 less）
      sourceMap: false,
    }),
    terser({
      compress: {
        pure_funcs: ["console.log"], // 移除 console.log
        drop_console: true, // 移除所有 console
        dead_code: true, // 移除未使用代码
      },
    }), // 压缩代码
  ],
  external: ["react", "react-dom", "antd"], // 外部化 react 和 antd
};
