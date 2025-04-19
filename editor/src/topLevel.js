import {reset, setClick, getElement, getContents} from "./renderer.js";
import {START, EditNode, EditIdentifier} from "./node.js";
import {Or, Literal, Text, Comment, Terminal, Identifier} from "./type.js";
import {Table} from "./symbols.js";
import {DisplayVisitor} from "./displayVisitor";

export function setup() 
{
	setClick("newProgram", newProgram);
}

var editingRoot = null;
export var editSymbols = null;
export var compileSymbols = null;

function newProgram(event) 
{
	editingRoot = new EditIdentifier(new Identifier());
	let identifier = editingRoot.dynamic;
	editSymbols = new Table();
	compileSymbols = new Table();
	identifier.setName(editSymbols, START, editingRoot);
	display();
}

export function display() 
{
	reset();
	editingRoot.display(new DisplayVisitor, getContents());
}

