var ShadowBox = function(content){
	this.content = content;
	this.waittime = 0;
	this.countTime = 0;
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
	this.countTime = this.waittime;
	this.countInterval = setInterval(function(){
		that.countTime = parseInt(that.countTime * 10) / 10;
		console.log(that.countTime);
		that.countTime = (that.countTime * 10 - 1) / 10;
		if(that.countTime >= 0){
			if(((that.waittime - that.countTime) * 10) % 5 === 0){
				that.$shadowdiv.text("please wait " + that.countTime.toString() + " seconds at most...");
			}			
			that.$shadowdiv.css({"opacity": 0.6 - 0.15 * (that.waittime - that.countTime)});
		}		
	},
	100);
};

ShadowBox.prototype.stopCount = function(){
	clearInterval(this.countInterval);
	return this.countTime;
};

ShadowBox.prototype.setShadow = function(time){
	if(time != undefined){
		this.waittime = time;
	}
	this.waittime = parseInt(this.waittime * 10) / 10;
	this.$shadowdiv.text("please wait " + this.waittime.toString() + " seconds at most...");
};