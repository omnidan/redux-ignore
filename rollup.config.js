import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import camelCase from 'lodash.camelcase'
import kebabCase from 'lodash.kebabcase'
import upperFirst from 'lodash.upperfirst'

import pkg from './package.json'

const input = 'src/index.js'
const globalName = upperFirst(camelCase(pkg.name))
const fileName = kebabCase(pkg.name)

const deps = [
  ...Object.keys(pkg.dependencies || {}).filter(
    (key) => key !== '@babel/runtime'
  ),
  ...Object.keys(pkg.peerDependencies || {}),
]
const external = (name) => deps.some((dep) => name.startsWith(dep))
const globals = {
  // ... add other external UMD package names here
}

const createConfig = (env) => {
  const isEnvProduction = env === 'production'
  return {
    input,
    output: {
      file: `dist/${fileName}${isEnvProduction ? '.min' : ''}.js`,
      format: 'umd',
      name: globalName,
      indent: false,
      exports: 'named',
      globals,
    },
    external,
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
      }),
      babel(),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
      isEnvProduction &&
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
          },
        }),
    ].filter(Boolean),
  }
}

export default [
  // UMD Development
  createConfig('development'),
  // UMD Production
  createConfig('production'),
]
