import {alert} from "./renderer.js"
import {wrappedButton} from "./wrap.js";
import {INSERT_DOWN, INSERT_RIGHT} from "./displayVisitor.js";
import {makeNewIdentifier, makeSetExtend} from "./set.js";
import {v4 as uuidv4} from 'uuid';

export const START = "start";

export class BaseNode
{
	constructor()
	{
		this.right = null;
	}

	extend(right)
	{
		this.right = right;
	}
}

export class CompileNode extends BaseNode
{
	constructor()
	{
		super();
		this.child = null;
	}

	adopt(child)
	{
		this.child = child;
	}
}


export class EditNode extends BaseNode
{
	constructor(type)
	{
		super();
		this.id = uuidv4();
		this.left = null;

		this.static = type;
		this.dynamic = type.make();
	}

	extend(right)
	{
		super.extend(right);
		right.left = this;
	}

	displayNode(displayVisitor)
	{
		return this.dynamic.display(displayVisitor, this);
	}

	display(displayVisitor, parent)
	{
		parent.appendChild(this.displayNode(displayVisitor));

		if (this.right)
		{
			this.right.display(displayVisitor, parent);
		}
		else
		{
			let setExtend = makeSetExtend(this);
			parent.appendChild(wrappedButton(INSERT_RIGHT, setExtend));
		}
	}

	compile()
	{
	}
}

export class EditOr extends EditNode
{
	constructor(type)
	{
		super(type);

		this.next = null;
	}

	attach(next)
	{
		this.next = next;
	}
}

export class EditOrStatement extends EditOr
{
	constructor(type)
	{
		super(type);
	}
}

export class EditChoice extends EditOr
{
	constructor(type)
	{
		super(type);

		this.previous = null;
	}

	attach(next)
	{
		super.attach(next);
		next.previous = this;
	}

	display(displayVisitor, parent)
	{
		parent.appendChild(this.displayNode(displayVisitor));
	}
}

export class EditChoiceStatement extends EditChoice
{
	constructor(type)
	{
		super(type);
	}
}

export class EditIdentifierStatement extends EditNode
{
	constructor(type)
	{
		super(type);
	}
}

export class EditIdentifier extends EditIdentifierStatement
{
	constructor(type)
	{
		super(type);

		this.up = null;
		this.down = null;
	}

	append(down)
	{
		this.down = down;
		down.up = this;
	}

	display(displayVisitor, parent)
	{
		let row = document.createElement("div");
		row.className = "block";
		super.display(displayVisitor, row);
		parent.appendChild(row);

		if (this.down)
		{
			this.down.display(displayVisitor, parent);
		}
		else
		{
			parent.appendChild(wrappedButton(INSERT_DOWN, makeNewIdentifier(this)));
		}
	}
}

