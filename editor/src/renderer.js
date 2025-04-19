/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import {setup} from "./topLevel.js"

setup();

export function getElement(id)
{
	return document.getElementById(id);
}

export function setClick(id, action) 
{
	getElement(id).addEventListener("click", action);
}

export function setClickOnElement(element, action) 
{
	element.addEventListener("click", action);
}

export function getContents()
{
	return getElement("contents");
}

export function alert() 
{
	window.alert("Not implemented");
}

export function empty(element)
{
	element.replaceChildren();
}

export function reset() 
{
	empty(getContents());
}
