const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("sql");

const finalConfig = withNativeWind(config, { input: "./constants/global.css" });

module.exports = finalConfig;