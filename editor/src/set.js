import {Identifier, SYMBOL_REGEX} from "./type.js";
import {getElement, empty, alert} from "./renderer.js";
import {EditNode, EditIdentifier} from "./node.js";
import {display, editSymbols, compileSymbols} from "./topLevel.js";
import {wrapBlock, wrappedButton, wrappedText, wrappedBlockButton, unwrapFirst} from "./wrap.js";
import {Or, Literal, Text, Comment, Terminal, Reference} from "./type.js";
import {OrStatement, Choice, ChoiceStatement, ReferenceStatement, IdentifierStatement} from "./type.js";

export function makeSetCommon(edit, title, setValue, regex) 
{
	return event =>
	{
		fillCommon(edit, title, setValue, regex);
		getElement("dialogueSkeleton").showModal();
	}
}

function fillCommon(edit, title, setValue, regex) 
{
	let root = getElement("dialogueRoot");
	empty(root);

	root.appendChild(wrappedText(title));

	let input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("pattern", regex);
	root.appendChild(wrapBlock([input]));

	let wrapped = wrappedButton("OK", makeChangeCommon(input, edit, setValue));
	root.appendChild(wrapped);

	let button = unwrapFirst(wrapped);

	input.addEventListener("input", event => button.disabled = input.validity.patternMismatch);
}

function makeChangeCommon(input, edit, setValue)
{
	return event => 
	{
		setValue(edit, input.value);
		display();
	}
}

export function makeNewChoice(editOr)
{
	return event =>
	{
		let which = () => new Choice();
		attach(editOr, which);
		display();
	}
}

export function makeNewChoiceStatement(editOrStatement)
{
	return event =>
	{
		let which = () => new ChoiceStatement();
		attach(editOrStatement, which);
		display();
	}
}

function attach(editOr, make)
{
	let tail = findTail(editOr);
	let choice = make();
	tail.attach(choice.makeEditNode());
}

function findTail(edit) 
{
	if (edit.next) 
	{
		var result = edit.next;
		while (result.next)
		{
			result = result.next;
		}

		return result;
	}
	else
	{
		return edit;
	}
}

export function makeNewIdentifier(editIdentifier) 
{
	return event =>  
	{
		editIdentifier.append(new EditIdentifier(new Identifier));
		display();
	}
}

export function makeSetIdentifier(editIdentifier) 
{
	return event =>
	{
		fillIdentifier("dialogueRoot", editSymbols, editIdentifier);
		getElement("dialogueSkeleton").showModal();
	}
}

export function makeSetIdentifierStatement(editIdentifierStatement) 
{
	return event =>
	{
		fillIdentifier("dialogueRoot", compileSymbols, editIdentifierStatement);
		getElement("dialogueSkeleton").showModal();
	}
}

export function makeSetReference(editReference) 
{
	return event =>
	{
		fillReference("dialogueRoot", editSymbols, editReference);
		getElement("dialogueSkeleton").showModal();
	}
}

export function makeSetReferenceStatement(editReference) 
{
	return event =>
	{
		fillReference("dialogueRoot", compileSymbols, editReference);
		getElement("dialogueSkeleton").showModal();
	}
}

export function makeSetChoice(editChoice) 
{
	return makeSetReference(editChoice);
}

export function makeSetChoiceStatement(editChoice) 
{
	return makeSetReferenceStatement(editChoice);
}

function fillReference(rootName, symbols, editReference) 
{
	fillName(rootName, symbols, editReference, symbols.getAllNames());
}

function makeChangeName(symbols, name, editName) 
{
	return event =>
	{
		editName.dynamic.setName(symbols, name.value, editName);
		display();
	}
}

function makeCopyName(name) 
{
	return event => name.value = event.target.value;
}

function fillIdentifier(rootName, symbols, editIdentifier)
{
	fillName(rootName, symbols, editIdentifier, symbols.getUndefinedNames());
} 

function makeOption(name)
{
	let option = document.createElement("option");
	option.setAttribute("name", name);
	option.appendChild(document.createTextNode(name));

	return option;
}

function fillName(rootName, symbols, editName, nameList) 
{
	let root = getElement(rootName);
	empty(root);

	root.appendChild(wrappedText("Symbol Name"));

	let pick = document.createElement("select");
	root.appendChild(wrapBlock([pick]));

	pick.appendChild(makeOption(""));
	nameList.map(makeOption).forEach((option) => pick.appendChild(option));

	let name = document.createElement("input");
	name.setAttribute("type", "text");
	name.setAttribute("pattern", SYMBOL_REGEX);
	root.appendChild(wrapBlock([name]));

	let wrapped = wrappedButton("OK", makeChangeName(symbols, name, editName));

	root.appendChild(wrapped);

	pick.addEventListener("change", makeCopyName(name));

	let button = unwrapFirst(wrapped);

	name.addEventListener("input", event => button.disabled = name.validity.patternMismatch);
}

function setAMake(root, editNode, makeName, make) 
{
	let click = event => 
	{
		let type = make();
		editNode.extend(type.makeEditNode());
		display();
	}

	root.appendChild(wrappedBlockButton(makeName, click));
}

function setMakes(root, editNode) 
{
	setAMake(root, editNode, "Or", () => new Or());
	setAMake(root, editNode, "Numeric literal", () => new Literal());
	setAMake(root, editNode, "Text", () => new Text());
	setAMake(root, editNode, "Comment", () => new Comment());
	setAMake(root, editNode, "Terminal", () => new Terminal());
	setAMake(root, editNode, "Reference", () => new Reference());
	setAMake(root, editNode, "Or Statement", () => new OrStatement());
	setAMake(root, editNode, "Reference Statement", () => new ReferenceStatement());
	setAMake(root, editNode, "Identifier Statement", () => new IdentifierStatement());
}

export function makeSetExtend(editNode)
{
	return event => 
	{
		let root = getElement("dialogueRoot");
		empty(root);

		setMakes(root, editNode);

		getElement("dialogueSkeleton").showModal();
	}
}
