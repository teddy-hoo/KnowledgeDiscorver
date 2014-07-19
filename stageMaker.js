var Stage = function(stageDiv, imgList, imgLoadPath){
	this.stageDiv = stageDiv;
	this.imgList = imgList;
	this.width = undefined;
	this.imgLoadPath = imgLoadPath;
	this._imgDivList = [];
	this._animationDura = 1000;
	this._curImg = 0;
	this._createStage();
	this._enableAnimation();
	this._imgCount = imgList.length;
};

Stage.prototype._createStage = function(){
	that = this;
	this.width = parseInt(window.innerWidth) * 0.7;
	var height = parseInt(window.innerHeight) * 0.7;
	this.stageDiv.setAttribute("style", "width : " + that.width + "px; height : " + height + "px;");
	this.imgList.forEach(function(img, index){
		var imgElement = document.createElement("img");
		imgElement.setAttribute("src", that.imgLoadPath + img);
		var imgDiv = document.createElement("div");
		imgDiv.appendChild(imgElement);
		imgElement.setAttribute("style", "width : " + that.width + "px; height : " + height + "px;");
		imgDiv.setAttribute("style", "width : " + that.width + "px; height : " + height + "px;");
		that._imgDivList.push(imgDiv);
	});
	this.stageDiv.appendChild(this._imgDivList[this._curImg]);
};

Stage.prototype._enableAnimation = function(){
	this.stageDiv.style["-webkit-transition"] = this._animationDura / 1000 + "s ease-in-out ";
	this.stageDiv.addEventListener("mouseover", this._hoverHandler);
	this.stageDiv.addEventListener("mouseout", this._hoverHandler);
};

					Stage.prototype._hoverHandler = function(oEvent){
					var reg = /scale(*)/;
						var trans = oEvent.currentTarget.style["-webkit-transform"];
					if(oEvent.type === "mouseover"){
							if(trans.match(reg) !== ""){
								trans.replace(reg, "scale(1.1)");
							}
							else{
								trans += "scale(1.1)";
							}
						}
						else if(oEvent.type === "mouseout"){
							if(trans.match(reg) !== ""){
								trans.replace(reg, "scale(1)");
							}
							else{
								trans += "scale(1)";
							}
						}
					};

Stage.prototype.slide = function(){
	that = this;
	this._curImg = (this._curImg + 1) % this._imgCount;
	var deg = this._curImg % 2 === 0 ? 0 : 180;
	this.stageDiv.style["-webkit-transform"] = "rotateY(" + deg + "deg)";
	setTimeout(function(){
		that.stageDiv.removeChild(that.stageDiv.firstChild);
		that.stageDiv.appendChild(that._imgDivList[that._curImg]);
	}, this._animationDura / 2);
};
