// Symbol table code

// Connects name to unique id
// Lookup by name or id
// Shared across languages
// Name is editable

class Entry
{
	constructor(name)
	{
		this.name = name;
		this.id = Symbol();
		this.scopeChain = null;m
	}
}

class Table
{
	constructor()
	{
		this.nameTable = new Map();
		this.idTable = new Map();
	}

	add(name)
	{
		if (this.nameTable.has(name))
		{
			return this.nameTable.get(name);
		}
		else
		{
			entry = new Entry(name);
			this.nameTable.set(name, entry);
			this.idTable.set(entry.id, entry);
			return entry;
		}
	}

	getByName(name)
	{
		return this.nameTable(name);
	}

	getById(id)
	{
		return this.idTable.get(id);
	}

	rename(id, name)
	{
		entry = this.getById(id);
		this.nameTable.delete(entry.name);
		entry.name = name;
		this.nameTable.set(name, entry);
	}
}
