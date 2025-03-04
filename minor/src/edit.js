import {getContents, alert} from "./renderer.js";
// import {bootstrapSyntax, bootstrapType, bootstrapFormat, ROOTNAME} from "./bootstrap.js";
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
// divClass.set(ROOTNAME, "block");

var displayValue = new Value(noValue);

class Globals
{
	constructor()
	{
		this.symbols = null;
		this.syntax = null;
		this.type = null;
		this.format = null;
		this.semantics = null;
		this.actual = null;
	}
}

var globals = new Globals();

export function newProgram(event) 
{
 	globals.symbols = new Table();


// 	globals.syntax = new Actual(bootstrapSyntax, null);
// 	globals.syntax.setName(globals.symbols, ROOTNAME);
// 	globals.type = new Actual(bootstrapType, null);
// 	reset();
// 	globals.actual = base(globals.syntax, getById("tree"));
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

