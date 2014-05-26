var ShadowBox = function(content){
	this.content = content;
	this.waittime = 0;
	this.$shadowdiv = $('<div />');
	this.$shadowdiv.addClass("shadowbox");
	this.$shadowdiv.attr("id", "shadow");
	this.countInterval = null;
};

ShadowBox.prototype.add = function(){
	this.setShadow();
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
	countTime = this.waittime;
	this.countInterval = setInterval(function(){
		countTime =(countTime * 10 - 1) / 10;
		if(countTime >= 0){
			that.$shadowdiv.text("please wait " + countTime.toString() + " seconds at most...");
			that.$shadowdiv.css({"opacity": 0.8 - 0.2 * (that.waittime - countTime)});
		}		
	},
	100);
};

ShadowBox.prototype.stopCount = function(){
	clearInterval(this.countInterval);
};

ShadowBox.prototype.setShadow = function(time){
	if(time != undefined){
		this.waittime = time;
	}
	this.$shadowdiv.text("please wait " + this.waittime.toString() + " seconds at most...");
};