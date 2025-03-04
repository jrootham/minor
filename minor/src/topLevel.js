import {reset, setClick, getElement, getContents} from "./renderer.js";
import {Actual, Or, Literal, Text, Comment, Terminal, Identifier} from "./node.js";
import {editSyntax, editType, editFormat, editSemantics} from "./edit.js";
import {DisplayVisitor} from "./displayVisitor";

export function setup() 
{
	setClick("newProgram", newProgram);
	setClick("editSyntax", editSyntax);
	setClick("editType", editType);
	setClick("editFormat", editFormat);
	setClick("editSemantics", editSemantics);
}

// setClick("makeDialogue", makeDialogue);
// setClick("", );
// setClick("", );
// setClick("", );
// setClick("", );
// setClick("", );

var primitiveRoot = null;
var setActual = setPrimitive;

function setPrimitive(actual)
{
	primitiveRoot = actual;
}

function newProgram(event) 
{
	reset();
	primitiveRoot = null;
	getElement("makeDialogue").showModal();
}

function display() 
{
	let tree = primitiveRoot.display(document, new DisplayVisitor, "block");
	getContents().replaceChildren(tree);
}

setClick("makeOr", makeOr);

function makeOr(event) 
{
	setActual(new Actual(new Or()));
	display();
}

setClick("makeLiteral", makeLiteral);

function makeLiteral(event)
{
	setActual(new Actual(new Literal()));
	display();
}

setClick("makeText", makeText);

function makeText(event)
{
	setActual(new Actual(new Text()));
	display();
}

setClick("makeComment", makeComment);

function makeComment(event)
{
	setActual(new Actual(new Comment()));
	display();
}

setClick("makeTerminal", makeTerminal);

function makeTerminal(event)
{
	setActual(new Actual(new Terminal()));
	display();
}

setClick("makeIdentifier", makeIdentifier);

function makeIdentifier(event)
{
	setActual(new Actual(new Identifier()));
	display();
}
