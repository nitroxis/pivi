var es = require("event-stream");
var Rune = require("rune.js");
var glob = require("glob");

var commands = {};

glob("./rune/*.js", { cwd: __dirname }, function(err, files)
{
	if(err)
		throw err;
	
	files.forEach(function(file)
	{
		var lib = require(file);
		
		for(var func in lib)
			commands[func] = lib[func];
	});
});

function nodeToString(node, addNamespace)
{
	// open tag.
	var str = "<" + node.tagName;
	
	// add namespace attribute.
	if(addNamespace) str += ' xmlns="http://www.w3.org/2000/svg"';
	
	// add attributes.
	if(node.properties && node.properties.attributes)
	{
		var attrs = node.properties.attributes;
		for(var key in attrs)
		{
			if(attrs[key])
				str += ' ' + key + '=\"' + attrs[key].toString() + '"';
		}
	}
	
	str += ">";

	// add children.
	if(node.children)
	{
		node.children.forEach(function(child)
		{
			str += nodeToString(child);
		});
	}
	
	// close tag.
	str += "</" + node.tagName + ">";
	
	return str;
}

module.exports = function(outFile)
{
	outFile = outFile || "./out%d.svg";
	
	var rune = null;
	
	var initializeRune = function(data)
	{
		rune = new Rune(data);
	};
	
	initializeRune({width: 200, height: 200});
	
	return es.through(
		function write(data)
		{
			if(!data.type)
			{
				return;
			}
			else if(data.type === "initialize")
			{
				initializeRune(data);
			}
			else
			{
				var cmd = commands[data.type];
				if(!cmd)
				{
					console.error(data.type + " not implemented.");
					return;
				}

				cmd(rune, data.data);
			}
		},
		function end()
		{
			rune.draw();
			
			var tree = rune.renderer.tree;
			var el = rune.getEl();
			
			console.log(nodeToString(tree, true));
		}
	);
}

