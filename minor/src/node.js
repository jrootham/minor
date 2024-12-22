// Fundamental data structures

// Enum fakery

// Types

const enumValue = (name) => Object.freeze({toString: () => name});

const Type = Object.freeze(
{
      LIST: enumValue("Type.LIST")
    , OR: enumValue("Type.OR")
    , TERMINAL: enumValue("Type.TERMINAL")
    , LITERAL: enumValue("Type.LITERAL")
    , TEXT: enumValue("Type.TEXT")
    , SYMBOL: enumValue("Type.SYMBOL")
    , REGEX: enumValue("Type.REGEX")
    , COMMENT: enumValue("Type.COMMENT")
});

// Node definition

class Node
{
	constructor(symbolTable, type, name, value)
	{
		entry = symbolTable.add(name);
		this.id = entry.id;
		this.type = type;
		this.parent = null;
		this.child = null;
		this.left = null;
		this.right = null;
		this.value = value;
	}

	extend(right)
	{
		this.right = right;
		right.left = this;
	}

	adopt(child)
	{
		this.child = child;
		child.parent = this;
	}
}
