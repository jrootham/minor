//  Boostrap language

// Syntax

//  list List >element
//  element List >or
//  or Or terminal symbol string literal 

function makeBootstrap() 
{
	let terminal = new CTerminal()
	let symbol = new CSymbol()
	let string = new CString ()
	let literal = new Literal()

	let or = new Or()

	let element = new List()
	
	let root = new List()
	root.add(element) 
}