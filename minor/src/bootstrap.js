//  Bootstrap language

// Syntax

import {Table} from "./symbols.js";
import {Type, Model} from "./node.js";
import {display} from "./display.js";
import {getContents} from "./renderer.js";

export const ROOTNAME = "root";

var bootstrapSymbols = new Table();

function makeSyntax() 
{
	let terminal = new Model(bootstrapSymbols, "Terminal", Type.LIST);
	let symbol = new Model(bootstrapSymbols, "Symbol", Type.SYMBOL);
	let string = new Model(bootstrapSymbols, "String", Type.TEXT);
	let literal = new Model(bootstrapSymbols, "Literal", Type.LITERAL);
	let comment = new Model(bootstrapSymbols, "Comment", Type.COMMENT);
	let or = new Model(bootstrapSymbols, "Or", Type.OR);
	let list = new Model(bootstrapSymbols, "List", Type.LIST);

	let choose = new Model(bootstrapSymbols, "Choose", Type.OR);
	let syntax = new Model(bootstrapSymbols, "Elements", Type.LIST);

	syntax.adopt(choose);
	choose.adopt(terminal);

	terminal.append(choose);
	symbol.append(choose);
	string.append(literal);
	literal.append(choose);
	comment.append(choose);
	or.append(choose);

	terminal.extend(symbol);
	symbol.extend(string);
	string.extend(literal);
	literal.extend(comment);
	comment.extend(or);
	or.extend(list);

	return syntax;
}

export var bootstrapSyntax = makeSyntax();

export var bootstrapType = null;

// Format specs

export var bootstrapFormat = null;

// function makeRegex() 
// {
// 	let symbol = new Model(bootstrapSymbols, "Symbol", Type.SYMBOL);
// 	let regex = new Model(bootstrapSymbols, "RegexValue", Type.REGEX);
// 	let line = new Model(bootstrapSymbols, "RegexLine", Type.LIST);
// 	let lineList = new Model(bootstrapSymbols, "RegexLineList", Type.LIST);

// 	symbol.extend(regex);
// 	line.adopt(symbol);
// 	lineList
// 	return lineList;
// }


