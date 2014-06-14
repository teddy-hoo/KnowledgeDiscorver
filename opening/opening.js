var Opening = function(selection){
	this.selection = selection;
	this.circle = null;
	this.svg = null;
};

Opening.prototype.play = function(){
	this.svg = this.selection.append("svg")
				.attr("id", "openingsvg");
	this.circle = this.svg.append("ellipse");
	this.circle.attr("cx", parseInt(this.svg.style("width")) / 2)
		.attr("cy", parseInt(this.svg.style("height")) / 2 - 200)
		.attr("rx", 0)
		.attr("ry", 0)
		.attr("fill", "#FFC0CB");
	this._scaleChange();
	this._charStroke();
	this.selection.transition()
		.duration(1000)
		.delay(3000)
		.style("opacity", 0)
		.remove();
};

Opening.prototype._charStroke = function(){
	var that = this;
	var charSData = charStrokeData();
	var chars = ["s", "e", "a", "r", "c", "h"];
	var cx = this.circle.attr("cx") - 200;
	var cy = this.circle.attr("cy");
	setTimeout(function(){
		chars.forEach(function(charName){
			that.svg.append("path")
	            .attr("d", charSData[charName].replace(/m .+? /gi, "m " + cx + ',' + cy + ' '))
	            .style("stroke-width", 2)
	            .style("stroke", "steelblue")
	            .style("fill", "#FFC0CB")
	            .attr('id', charName);
        		cx += 100;
        		that._simulatePathDrawing($("#" + charName)[0]);
        	});
		}, 
		1000);
}

Opening.prototype._scaleChange = function(){
	this.circle
		.transition()
		.duration(500)
		.delay(0)
		.attr('rx', 110)
		.attr('ry', 110);
	this.circle
		.transition()
		.duration(500)
		.delay(700)
		.attr("fill", "#FFC0CB")
		.attr('rx', 400)
		.attr('ry', 300);
}

Opening.prototype._simulatePathDrawing = function (path) {
  var length = path.getTotalLength();
  path.style.transition = path.style.WebkitTransition =
  'none';
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  path.getBoundingClientRect();
  path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 1s ease-in-out';
  path.style.strokeDashoffset = '0';
  path.style.strokeWidth = '3px';
  path.style.fill = 'rgba(255,255,0,.12)';
};