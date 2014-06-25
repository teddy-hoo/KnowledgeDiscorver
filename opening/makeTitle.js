var fontColor = ["#00FA9A", "#0000FF", "#FF1493", "#808080", "#FF0000", "#00FF00", "#FFD700", "#00FFFF"];

var Title = function(rawTitle, selection, fontColors, width, height, fontsize){
  this.rawTitle = rawTitle.split("");
  this.selection = selection;
  this.container = null;
  this.fontSize = fontsize;
  this.titleElements = [];
  this.colorPalette = {};
  this.fontColors = fontColors || fontColor;
  this.fontWidth = "50px";
  this.fontHeight = "50px";
  this.letterPerLine = 0;
  this.lineCount = 1;
  this.containerWidth = width || window.innerWidth;
  this.containerHeight = height || 100;
};

Title.prototype.setSelection = function(selection){
  this.selection = selection;
};

Title.prototype.resize = function(){
  //finish later
};

Title.prototype.makeTtile = function(){
  var that = this;
  this.container = document.createElement("div");
  this.selection.setAttribute("style", "width: " + this.containerWidth +
                              "px; height: " + this.containerHeight + "px;");
  this._createContainer();
  this.selection.appendChild(this.container);
};

Title.prototype._createContainer = function(){
  this._getPerfectPosition();
  this.container.setAttribute("style", "width: " + this.containerWidth +
                              "px; height: " + this.containerHeight +
                              "px; font-size: " + this.fontSize + "px;");

  var that = this;
  this.rawTitle.forEach(function(letter, index){
    var letterdiv = document.createElement("div");
    that.titleElements.push(letterdiv);
    if(that.colorPalette[letter] === undefined){
      that.colorPalette[letter] = that.fontColors[(index) % that.fontColors.length];
    }
    letterdiv.textContent = letter;
    letterdiv.setAttribute("id", "font" + index);
    letterdiv.setAttribute("style", 'background-color: #FFE4E1; position: absolute;' +
                           'color:' + that.colorPalette[letter] +
                           '; width: 0px; height: 0px; top: ' + (parseInt(index / that.letterPerLine) * that.fontHeight) +
                           'px; left: ' + (parseInt(index % that.letterPerLine) * that.fontWidth) + 'px;' +
                           'transition-duration: 1s; text-align: center; vertical-align: middle;' +
                           '-webkit-transition:height 1s, width 1s;');
  });
  this.titleElements.forEach(function(e){
    that.container.appendChild(e);
  });
  setTimeout(function(){
    var nodes = that.container.childNodes;
  for(var key in nodes){
    if(nodes[key].style && nodes[key].style){
      nodes[key].style.width = that.fontWidth - 10 + "px";
      nodes[key].style.height = that.fontHeight - 10 + "px";
      //nodes[key].style.line-height = that.fontHeight + "px";
    }
  }
  }, 3500);
  //var nodes = this.container.childNodes;
  //for(var key in nodes){
  //  if(nodes[key].style && nodes[key].style){
  //    nodes[key].style.width = this.fontWidth + "px";
  //    nodes[key].style.height = this.fontHeight + "px";
  //  }
  //}
};

Title.prototype._getPerfectPosition = function(){
  var letterCount = this.rawTitle.length;

  if(parseInt(this.containerWidth / letterCount) >= 20){
    this.fontWidth = parseInt(this.containerWidth / letterCount);
    this.fontHeight = parseInt(this.containerHeight);
    this.letterPerLine = letterCount;
  }
  else{
    this.letterPerLine = parseInt(this.containerWidth / 20);
    this.lineCount = Math.ceil(letterCount / this.letterPerLine);
    this.fontWidth = parseInt(this.containerWidth / letterCount);
    this.fontHeigth = parseInt(this.containerHeight / this.lineCount);
  }
  this.fontSize = this.fontSize || (this.fontWidth > this.fontHeight ? this.fontHeight : this.fontWidth) + 10;
};
