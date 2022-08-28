<!--
  This is/should your main point to start at, as in this file you can
   begin to layout your application, it inclusion will happen in 'App.svelte'
   (this file is for the layout of the content, while 'App.svelte' takes more
   care about the layout for the application/window itself).
-->
<template lang="pug">
  div
    header
      h1 Header
    main
      section
        h3 System information
        ul
          li Theme: {theme}
            button.theme-switch Change theme
          li CPU: {cpu?.brand}
          li Platform: {os.platform()}
      section
        figure
          img(src="{TestImagePNG}" alt="PNG Test image")
          figcaption Example of imported image via 'imagetools' (incl. PNG &gt; WEBP conversion)
        figure
          TestSvg
          figcaption Example of imported SVG (can be used as Svelte-component)
    footer
      span Footer
</template>

<script>
  import { onMount } from 'svelte';

  // Example for using a store (here to store/fetch the current theme-state).
  import { themeStore } from '$stores/themeStore.js';

  // We can use/call NodeJS related modules directly in here (different to
  //  Electron). The 'nw'-object is globally defined, so doesnt' need to be
  //  imported.
  import os from 'os';

  // Example how to fetch an image resource. As we're using imagetools(sharp)
  //  we can import an configured and optimized image resource from an original
  //  in the assets. In this example we get the direct path to the generated
  //  asset (in '/public/assets')
  import TestImagePNG from '$assets/test.png?w=160&h=121&webp';

  // Example how to fetch an SVG-resource. It can be directly used as svelte-component.
  import TestSvg from "$assets/test.svg";

  export let sysInfo = {};

  let
    cpu,
    theme = '';

  // Subscribing to the theme store to be informed for any changes about the theme.
  themeStore.subscribe(changedTheme => theme = changedTheme);

  onMount(async () => {
    cpu = await global?.sysInfo?.cpu?.();
    // TODO maybe await this in app.js, providing the final data only?
    //global?.sysInfo?.cpu?.().then(data => cpu = data);
  });
</script>

<style lang="sass">
  div
    display: grid
    grid-template-rows: var(--sizeHeader) auto var(--sizeFooter)
    grid-template-column: auto
    grid-template-areas: "header" "content" "footer"
    overflow: hidden auto
    >header,
    >footer
      background-color: hsl(0 0% 0% / .1)
      display: flex
      align-items: center
      justify-content: center
    >header
      grid-area: header
    >main
      grid-area: content
      padding: 0 1.5em
    >footer
      grid-area: footer
</style>