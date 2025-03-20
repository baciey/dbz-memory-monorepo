const fs = require("fs");
const path = require("path");

const rootPackageJsonPath = path.resolve(__dirname, "../package.json");
const rootPackageJson = JSON.parse(
  fs.readFileSync(rootPackageJsonPath, "utf8"),
);
const version = rootPackageJson.version;

const packagePaths = ["apps/expo-app/package.json", "apps/web/package.json"];

packagePaths.forEach((pkgPath) => {
  const fullPath = path.resolve(__dirname, "..", pkgPath);
  if (fs.existsSync(fullPath)) {
    const pkg = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    pkg.version = version;
    fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`✅ Updated ${pkgPath} to version ${version}`);
  }
});

// Update app.json for Expo
const appJsonPath = path.resolve(__dirname, "../apps/expo-app/app.json");
if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));
  if (appJson.expo) {
    appJson.expo.version = version; // Update Expo app version
    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + "\n");
    console.log(`✅ Updated apps/expo-app/app.json to version ${version}`);
  }
}

console.log("🚀 Versions synced successfully!");
