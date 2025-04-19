import {alert} from "./renderer.js";
import {wrapLine, wrappedText, wrappedButton, makeWrapper} from "./wrap.js";
import {makeSetIdentifier, makeSetReference, makeSetCommon} from "./set.js";
import {makeNewChoice, makeNewChoiceStatement, makeSetChoice} from "./set.js";
import {makeSetIdentifierStatement, makeSetChoiceStatement} from "./set.js";
import {makeSetReferenceStatement} from "./set.js";
import {LITERAL_REGEX, TEXT_REGEX, COMMENT_REGEX, TERMINAL_REGEX} from "./type.js";

export const INSERT_DOWN = " ⬇ ";
export const INSERT_RIGHT = " ➡ ";
export const SET_VALUE = " ● ";

export class DisplayVisitor
{
	displayOr(editOr)
	{
		return displayOr(this, editOr, makeNewChoice(editOr));
	}
	
	displayOrStatement(editOrStatement)
	{
		return displayOr(this, editOrStatement, makeNewChoiceStatement(editOrStatement));
	}

	displayChoice(edit)
	{
		return displayNamed(edit, "% Choice %", makeSetChoice);
	}

	displayChoiceStatement(edit)
	{
		return displayNamed(edit, "% Choice %", makeSetChoiceStatement);
	}

	displayLiteral(edit)
	{
		let get = edit => edit.dynamic.literal;
		let put = (edit, value) => edit.dynamic.literal = value;
		return displayCommon(edit, "Literal", get, put, "", "", LITERAL_REGEX);
	}
	
	displayText(edit)
	{
		let get = edit => edit.dynamic.text;
		let put = (edit, value) => edit.dynamic.text = value;
		return displayCommon(edit, "Text", get, put, '"', '"', TEXT_REGEX);
	}
	
	displayComment(edit)
	{
		let get = edit => edit.dynamic.comment;
		let put = (edit, value) => edit.dynamic.comment = value;
		return displayCommon(edit, "Comment", get, put, "/* ", " */", COMMENT_REGEX);
	}
	
	displayTerminal(edit)
	{
		let get = edit => edit.dynamic.terminal;
		let put = (edit, value) => edit.dynamic.terminal = value;
		return displayCommon(edit, "Terminal", get, put, "", "", TERMINAL_REGEX);
	}
	
	displayReference(edit)
	{
		return displayNamed(edit, "% Reference %", makeSetReference);
	}

	displayIdentifier(edit)
	{
		return displayNamed(edit, "% Identifier %", makeSetIdentifier);
	}

	displayReferenceStatement(edit)
	{
		return displayNamed(edit, "% Reference %", makeSetReferenceStatement);
	}

	displayIdentifierStatement(edit)
	{
		return displayNamed(edit, "% Identifier %", makeSetIdentifierStatement);
	}
}

function displayPlain(title) 
{
	return wrappedText([title]);
}

function displayOr(displayVisitor, edit, addFunction) 
{
	let line = [wrappedText("|")];

	for (let next = edit.next ; next ; next = next.next)
	{
		let block = makeWrapper("inline");
		next.display(displayVisitor, block);
		line.push(block);
	}

	line.push(wrappedButton(INSERT_RIGHT, addFunction));

	line.push(wrappedText("|"));

	return wrapLine(line);
}


function displayCommon(edit, title, get, put, before, after, regex)
{
	const value = get(edit);
	if (null === value)
	{
		let make = makeSetCommon(edit, title, put, regex);
		return wrapLine([wrappedText(title), wrappedButton(SET_VALUE, make)]);
	}
	else
	{
		return wrapLine([wrappedText(before + value + after)]);
	}
}

function displayNamed(edit, label, action) 
{
	let named = edit.dynamic;
	if (named.hasName())
	{
		return wrappedText("%" + named.getName());
	}
	else
	{
		let text = wrappedText(label);
		let button = wrappedButton(SET_VALUE, action(edit));
		return wrapLine([text, button]);
	}
}

