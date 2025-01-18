import {Type} from "./node.js";

const around = new Map();

around.set(Type.LIST, {lead:"", trail:""});
around.set(Type.OR, {lead:"|", trail:"|"});
around.set(Type.TERMINAL, {lead:"", trail:""});
around.set(Type.LITERAL, {lead:"", trail:""});
around.set(Type.TEXT, {lead:'"', trail:'"'});
around.set(Type.SYMBOL, {lead:"%", trail:""});
around.set(Type.REGEX, {lead:"", trail:""});
around.set(Type.COMMENT, {lead:"//", trail:""});

class ClassName
{

}

export function display(done, node) 
{
	let result;
	let value;

	if (node === null)
	{
		result = "";
	}
	else
	{
		if (done.has(node.id))
		{
			value = "...";
		}
		else
		{
			done.add(node.id);
			console.log(node.getName());
			console.log(node.type.toString());
			const lead = around.get(node.type).lead;
			const trail = around.get(node.type).trail;
			value =  lead + node.getName() + trail;
			value += display(done, node.right);
			value += display(done, node.down);
			value += display(done, node.child);
		}
		result = '<div class="inline">' + value + '</div>';
	}

	return result;
}

 