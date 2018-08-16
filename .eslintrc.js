module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "brace-style": [
      "error",
      "1tbs"
    ],
    "camelcase": "error",
    "comma-dangle": [
      "error", "never"
    ],
    "comma-spacing": [
      "error", {
        "before": false,
        "after": true
      }
    ],
    "comma-style": [
      "error", "last"
    ],
    "computed-property-spacing": [
      "error", "never"
    ],
    "eol-last": "error",
    "indent": [
      "error",
      2,
      {
        "VariableDeclarator": { "var": 2, "let": 2, "const": 3 }
      }
    ],
    "keyword-spacing": [
      "error", {
        "before": true,
        "after": true
      }
    ],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "new-cap": [
      "error", {
        "newIsCap": true
      }
    ],
    "no-redeclare": "off",
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "semi-spacing": [
      "error", {
        "before": false,
        "after": true
      }
    ],
    "space-before-blocks": [
      "error", "always"
    ],
    "space-before-function-paren": [
      "error", "never"
    ],
    "space-in-parens": [
      "error", "never"
    ],
    "space-infix-ops": [
      "error", {
        "int32Hint": false
      }
    ],
    "strict": [
      "error",
      "global"
    ],
    "valid-jsdoc": [
      "error",
      {
        "prefer": {
          "arg": "param",
          "argument": "param",
          "returns": "return"
        }
      }
    ]
  }
};
