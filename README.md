# NW.js App Boilerplate (using Svelte/Pug/SASS)

This setup uses [NW.js](https://nwjs.io/) for the frame and functional part ([Node.js](https://nodejs.org/en/), etc.). Additionally [Svelte](https://svelte.dev/), [SASS](https://sass-lang.com/) and [Pug](https://pugjs.org/api/getting-started.html) are used to build the ui with Rollup as buildsystem.
NWjs is included directly in './nwjs-rt', so it can be referenced relatively.
Please note the Issue/Troubleshooting/Q&A section at the end of this document in case of question or problems, there might be already an answer for you.

## Installation

  ```bash
  git clone https//foobar-foo/foo.git app-boilerplate

  cd app-boilerplate
  npm i
  npm run dev

  or

  npm run start
  ```

## Adapting scripts in package.json

Personally i have a copy of the NW.js installation inside the project in a folder called 'nwjs-rt'. Now you can 
- either put a copy of your installation inside such a folder (copy the data in a way that will have a 'nw.exe' directly under 'nwjs-rt', no deeper nested subfolder!)
- or you adapt the scripts in package.json (scripts/dev & scripts/starts to match the path for nw.exe to your local installation of NW.js)

Also note that the script are adapted for a Windows environment (s. the 'start...'). If you're under Linux you want to change that, but then in away that two processes can be started in parallel, not serial.

## Development and Preview

With ```npm run dev``` you start the development. Two processes will be started: the NW.js-process to show the frame and a Rollup-process to watch and rebuild the app when code has change. NW.js will live-reload the content as soon something has changed in 'public', like due to a rebuild by Rollup.

With ```npm run start``` you start the preview. There is only a one process from NW.js to show the frame. Code changes won't trigger a rebuild.

## Debugging

As NW.js is build upon [Chromium](https://www.chromium.org/chromium-projects/), you can right-click in the app to get a context menu where you can choose to inspect things. The Inspector will come up as extra frame.

## Closing application

When using the dev mode, note that both processes are started independently, means: you'll have to close either the terminal and the frame from NW.js separately, they won't close together by just closing one of them.

## Major things to note

- In ```package.json``` there are a few things to mention:
  - ```"main": "public/index.html"```  : This entry is important as we define the point where NW.js will start. It is the output from Rollup.
  - ```"domain": "app-foobar"``` : The domain used in NW.js, as it loads all content as 'extension' into a Chromium-instance. Otherwise we have some very cryptic name.
  - ```"chromium-args": "--allow-file-access-from-files --allow-file-access --user-data-dir"``` : A few flags which should ensure we have full access to all locally accessed files.
  - ```"window": {...}``` : Several settings for the frame like the initial bounds, taskbar icon, etc.
  - ```"scripts"/"dev": "start ./nwjs-rt/nw.exe . && start rollup -c -w"``` : Task to start the development mode. Thing to mention here is that start to parallel processes, one for NWjs and another for a watcher for Rollup. Furthermore, in ```public/index.html``` there is a SCRIPT-block which again watches the 'public'-folder (recursively!) to reload NWjs as soon anything has changed.
  - ```"scripts"/"start": "./nwjs-rt/nw.exe ."``` : Starts the app without any watching.

## Changing appearence

### Application icon

There are two definitions you might want to change: 'src/assets/icons/application.png' && 'src/assets/icons/application.svg'. 

The PNG variation is needed for the OS to show it on the taskbar, while the SVG is used in the application as upper-right icon (or whereever it is placed).

The SVG can be adapted to used the CSS custom properties '--sizeIcon' and '--colorIcon' as these properties are set by the application and can be configured easily to match the overall style and color scheme.

The usage of the PNG-variation can be found in 'package.json', while the SVG will be imported in 'App.svelte'.

### Application base font

This is defined in 'src/global.sass' as is per default 'Open Sane' as variable font. You might want to change that in case you want to use a different font.

### Application color scheme

Most values/colors are defined in 'src/global.sass' as custom properties and should be adapted there, as further concepts (like light/dark theme, and more) will be based on that. Otherwise you'll have to take care to update/change all further CSS custom properties which are build upon these base values.

## Issues & Troubleshooting / Q&A

- __*Q: The NW.js frame doesn't appear, why?*__
- __*Q: There is no frame and why i can't click things on my desktop anymore?*__
- A: In some situations it might appear that no frame from NW.js comes up, still the program seems to be running. If you furthermore experience weird behaviours of your mouse (can't click something) then the reason is: the NW.js-frame __-is-__ there, it is just completely transparent. This is related to errors in your code that needs to be fixed, as these errors prevent the content to rendered. And as the frame is set to be 'transparent' (for the frame customization) it seems to be 'invisible'.
