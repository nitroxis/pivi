var fs = require("fs");
var es = require("event-stream");
var Rune = require("rune.js");
var printf = require("printf");

// convert xml node/tree to string.
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
	var rune = null;
	var frame = 0;
	var previousInitializationData = null;
	
	var state = 
	{
		color: "#ff00ff",
		pointSize: 0.5,
		lineWidth: 1.0,
	}
	
	var initializeRune = function(data)
	{
		if(!data) data = previousInitializationData;
		
		rune = new Rune(data);
		
		previousInitializationData = data;
	};
	
	initializeRune({width: 200, height: 200});
	
	var outputImage = function()
	{
		rune.draw();
		
		var tree = rune.renderer.tree;
		var el = rune.getEl();
		var str = nodeToString(tree, true);
	
		if(outFile)
		{
			// output to file.
			var fileName = printf(outFile, frame);
			var stream = fs.createWriteStream(fileName);
			stream.write(str);
			stream.end();
		}
		else
		{
			// output to stdout.
			console.log(str);
		}
		
		++frame;
	}	
	
	return es.through(
		function write(input)
		{
			var type = input.type;
			var data = input.data;
			
			if(!type)
			{
				return;
			}
			else if(input.isProperty)
			{
				switch(type)
				{
					case "lineWidth":
					{
						state.lineWidth = data;
						break;
					}		
				}
			}
			else
			{
				switch(type)
				{
					case "initialize":
					{
						initializeRune(data);
					
						break;
					}
					
					case "newframe":
					{
						outputImage();
						initializeRune();
						
						break;
					}				
						
					case "lines":
					{
						for(var i = 0; i < data.length; i += 2)
						{
							var start = data[i];
							var end = data[i + 1];
							rune.line(start.x, start.y, end.x, end.y).strokeWidth(state.lineWidth).stroke(state.color).fill(false);
						}
						
						break;
					}
					
					case "polyline":
					{
						var r = rune.polygon(0, 0);
						
						for(var i = 0; i < data.length; i++)
						{
							r = r.lineTo(data[i].x, data[i].y);
						}
						
						r.strokeWidth(state.lineWidth).stroke(state.color).fill(false)
						
						break;
					}
						
					
					case "circles":
					{
						for(var i = 0; i < data.length; i++)
						{
							var circle = data[i];
							var pos = circle[0];
							var radius = circle[1];
							rune.circle(pos.x, pos.y, radius).strokeWidth(state.lineWidth).stroke(state.color).fill(false);
						}
					
						break;
					}
					
					case "points":
					{
						for(var i = 0; i < data.length; i++)
						{
							var pos = data[i];
							rune.circle(pos.x, pos.y, state.pointSize).stroke(state.color).fill(state.color);
						}

						break;
					}
											
					default:
					{
						console.error(type + " not implemented.");
						break;
					}
				}
			}
		},
		function end()
		{
			outputImage();
		}
	);
}

