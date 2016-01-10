module.exports.lines = function(rune, state, data)
{
	for(var i = 0; i < data.length; i += 2)
	{
		var start = data[i];
		var end = data[i + 1];
		rune.line(start.x, start.y, end.x, end.y).strokeWidth(state.lineWidth).stroke(state.color[0]).fill(false);
	}		
}

