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
};

Opening.prototype._charStroke = function(){
	var that = this;
	var charSData = charStrokeData();
	var chars = ["path3076", "path3078"];
	chars.forEach(function(charName){
		that.svg.append("path")
            .attr("d",charSData[charName])
            .style("stroke-width", 2)
            .style("stroke", "steelblue")
            .style("fill", "none")
            .attr('id', charName);
        that._simulatePathDrawing($("#" + charName)[0]);
	});
}

Opening.prototype._scaleChange = function(){
	this.circle
		.transition()
		.duration(500)
		.delay(0)
		.attr('rx', 150)
		.attr('ry', 150);
	this.circle
		.transition()
		.duration(500)
		.delay(500)
		.attr('rx', 100)
		.attr('ry', 100);	
	this.circle
		.transition()
		.duration(500)
		.delay(2000)
		.attr("fill", "#FFC0CB")
		.attr('rx', 260)
		.attr('ry', 160);
}

Opening.prototype._simulatePathDrawing = function (path) {
  // var path = document.querySelector('.squiggle-animated path');
  var length = path.getTotalLength();
  // Clear any previous transition
  path.style.transition = path.style.WebkitTransition =
  'none';
  // Set up the starting positions
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();
  // Define our transition
  path.style.transition = path.style.WebkitTransition =
  'stroke-dashoffset 1.5s ease-in-out';
  // Go!
  path.style.strokeDashoffset = '0';
  path.style.strokeWidth = '3px';
  path.style.fill = 'rgba(255,255,0,.12)';
};
