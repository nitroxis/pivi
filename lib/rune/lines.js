module.exports.lines = function(rune, data)
{
	for(var i = 0; i < data.length; i += 2)
		rune.line(data[i].x, data[i].y, data[i + 1].x, data[i + 1].y);
}
