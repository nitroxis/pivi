module.exports.circles = function(rune, state, data)
{
	for(var i = 0; i < data.length; i++)
	{
		var circle = data[i];
		var pos = circle[0];
		var radius = circle[1];
		rune.circle(pos.x, pos.y, radius).strokeWidth(state.lineWidth).stroke(state.color[0]).fill(false);
	}
}
