

export class Node
{
	constructor()
	{
		this.child = null;
		this.right = null;
		this.nextChoice = null;
	}

	copyData(other)
	{
		other.child = this.child;
		other.right = this.right;
		other.nextChoice = this.nextChoice;
	}
}

export class Model extends Node
{
	constructor()
	{
		super();
		this.symbolTable = null;
		this.id = null;
	}

	make(){}

	setName(symbolTable, name)
	{
		this.symbolTable = symbolTable;
		const entry = symbolTable.add(name);
		this.id = entry.id;
	}

	copyName(symbolTable, other)
	{
		if (this.id)
		{
			const entry = this.symbolTable.getById(this.id);
			other.symbolTable = symbolTable;
			const otherEntry = symbolTable.add(entry.name);
			other.id = otherEntry.id;
		}
	}

	extend(right)
	{
		this.right = right;
	}

	appendChoice(nextChoice)
	{
		this.nextChoice = nextChoice;
	}

	adopt(child)
	{
		this.child = child;
	}

	display(document, displayVisitor, actual, css){}
}

export class Or extends Model
{
	constructor()
	{
		super();
	}

	make()
	{
		return new Or();
	}

	display(document, displayVisitor, actual, css)
	{
		return displayVisitor.displayOr(document, actual, css);
	}
}

export class Literal extends Model
{
	constructor()
	{
		super();
	}

	make()
	{
		return new Literal();
	}

	display(document, displayVisitor, actual, css)
	{
		return displayVisitor.displayLiteral(document, actual, css);		
	}
}

export class Text extends Model
{
	constructor()
	{
		super();
	}

	make()
	{
		return new Text();
	}

	display(document, displayVisitor, actual, css)
	{
		return displayVisitor.displayText(document, actual, css);
	}
}

export class Comment extends Model
{
	constructor()
	{
		super();
	}

	make()
	{
		return new Comment();
	}

	display(document, displayVisitor, actual, css)
	{
		return displayVisitor.displayComment(document, actual, css);
	}
}

export class Terminal extends Model
{
	constructor()
	{
		super();
	}

	setTerminal(value)
	{
		this.value = value;
	}

	make()
	{
		return new Terminal();
	}

	display(document, displayVisitor, actual, css)
	{
		return displayVisitor.displayTerminal(document, actual, css);
	}
}

export class Identifier extends Model
{
	constructor()
	{
		super();
		this.regex = "*.";
	}

	setRegex(regex)
	{
		this.regex = regex;
	}

	make()
	{
		return new Identifier();
	}

	display(document, displayVisitor, actual, css)
	{
		return displayVisitor.displayIdentifier(document, actual, css);
	}
}

export class Actual extends Node
{
	constructor(model)
	{
		super();

		this.parent = null;
		this.left = null;
		this.previous = null;

		this.model = model;
		this.current = model.make();
		this.value = null;
	}

	extend(right)
	{
		super.extend(right)
		right.left = this;
	}

	appendChoice(nextChoice)
	{
		super.append(nextChoice)
		nextChoice.previous = this;
	}

	adopt(child)
	{
		super.adopt(child)
		child.parent = this;
	}

	display(document, displayVisitor, css)
	{
		return this.model.display(document, displayVisitor, this, css);
	}

	getName()
	{
		return super.getName();
	}

	getParentName()
	{
		if (this.parent === null)
		{
			return this.getName();
		}
		else
		{
			this.parent.getParentName();
		}
	}

	compile(symbolTable)
	{
		let result = new Model(this.model.type);

		if (this.hasName)
		{
			result.addName(symbolTable, this.getName());
		}

		return result;
	}
}
