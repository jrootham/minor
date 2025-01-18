
export const enumValue = (name) => Object.freeze({toString: () => name});

class Id 
{
	constructor()
	{
		this.id = 0;
	}

	next()
	{
		return this.id += 1;
	}
}

export var globalId = new Id();

