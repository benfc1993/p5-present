/* eslint-env node */
import typescript from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { uglify } from 'rollup-plugin-uglify'
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import json from '@rollup/plugin-json'

const devPlugins =
  process.env.ENVIRONMENT === 'DEV'
    ? [serve({ contentBase: 'dist', open: false }), livereload()]
    : [uglify()]

export default {
  input: ['./src/index.ts'],
  output: {
    format: 'iife',
    dir: 'dist',
    sourcemap: true,
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
      sourceMap: true,
      resolveJsonModule: true,
    }),
    nodePolyfills(),
    json(),

    // babel({
    // 	exclude: 'node_modules/**'
    // }),
    // browserify,
    // builtins({ crypto: false, fs: false }),
    // swc(
    // 	defineRollupSwcOption({
    // 		sourceMaps: true,
    // 		include: ,
    // 		module: {
    // 			type: 'nodenext'
    // 		}
    // 	})
    // ),
    ...devPlugins,
  ],
  // globals: ['crypto', 'fs'],
  onwarn: function (warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return
    }
    if (
      new RegExp(
        /^[Circular dependency: node_modules\/rollup-plugin\-node\-polyfills\/polyfills\/readable\-stream\/duplex.js]/
      ).test(warning)
    ) {
      return
    }
    // console.warn everything else
    console.warn(warning.code)
  },
}
