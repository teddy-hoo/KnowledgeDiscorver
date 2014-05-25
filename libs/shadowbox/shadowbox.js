var ShadowBox = function(content){
	this.content = content;
	this.waittime = 3;
	this.$shadowdiv = $('<div />');
	this.$shadowdiv.addClass("shadowbox");
	this.$shadowdiv.attr("id", "shadow");
	this.$shadowdiv.text("please wait " + this.waittime.toString() + " seconds at most...");
	this.countInterval = null;
};

ShadowBox.prototype.add = function(){
	$(document.body).append(this.$shadowdiv);
	this._startCount();
	this.resize();
};

ShadowBox.prototype.resize = function(){
	this.$shadowdiv.css({
		width: $(window).width(),
		height: $("#container").height()
	});
};

ShadowBox.prototype.remove = function(){
	$("#shadow").remove();
};

ShadowBox.prototype._startCount = function(){
	that = this;
	this.countInterval = setInterval(function(){
		that.waittime -= 0.5;
		if(that.waittime >= 0){
			that.$shadowdiv.text("please wait " + that.waittime.toString() + " seconds at most...");
		}		
	},
	500);
};

ShadowBox.prototype.stopCount = function(){
	clearInterval(this.countInterval);
};