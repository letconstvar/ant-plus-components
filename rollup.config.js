// 导入 babel 插件，用于转换 ES6+ 代码
import babel from "@rollup/plugin-babel";
// 导入 commonjs 插件，用于将 CommonJS 模块转换为 ES6 模块
import commonjs from "@rollup/plugin-commonjs";
// 导入 resolve 插件，用于解析 node_modules 中的模块
import resolve from "@rollup/plugin-node-resolve";
// 导入 replace 插件，用于替换代码中的变量
import replace from "@rollup/plugin-replace";
// 导入 peerDepsExternal 插件，用于将 peerDependencies 声明的依赖外部化
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// 导入 postcss 插件，用于处理 CSS
import postcss from "rollup-plugin-postcss";
// 导入 terser 插件，用于压缩代码
import { terser } from "rollup-plugin-terser";
// 导入 typescript 插件，用于处理 TypeScript 文件
import typescript from "@rollup/plugin-typescript";
// 导入 react 插件，用于处理 React 相关代码
import react from "@vitejs/plugin-react";
// 导入 strip 插件，用于移除调试代码和注释
import strip from "@rollup/plugin-strip";

export default {
  // 指定打包入口文件
  input: "packages/components/index.ts",
  output: [
    {
      file: "dist/index.js", // CommonJS 格式的输出文件路径
      format: "cjs", // 输出格式为 CommonJS
      sourcemap: false, // 不生成 sourcemap 文件
      exports: "auto", // 自动检测导出模式，优化 tree-shaking
    },
    {
      file: "dist/index.esm.js", // ES Module 格式的输出文件路径
      format: "esm", // 输出格式为 ES Module
      sourcemap: false, // 不生成 sourcemap 文件
      exports: "auto", // 自动检测导出模式，优化 tree-shaking
    },
  ],
  plugins: [
    // 配置 strip 插件，用于移除调试代码
    strip({
      include: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"], // 包含的文件类型
      exclude: ["**/*.test.*", "**/*.spec.*", "**/__tests__/**"], // 排除测试相关文件
      debugger: true, // 移除 debugger 语句
      functions: ["console.*", "assert.*"], // 移除 console 和 assert 相关函数
      sourceMap: false, // 生成 sourceMap
      directives: ["use client", "use server"], // 移除特定指令
    }),
    // 配置 react 插件，处理 React 相关代码
    react({
      include: "**/*.{jsx,tsx}", // 处理 jsx 和 tsx 文件
      babel: {
        presets: ["@babel/preset-react"], // 使用 react preset
        plugins: ["@babel/plugin-transform-react-jsx"], // 转换 JSX 语法
      },
    }),
    peerDepsExternal(), // 将 peerDependencies 中的依赖外部化
    // 配置环境变量替换
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"), // 设置为生产环境
      preventAssignment: true, // 防止意外赋值
    }),
    // 配置模块解析
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // 可以解析的文件扩展名
    }),
    // 配置 CommonJS 转换
    commonjs({
      include: /node_modules/, // 只处理 node_modules 中的文件
    }),
    // 配置 TypeScript 编译
    typescript({
      tsconfig: "./tsconfig.json", // TypeScript 配置文件路径
      declaration: true, // 生成类型声明文件
      declarationDir: "dist", // 类型声明文件输出目录
    }),
    // 配置 Babel 转换
    babel({
      exclude: "node_modules/**", // 排除 node_modules 文件
      extensions: [".js", ".jsx", ".ts", ".tsx"], // 处理的文件扩展名
      presets: [
        "@babel/preset-env", // 转换 ES6+ 语法
        "@babel/preset-react", // 转换 React 语法
        "@babel/preset-typescript", // 转换 TypeScript 语法
      ],
      plugins: [
        [
          "import", // 配置按需加载
          {
            libraryName: "antd", // 针对 antd 库
            libraryDirectory: "es", // 使用 es 目录下的模块
            style: true, // 加载对应的样式文件
          },
        ],
      ],
    }),
    // 配置 PostCSS 处理
    postcss({
      modules: false, // 不使用 CSS Modules
      extract: true, // 提取 CSS 到单独文件
      minimize: true, // 压缩 CSS
      use: ["less"], // 使用 Less 预处理器
      sourceMap: false, // 不生成 sourceMap
    }),
    // 配置代码压缩
    terser({
      compress: {
        pure_funcs: ["console.log"], // 移除 console.log
        drop_console: true, // 移除所有 console
        dead_code: true, // 移除未使用的代码
      },
    }),
  ],
  // 声明外部依赖，这些依赖不会被打包
  external: ["react", "react-dom", "antd"],
};
