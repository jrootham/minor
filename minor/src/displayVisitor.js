import {alert, setClickOnElement} from "./renderer.js"

const INSERT_CHILD = "⬇";
const INSERT_RIGHT = "➡";
const SET_VALUE = "●";

function wrap(content, css) 
{
	const wrapper = document.createElement("div");
 	content.forEach((element) => wrapper.appendChild(element));
	wrapper.className = css;

	return wrapper;
}

function wrappedButton(label, action, css) 
{
	let button = document.createElement("button");
	button.appendChild(document.createTextNode(label));
	setClickOnElement(button, action);
	return wrap([button], css);
}

function eldest(actual) 
{
	return actual.child && actual.parent == null;j
}

function leftmost(actual) 
{
	return actual.right && actual.left == null;j
}

function displayFamily(document, actual, className)
{ 
	const container = document.createElement("div");
	container.className = className;

	if (actual)
	{
		for(var value = actual.child ; value ; value = value.child)
		{
			const content = value.display(document, this);
			container.appendChild(wrap([content], className));
		}
	}

	container.appendChild(wrappedButton(INSERT_CHILD, null, className));

	return container;
}

export class DisplayVisitor
{
	displayOr(document, actual, css)
	{
		let left = wrap([document.createTextNode("|")], "inline");
		let right = wrap([document.createTextNode("|")], "inline");

		return wrap([left, right], css);
	}
	
	displayLiteral(document, actual, css)
	{
		return wrap([wrappedButton("Literal" + SET_VALUE, alert, "inline")], css);
	}
	
	displayText(document, actual, css)
	{
		return wrap([wrappedButton("Text" + SET_VALUE, alert, "inline")], css);
	}
	
	displayComment(document, actual, css)
	{
		return wrap([wrappedButton("Comment" + SET_VALUE, alert, "inline")], css);
	}
	
	displayTerminal(document, actual, css)
	{
		return wrap([wrappedButton("Terminal" + SET_VALUE, alert, "inline")], css);
	}
	
	displayIdentifier(document, actual, css)
	{
		return wrap([wrappedButton("Identifier" + SET_VALUE, alert, "inline")], css);
	}
}
