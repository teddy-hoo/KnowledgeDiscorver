var fontColor = ["#00FA9A", "#0000FF", "#FF1493", "#808080", "#FF0000", "#00FF00", "#FFD700", "#00FFFF"];

var Title = function(rawTitle, selection, fontColors, width, height, fontsize){
  this.rawTitle = rawTitle.split("");
  this.selection = selection;
  this.container = null;
  this.titleElements = [];
  this.colorPalette = {};
  this.fontColors = fontColors || fontColor;
  this.fontRuler = fontsize || 50;
  this.letterPerLine = 0;
  this.lineCount = 1;
  this.containerWidth = width || window.innerWidth;
  this.containerHeight = height || 100;
  //this._createHoveCSS();
};

Title.prototype._hoverHandler = function(oEvent){
  oEvent.currentTarget.style["-webkit-transform"] = "translateZ(50px)";
};

Title.prototype._mouseoutHandler = function(oEvent){
  oEvent.currentTarget.style["-webkit-transform"] = "";
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
                              "; -webkit-transform-style: preserve-3d;" +
                              "-webkit-animation: spin 10s infinite linear;");

  var that = this;
  this.rawTitle.forEach(function(letter, index){
    var letterdiv = document.createElement("div");
    that.titleElements.push(letterdiv);
    if(that.colorPalette[letter] === undefined){
      that.colorPalette[letter] = that.fontColors[(index) % that.fontColors.length];
    }
    letterdiv.textContent = letter;
    letterdiv.setAttribute("class", "c_font");
    letterdiv.setAttribute("id", "font" + index);
    letterdiv.setAttribute("style", 'display: inline-block; border-color: #FFE4E1; border-width: 0px; border-style: solid; ' +
                           '-webkit-box-sizing: border-box; -webkit-transform: ; ' +
                           'position: absolute; font-size: 0px; z-index: 1000; ' +
                           'color:' + that.colorPalette[letter] +
                           '; width: 0px; height: 0px; top: ' +
                           (Math.ceil((index + 0.1) / that.letterPerLine) * that.fontRuler  + that.fontRuler / 2) +
                           'px; left: ' +
                           (parseInt(index % that.letterPerLine) * that.fontRuler) + 'px;' +
                           'text-align: center; ' +
                           '-webkit-transition: 0.5s;');
  });
  this.titleElements.forEach(function(e){
    that.container.appendChild(e);
  });
  var s = this.fontRuler / 8;
  setTimeout(function(){
    var nodes = that.container.childNodes;
    for(var key in nodes){
      if(nodes[key].style && nodes[key].style){
        nodes[key].style["width"] = that.fontRuler + "px";
        nodes[key].style["height"] = that.fontRuler + "px";
        nodes[key].style["border-top-width"] = s / 2 + "px";
        nodes[key].style["border-left-width"] = s * 2 + "px";
        nodes[key].style["border-right-width"] = s * 6 + "px";
        nodes[key].style["border-bottom-width"] = s * 9 + "px";
        nodes[key].style["font-size"] = that.fontRuler + "px";
        nodes[key].addEventListener("mouseover", that._hoverHandler);
        nodes[key].addEventListener("mouseout", that._mouseoutHandler);
      }
    }
  }, 1000);
};

Title.prototype._getPerfectPosition = function(){
  var letterCount = this.rawTitle.length;

  if(parseInt(this.containerWidth / letterCount) >= 20){
    this.fontRuler = parseInt(this.containerWidth / letterCount) > parseInt(this.containerHeight) ?
      parseInt(this.containerHeight) : parseInt(this.containerWidth / letterCount);
    this.letterPerLine = letterCount;
  }
  else{
    this.letterPerLine = parseInt(this.containerWidth / 20);
    this.lineCount = Math.ceil(letterCount / this.letterPerLine);
    this.fontRuler = parseInt(this.containerWidth / letterCount) > parseInt(this.containerHeight / this.lineCount) ?
      parseInt(this.containerHeight / this.lineCount) : parseInt(this.containerWidth / letterCount);
  }
};

Title.prototype._createHoveCSS = function(){
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  var declarations = document.createTextNode('div:hover {border-width: 10px;}');

  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = declarations.nodeValue;
  } else {
    style.appendChild(declarations);
  }

  head.appendChild(style);
};
