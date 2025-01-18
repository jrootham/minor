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
// import {displayBootstrap} from "./bootstrap.js";
import {newProgram, editSyntax, editType, editFormat, editSemantics} from "./edit.js";

export function getElement(id)
{
	return document.getElementById(id);
}

// getElement("bootstrapSyntax").addEventListener("click", displayBootstrap);
getElement("newProgram").addEventListener("click", newProgram);
getElement("editSyntax").addEventListener("click", editSyntax);
getElement("editType").addEventListener("click", editType);
getElement("editFormat").addEventListener("click", editFormat);
getElement("editSemantics").addEventListener("click", editSemantics);

export function getContents()
{
	return getElement("contents");
}

export function alert() 
{
	window.alert("Not implemented");
}

export function reset() 
{
	getContents.innerHTML = '<div id="tree"></div>';
}

export function button(label, action) 
{
	let button = document.createElement("button");
	button.appendChild(label);
	button.addEventListener("click", action);

	return button;
}
