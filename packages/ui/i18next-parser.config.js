module.exports = {
  contextSeparator: "_",
  createOldCatalogs: true,
  defaultNamespace: "translation",
  defaultValue: function (locale, namespace, key, value) {
    return value || key;
  },
  indentation: 2,
  keepRemoved: false,
  keySeparator: ".",
  lexers: {
    hbs: ["HandlebarsLexer"],
    handlebars: ["HandlebarsLexer"],

    htm: ["HTMLLexer"],
    html: ["HTMLLexer"],

    mjs: ["JavascriptLexer"],
    js: ["JavascriptLexer"],
    ts: ["JavascriptLexer"],
    jsx: ["JsxLexer"],
    tsx: ["JsxLexer"],

    default: ["JavascriptLexer"],
  },
  lineEnding: "auto",
  locales: ["pl", "en"],
  namespaceSeparator: ":",
  output: "src/locales/$LOCALE/$NAMESPACE.json",
  pluralSeparator: "_",
  input: ["src/**/*.{ts,tsx}"],
  sort: true,
  verbose: false,
  failOnWarnings: false,
  customValueTemplate: null,
};
