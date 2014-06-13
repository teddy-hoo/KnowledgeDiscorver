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
	this.svgforStroke = this.selection.append("svg")
				.attr("id", "strokesvg")
				.style("left", this.circle.attr("cx") - 200)
				.style("top", this.circle.attr("cy") - 100)
				.style("width", 800)
				.style("height", 400)
				.style("position", "absolute");
	this._scaleChange();
	this._charStroke();
};

Opening.prototype._charStroke = function(){
	var that = this;
	var charSData = charStrokeData();
	var chars = ["path3050"];
	chars.forEach(function(charName){
		that.svgforStroke.append("path")
            .attr("d", charSData[charName].replace(/m .+? /gi, "m 100,150 "))
            .style("stroke-width", 2)
            .style("stroke", "steelblue")
            .style("fill", "none")
            .attr('id', charName);
        setTimeout(function(){that._simulatePathDrawing($("#" + charName)[0]);}, 1000);
	});
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