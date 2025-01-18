import {getContents, alert} from "./renderer.js";
import {bootstrapSyntax, bootstrapType, bootstrapFormat, ROOTNAME} from "./bootstrap.js";
import {Actual} from "./node.js";
import {Table} from "./symbols.js";
import {Value} from "./value.js";

function noValue(actual) 
{
	return "";
}

function showValue(actual) 
{
	return actual.value.toString();
}

function symbolValue(actual) 
{
	return symbolTable.getById(actual.value);
}


var divClass = new Value("inline");
divClass.set(ROOTNAME, "block");

displayValue = new Value(noValue);

class Globals
{
	constructor()
	{
		this.symbols = null;
		this.syntax = null;
		this.type = null;
		this.format = hack;
		this.semantics = null;
		this.actual = null;
	}
}

var globals = new Globals();

export function newProgram(event) 
{
	globals.syntax = new Actual(bootstrapSyntax, null);
	globals.symbols = new Table();
	globals.syntax.setName(globals.symbols, ROOTNAME);
	globals.type = new Actual(bootstrapType, null);
	reset();
	globals.actual = base(globals.syntax, getById("tree"));
}

export function editSyntax(event)
{
	alert();
}

export function editType(event)
{
	alert();
}

export function editFormat(event)
{
	alert();
}

export function editSemantics(event)
{
	alert();
}

function makeDom(model) 
{
	let active = document.createElement("div");

	if (model.type == TYPE.LIST)
	{
		result = active;
		active = document.createElement("div");
	}

	return result;
}

function base(model, baseDOM)
{
	let result = new Actual(model, null);


	return result;
}

function makeInsertChild(actual, action) 
{
	return function(event)
	{
		let child = new Actual(actual.model, null);
		actual.adopt(child);

		let target = event.currentTarget;
		toInsert = document.createElement("div");
		target.before(toInsert);
		toInsert.addChild(button("⨁", action));
		classList = toInsert.classList;
		classList.add(divClass.get(actual.getName()));
	}
}




//	⨀⨁⨂ 

function displayList(format, actual) 
{
	let className = format.get(actual.getName());
	let result = '<div class=' + className + '>';

	result += diplayEntry(className, actual.child);

	result += button()
	result += '</div>';

	return result;
}

function displayOr(argument) 
{
}

function displayActual(actual, before, after, actionString) 
{
	if (null === actual.value)
	{
		return button(actionString);
	}
	else
	{
		return before + actual.value + after;
	}
}

var displayType = new Map();

displayType.add(Type.LIST, (actual) => return ""):
displayType.add(Type.OR, (actual) => return "");
displayType.add(Type.TERMINAL, (actual) => return actual.value);
displayType.add(Type.LITERAL, (actual) => return displayActual(actual, "", "")
displayType.add(Type.TEXT, (actual) =>
displayType.add(Type.SYMBOL, (actual) =>
displayType.add(Type.COMMENT, (actual) =>
