import {setClickOnElement} from "./renderer.js";

export function wrapLine(content)
{
	return wrap(content, "inline");
} 

export function wrapBlock(content)
{
	return wrap(content, "block");
} 

export function wrap(content, className) 
{
	const wrapper = makeWrapper(className);
 	content.forEach((element) => wrapper.appendChild(element));

	return wrapper;
}

export function makeWrapper(className) 
{
	const wrapper = document.createElement("div");
	wrapper.className = className;

	return wrapper;
}

export function wrappedText(text)
{
	return wrapLine([document.createTextNode(text)]);
}

export function wrappedButton(label, action) 
{
	return wrapLine([makeButton(label, action)]);
}

export function unwrapFirst(wrapper) 
{
	return wrapper.childNodes[0];
}

export function wrappedBlockButton(label, action) 
{
	return wrapBlock([makeButton(label, action)]);
}

function makeButton(label, action)
{
	let button = document.createElement("button");
	button.appendChild(document.createTextNode(label));
	setClickOnElement(button, action);

	return button;
}

