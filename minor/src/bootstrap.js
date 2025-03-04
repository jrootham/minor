//  Bootstrap language

// Syntax

import {Table} from "./symbols.js";
import {Or, Literal, Text, Comment, Terminal, Identifier} from "./node.js";

export const ROOTNAME = "root";

var bootstrapSymbols = new Table();

function makeSyntax() 
{
	let terminal = new Terminal();
	let identifier = new Identifier();
	let text = new Text();
	let literal = new Literal();
	let comment = new Comment();
	let or = new Or();

	let choose = new Or();

	terminal.setName(bootstrapSymbols, "Terminal");
	identifier.setName(bootstrapSymbols, "Identifier");
	text.setName(bootstrapSymbols, "Text");
	literal.setName(bootstrapSymbols, "Literal");
	comment.setName(bootstrapSymbols, "Comment");
	or.setName(bootstrapSymbols, "Or");

	choose.append(terminal);
	choose.adopt(choose);

	terminal.append(identifier);
	identifier.append(text);
	text.append(literal);
	literal.append(comment);
	comment.append(or);

	terminal.extend(choose);
	identifier.extend(choose);
	text.extend(choose);
	literal.extend(choose);
	comment.extend(choose);
	or.extend(choose);

	return choose;
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


