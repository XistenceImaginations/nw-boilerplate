// src/app.js

/*
 * Main entry point for Svelte to build the the app. We also request
 *  system information to provide these to the app and import the
 *  global styles.
 */
const sysInfo = require('systeminformation');

import appInfo from '../package.json';
import './global.sass';

import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'NWjs/Svelte/SAS/Pug-Boilerplate',
		version: '1.0.0',
		appInfo,
		sysInfo
	}
});

export default app;