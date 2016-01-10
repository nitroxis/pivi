module.exports.polyline = function(rune, state, data)
{
	var r = rune.polygon(0, 0);

	for(var i = 0; i < data.length; i++)
	{
		r = r.lineTo(data[i].x, data[i].y);
	}
	
	r.strokeWidth(state.lineWidth).stroke(state.color[0]).fill(false)
}