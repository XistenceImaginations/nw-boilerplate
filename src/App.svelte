<!-- src/App.svelte -->

<!--
  This file takes care about the layout of the application/window itself, when
   it is about layouting the content then you should have a look into 'Layout.svelte'.
-->
<template lang="pug">
  nav(class:--maximized="{state === 'maximized'}")
    button: AppIcon
    div
    button(on:click!="{() => win.minimize()}"): WinIconMinimize
    button(class:--hide="{state !== 'maximized'}" on:click!="{() => win.restore()}"): WinIconRestore
    button(class:--hide="{state !== 'normalized'}" on:click!="{() => win.maximize()}"): WinIconMaximize
    button(on:click!="{() => win.close()}"): WinIconClose
    label {appInfo?.name || 'name'} {appInfo?.version || 'version'}

  Layout({sysInfo})

  footer(class:--maximized="{state === 'maximized'}") Status
</template>

<script>
  import { onMount } from "svelte";
  import { themeStore } from '$stores/themeStore.js';

  // Importing the icon-SVGs for the title bar.
  import WinIconMinimize from "$assets/icons/minimize.svg";
  import WinIconRestore from "$assets/icons/restore.svg";
  import WinIconMaximize from "$assets/icons/maximize.svg";
  import WinIconClose from "$assets/icons/close.svg";
  import AppIcon from "$assets/icons/application.svg";

  // Load main layout for the app.
  import Layout from "./app/Layout.svelte";

  // Properties, defined/provided via app.js.
  export let name = 'n/a';
  export let version = 'n/a';
  export let appInfo = {};
  export let sysInfo = {};

  // Add the system and app information to the 'global' object which
  //  is available everywhere.
  global.appInfo = appInfo;
  global.sysInfo = sysInfo;

  const win = nw.Window.get();

  let
    state = 'normalized',
    colorTheme = '';

  // Registering button handlers to memorize the current window state.
  win.on('minimize', event => state = 'minimized');
  win.on('maximize', event => state = 'maximized');
  win.on('restore', event => state = 'normalized');

  function changeState() {
    // Persist the current theme settings in the local storage.
    localStorage.setItem('colorTheme', colorTheme);
    document.documentElement.setAttribute('data-theme', colorTheme);

    themeStore.set(colorTheme);
  }

  function switchTheme(selector) {
    colorTheme = localStorage.getItem('colorTheme') || 'system';

    changeState();

    document
      .querySelectorAll(selector)
      .forEach(elm => {
        elm.addEventListener('click', () => {
          switch (colorTheme) {
            case 'dark':
              colorTheme = 'light';
              break
            case 'light':
              colorTheme = 'system';
              break
            default:
              colorTheme = 'dark';
          }

          changeState();
        });
    });
  }

  onMount(() => {
    document.addEventListener('DOMContentLoaded', event => switchTheme('.theme-switch'));
  });
</script>