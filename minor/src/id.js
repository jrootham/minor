class Id 
{
	constructor()
	{
		this.id = 0;
	}

	next()
	{
		this.id += 1;
		return "Id" + this.id;
	}
}

var id = new Id();

