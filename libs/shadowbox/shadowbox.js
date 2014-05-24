var ShadowBox = function(content){
	this.content = content;
	this.$shadowdiv = $('<div />');
	this.$shadowdiv.addClass("shadowbox");
	this.$shadowdiv.attr("id", "shadow");
};

ShadowBox.prototype.add = function(){
	$(document.body).append(this.$shadowdiv);
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