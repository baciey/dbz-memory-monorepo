module.exports = {
  presets: [
    "@babel/preset-typescript",
    "module:metro-react-native-babel-preset",
  ],
  plugins: [["@babel/plugin-transform-private-methods", { loose: true }]],
};
