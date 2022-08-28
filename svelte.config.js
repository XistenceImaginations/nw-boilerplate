// svelte.config.js:

const sveltePreprocess = require('svelte-preprocess');

/**
 * This function creates setting informations which can be used
 *  either for svelte settings as for rollup settings.
 */
function createPreprocessors() {
  return sveltePreprocess({
    sourceMap: true,
    scss: {
      // We inject the 'app.sass' as global import.
      prependData: `@import "./src/app.sass"`,
    },
  });
}

// Export either the result of 'createPreprocessors' (for svelte config)
//  and the function itself for rollup. That way we don't have to do things
//  twice (which we need to do, especially when it is about preprocessing
//  (Pug, SASS, etc.))
module.exports = {
  preprocess: createPreprocessors(true),
  createPreprocessors
};