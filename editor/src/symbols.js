import {v4 as uuidv4} from 'uuid';

// Symbol table code

// Connects name to unique id
// Lookup by name or id which is unique across the universe
// Shared across languages
// Name is editable

export class Entry
{
	constructor(table)
	{
		this.id = uuidv4();
		this.scopeChain = table;
		this.reference = null;
	}

	getName()
	{
		return this.scopeChain.getNameById(this.id);
	}

	isUndefined()
	{
		return null === this.reference;
	}
}

export class Table
{
	constructor()
	{
		this.nameToId = new Map();
		this.idToName = new Map();
		this.idToEntry = new Map();
	}

	add(name)
	{
		if (this.nameToId.has(name))
		{
			let id = this.nameToId.get(name);
			return this.idToEntry.get(id);
		}
		else
		{
			const entry = new Entry(this);

			this.nameToId.set(name, entry.id);
			this.idToName.set(entry.id, name);
			this.idToEntry.set(entry.id, entry);

			return entry;
		}
	}

	getAllNames()
	{
		return this.getNames((entry, index) => true);
	}

	getUndefinedNames()
	{
		return this.getNames((entry, index) => entry.isUndefined());
	}

	getNames(filter)
	{
		let entries = this.idToEntry.values();
		let filtered = entries.filter(filter);
		let raw = filtered.map((entry, index) => this.idToName.get(entry.id));
		return (raw.toArray()).toSorted();
	}

	getEntryByName(name)
	{
		return this.idToEntry.get(this.nameToId.get(name));
	}

	doesNotHaveName(name)
	{
		return ! this.nameToId.has(name);
	}

	getEntryById(id)
	{
		return this.idToEntry.get(id);
	}

	getNameById(id)
	{
		return this.idToName.get(id);
	}

	rename(id, newName)
	{
		if (this.doesNotHaveName(newName))
		{
			oldName = this.idToName.get(id);
			this.nameToId.delete(oldName);
			this.nameToId.set(name, id);
			this.idToName.set(id, name);
		}
	}
}
