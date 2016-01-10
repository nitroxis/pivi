module.exports.points = function(rune, state, data)
{
	for(var i = 0; i < data.length; i++)
	{
		var pos = data[i];
		rune.circle(pos.x, pos.y, state.pointSize * 0.5).fill(state.color[0]);
	}
}
