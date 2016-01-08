module.exports.polyline = function(rune, data)
{
	var r = rune.polygon(0, 0);

	for(var i = 0; i < data.length; i++)
	{
		r = r.lineTo(data[i].x, data[i].y);
	}
	
	r.fill(false);
}