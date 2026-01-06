const { NODE_ENV, MODULES_ENV } = process.env

const isEnvTest = NODE_ENV === 'test'
if (!isEnvTest) {
  // force production mode for package builds
  process.env.NODE_ENV = 'production'
}

const targetJest = isEnvTest
const targetCommonJS = MODULES_ENV === 'commonjs' && !targetJest
const targetESModules = MODULES_ENV === 'esmodules' && !targetJest
const targetWeb = !targetCommonJS && !targetESModules && !targetJest

module.exports = {
  presets: [
    // for testing with jest/jsdom
    targetJest && '@zumper/babel-preset-react-app/test',
    // building for lib folder
    targetCommonJS &&
      !isEnvTest && [
        '@zumper/babel-preset-react-app/commonjs',
        { helpers: true, absoluteRuntime: false },
      ],
    // building for es folder
    targetESModules && [
      '@zumper/babel-preset-react-app/esmodules',
      { helpers: true, absoluteRuntime: false },
    ],
    // building for dist folder
    targetWeb && [
      '@zumper/babel-preset-react-app',
      { helpers: false, absoluteRuntime: false },
    ],
  ].filter(Boolean),
}
