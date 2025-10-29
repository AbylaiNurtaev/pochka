const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'glb', 'gltf'];
config.resolver.sourceExts.push('cjs');

// Add GLB/GLTF to asset extensions
config.resolver.assetExts.push('glb', 'gltf');

module.exports = config;