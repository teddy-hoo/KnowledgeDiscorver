var Openging = function(selection){
	this.selection = selection;
};

Openging.prototype.play = function(){
	var circle = this.selection.append("circle");
	circle.attr("cx", this._scaleChange("cx"))
		.attr("cy", this._scaleChange("cy"))
		.attr("r", this._scaleChange("r"))
		.attr("fill", "red");
};

Openging.prototype._scaleChange = function(attrType){
	var start = time.
	if(attrType == )
}

Openging.prototype.resize = function(){
	this.$shadowdiv.css({
		width: $(window).width(),
		height: $("#container").height()
	});
};

Openging.prototype.remove = function(){
	$("#shadow").remove();
};

Openging.prototype._startCount = function(){
	that = this;
	var opacity = 0;
	var isMax = false;
	this.countTime = this.waittime;
	this.countInterval = setInterval(function(){
		that.countTime = parseInt(that.countTime * 10) / 10;
		that.countTime = (that.countTime * 10 - 1) / 10;
		if(that.countTime >= 0){
			if(((that.waittime - that.countTime).toFixed(1) * 10) % 5 === 0){
				that.$shadowdiv.text("please wait " + that.countTime.toFixed(1) + " seconds at most...");
			}
			opacity = isMax ? (opacity - 0.002 * (that.waittime - that.countTime - 1)) : (opacity + 0.4 * (that.waittime - that.countTime));
			if(opacity > 0.4 ){
				isMax = true;
			}
			that.$shadowdiv.css({"opacity": opacity});
		}
	},
	100);
};

Openging.prototype.stopCount = function(){
	clearInterval(this.countInterval);
	return this.countTime;
};

Openging.prototype.setShadow = function(time){
	if(time != undefined){
		this.waittime = time;
	}
	this.waittime = parseInt(this.waittime * 10) / 10;
	this.$shadowdiv.text("please wait " + this.waittime.toFixed(1) + " seconds at most...");
};

//<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>