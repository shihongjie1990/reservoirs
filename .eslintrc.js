// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unreachable": 0,

    "no-mixed-spaces-and-tabs": [0, "smart-tabs"], //不允许混用tab和空格
    "indent": [0, 4], //缩进风格
    "camelcase": [0, {
      "properties": "never"
    }], //强制驼峰命名规则
    "space-before-function-paren": [0, {
      "anonymous": "always",
      "named": "never"
    }], //函数定义时括号前的空格

    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-extra-semi': 0, //不允许出现不必要的分号

    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'

    // quotes: [1, "double"]
  }
};
