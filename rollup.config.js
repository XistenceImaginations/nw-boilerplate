// rollup.config.js

/*
 * Configuration for Rollup.
 */
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { imagetools } from 'rollup-plugin-imagetools';
import json from '@rollup/plugin-json';
import { svelteSVG } from "rollup-plugin-svelte-svg";
import alias from '@rollup/plugin-alias';

// Shared object. That way we can reuse settings that must be made
//  either for Svelte as for Rollup as well.
const createPreprocessors = require('./svelte.config').createPreprocessors;
const production = !process.env.ROLLUP_WATCH;
const basePath = process.cwd();

export default {
  input: 'src/app.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/app.js'
  },
  plugins: [
    // Setting up some aliases which can be use at imports, so that some paths
    //  can be written in a shorter way and more reliable (you don't have care
    //  about folder nesting and resolving path), like
    //
    // import foobar from '$assets/foobar.js'
    //
    // instead of
    //
    // import foobar from '../../src/assets/foobar.js'
    alias({
      entries: [
        { find: '$assets', replacement: `${basePath}/src/assets` },
        { find: '$stores', replacement: `${basePath}/src/stores` },
      ]
    }),

    // Used to make NodeJS-modules usable in .svelte-files
    //  (they're already functional due to NWjs, but compiling/
    //  /parsing the code via rollup doesn't handle it per default)
    nodePolyfills( /* options */ ),

    // Providing image tools (which are based on Sharp), so that
    //  image resources can be directly used by importing them.
    imagetools(),

    // Allows to import JSON-files in JS, like 'package.json'.
    json(),

    // Allows to import SVG-files in JS.
    svelteSVG({
      svgo: {}
    }),

    svelte({
      compilerOptions: {
        // Enable run-time checks when not in production.
        dev: !production
      },
      // Set up preprocessor, so we can use Pug and SASS in .svelte-files.
      preprocess: createPreprocessors(!production),
    }),

    // This is used to use direct imports of '*.sass'-files
    //  in JS-code to be compiled and outputted to 'global.css'.
    postcss({
      extract: 'app.css'
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),

    commonjs(),
  ],
  watch: {
    clearScreen: false
  }
};
