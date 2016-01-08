module.exports.lines = function(rune, data)
{
	for(var i = 0; i < data.length; i += 2)
	{
		var start = data[i];
		var end = data[i + 1];
		rune.line(start.x, start.y, end.x, end.y).fill(false);
	}		
}

