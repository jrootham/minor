import {EditNode, EditOr, EditChoice, EditIdentifier} from "./node.js";
import {EditOrStatement, EditChoiceStatement, EditIdentifierStatement} from "./node.js";

export const SYMBOL_REGEX = "\\S*";
export const LITERAL_REGEX = "-?\\d+(\\.\\d*)?";
export const TEXT_REGEX = ".*";
export const COMMENT_REGEX = ".*";
export const TERMINAL_REGEX = ".*";

export class Type
{
	constructor(){}

	make(){}

	makeEditNode()
	{
		return new EditNode(this);
	}

	display(displayVisitor, actual){}
}

export class Named extends Type
{
	constructor()
	{
		super();

		this.entry = null;
	}

	setName(symbolTable, name)
	{
		this.entry = symbolTable.add(name);

		return this.entry;
	}

	// copyName(symbolTable, other)
	// {
	// 	if (this.id)
	// 	{
	// 		const entry = this.symbolTable.getById(this.id);
	// 		other.symbolTable = symbolTable;
	// 		const otherEntry = symbolTable.add(entry.name);
	// 		other.id = otherEntry.id;
	// 	}
	// }

	getId()
	{
		if (this.hasName())
		{
			return this.entry.id;
		}
		else
		{
			return null;
		}
	}

	getName()
	{
		if (this.hasName())
		{
			return this.entry.getName();
		}
		else
		{
			return null;
		}
	}

	hasName()
	{
		return null !== this.entry;
	}
}

export class Reference extends Named
{
	constructor()
	{
		super();
	}

	make()
	{
		return new Reference();
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayReference(actual);
	}
}

export class Choice extends Reference
{
	constructor()
	{
		super();
	}

	make()
	{
		return new Choice();
	}

	makeEditNode()
	{
		return new EditChoice(this);
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayChoice(actual);
	}
}

export class Or extends Type
{
	constructor()
	{
		super();
	}

	make()
	{
		return new Or();
	}

	makeEditNode()
	{
		return new EditOr(this);
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayOr(actual);
	}
}

export class OrStatement extends Type
{
	constructor()
	{
		super();
	}

	make()
	{
		return new OrStatement();
	}

	makeEditNode()
	{
		return new EditOrStatement(this);
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayOrStatement(actual);
	}
}

export class ChoiceStatement extends Choice
{
	constructor()
	{
		super();
	}

	make()
	{
		return new ChoiceStatement();
	}

	makeEditNode()
	{
		return new EditChoiceStatement(this);
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayChoiceStatement(actual);
	}
}

export class ReferenceStatement extends Reference
{
	constructor()
	{
		super();
	}

	make()
	{
		return new ReferenceStatement();
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayReferenceStatement(actual);
	}
}

export class Literal extends Type
{
	constructor()
	{
		super();

		this.literal = null;
	}

	make()
	{
		return new Literal();
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayLiteral(actual);		
	}
}

export class Text extends Type
{
	constructor()
	{
		super();

		this.text = null;
	}

	make()
	{
		return new Text();
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayText(actual);
	}
}

export class Comment extends Type
{
	constructor()
	{
		super();

		this.comment = null;
	}

	make()
	{
		return new Comment();
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayComment(actual);
	}
}

export class Terminal extends Type
{
	constructor()
	{
		super();

		this.terminal = null;
	}

	setTerminal(terminal)
	{
		this.terminal = terminal;
	}

	make()
	{
		return new Terminal();
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayTerminal(actual);
	}
}

export class Identifier extends Named
{
	constructor()
	{
		super();
	}

	make()
	{
		return new Identifier();
	}

	setName(symbolTable, name, reference)
	{
		let entry = super.setName(symbolTable, name);
		entry.reference = reference;
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayIdentifier(actual);
	}
}

export class IdentifierStatement extends Identifier
{
	constructor()
	{
		super();
	}

	make()
	{
		return new IdentifierStatement();
	}

	makeEditNode()
	{
		return new EditIdentifierStatement(this);
	}

	display(displayVisitor, actual)
	{
		return displayVisitor.displayIdentifierStatement(actual);
	}
}

