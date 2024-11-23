module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@themes': './src/themes',
          '@utils': './src/utils',
          '@lib': './src/lib',
          '@specs': './specs',
        },
      },
    ],
  ],
};
