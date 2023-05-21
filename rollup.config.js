/* eslint-env node */
import typescript from '@rollup/plugin-typescript'
import livereload from 'rollup-plugin-livereload'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import json from '@rollup/plugin-json'

const devPlugins =
  process.env.ENVIRONMENT === 'DEV' ? [livereload()] : [uglify()]

export default {
  input: ['./src/index.ts'],
  output: {
    format: 'iife',
    dir: `dist`,
    sourcemap: true,
    name: 'index',
  },
  plugins: [
    commonjs({
      include: 'node_modules/**',
      esmExternals: true,
    }),

    nodeResolve({
      jsnext: true,
      module: true,
      main: true, // for commonjs modules that have an index.js
      browser: true,
      preferBuiltins: false,
    }),
    typescript({
      esModuleInterop: true,
      module: 'es6',
      moduleResolution: 'node',
      target: 'es6',
      ...(process.env.ENVIRONMENT === 'DEV' && { sourceMap: true }),
      resolveJsonModule: true,
    }),
    nodePolyfills(),
    json(),
    ...devPlugins,
  ],
  onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.error(`(!) ${warning.message}`)
    }
  },
}
