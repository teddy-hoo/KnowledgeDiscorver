var Opening = function(selection){
  this.selection = selection;
  this.circle = null;
  this.svg = null;
  this.position = [[0, -50], [60, 45], [180, 10], [320, -15], [535, 55], [650, -80]];
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
  var cx = parseFloat(this.circle.attr("cx") - 300);
  var cy = parseFloat(this.circle.attr("cy"));
  setTimeout(function(){
    chars.forEach(function(charName, index){
      var curCx = cx + that.position[index][0];
      var curCy = cy + that.position[index][1];
      that.svg.append("path")
	.attr("d", charSData[charName].replace(/m .+? /, "m " + curCx + ',' + curCy + ' '))
	.style("stroke-width", 2)
	.style("stroke", "yellow")
	.style("fill", "#FFC0CB")
	.attr('id', charName);
      that._simulatePathDrawing($("#" + charName)[0]);
    });
  },1000);
};

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
};

Opening.prototype._simulatePathDrawing = function (path) {
  var length = path.getTotalLength();
  path.style.transition = path.style.WebkitTransition = 'none';
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  path.getBoundingClientRect();
  path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 1s ease-in-out';
  path.style.strokeDashoffset = '0';
  path.style.fill = "transparent";
};
