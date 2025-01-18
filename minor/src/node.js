import {enumValue} from "./common.js";

// Fundamental data structures

// Enum fakery

// Types

export const Type = Object.freeze(
{
      LIST: enumValue("Type.LIST")
    , OR: enumValue("Type.OR")
    , TERMINAL: enumValue("Type.TERMINAL")
    , LITERAL: enumValue("Type.LITERAL")
    , TEXT: enumValue("Type.TEXT")
    , SYMBOL: enumValue("Type.SYMBOL")
//    , REGEX: enumValue("Type.REGEX")
    , COMMENT: enumValue("Type.COMMENT")
});

// Node definition 

export class Node
{
	constructor()
	{
		this.hasName = false;
		this.child = null;
		this.right = null;
		this.down = null;
	}

	setName(symbolTable, name)
	{
		this.symbolTable = symbolTable;
		const entry = symbolTable.add(name);
		this.id = entry.id;
		this.hasName = true;
	}

	extend(right)
	{
		this.right = right;
	}

	append(down)
	{
		this.down = down;
	}

	adopt(child)
	{
		this.child = child;
	}

	getName()
	{
		let result = "";

		if (this.hasName)
		{
			result = this.symbolTable.getById(this.id).name;
		}

		return result;
	}
}

export class Model extends Node
{
	constructor(type)
	{
		super();
		this.type = type;
	}
}

export class Terminal extends Model
{
	constructor(value)
	{
		super(Type.TERMINAL);
		this.value = value;
	}
}

export class Symbol extends Model
{
	constructor(regex)
	{
		super(Type.SYMBOL);
		this.regex = regex;
	}
}

export class Actual extends Node
{
	constructor(model, value)
	{
		super();

		this.parent = null;
		this.left = null;
		this.up = null;

		this.model = model;
		this.value = value;
	}

	extend(right)
	{
		super.extend(right)
		right.left = this;
	}

	append(down)
	{
		super.append(down)
		down.up = this;
	}

	adopt(child)
	{
		super.adopt(child)
		child.parent = this;
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
