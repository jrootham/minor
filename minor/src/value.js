export class Value
{
	constructor(implicit)
	{
		this.implicit = implicit;
		this.map = new Map();
	}

	set (index, value)
	{
		this.map.set(index, value);
	}
	
	get(index)
	{
		if (this.map.has(index))
		{
			return this.map.get(index);
		}
		else
		{
			return implicit;
		}
	}
}
