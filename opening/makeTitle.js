var fontColor = ["#00FA9A", "#0000FF", "#FF1493", "#808080", "#FF0000", "#00FF00", "#FFD700", "#00FFFF"];

var Title = function(rawTitle, selection){
  this.rawTitle = rawTitle.split("");
  this.selection = selection;
  this.container = null;
  this.titleElements = [];
  this.colorPalette = {};
  this.fontWidth = "50px";
  this.fontHeight = "50px";
};

Title.prototype.setSelection = function(selection){
  this.selection = selection;
};

Title.prototype.makeTtile = function(){
  that = this;
  this._createContainer();
  this.selection.appendChild(this.container);
  this.container.setAttribute("style", 'height: 100px; -webkit-perspective-origin: 150% 150%;-webkit-perspective: 250px;-webkit-transform-style: preserve-3d;');
  this.titleElements.forEach(function(e){
    that.container.appendChild(e);
  });
};

Title.prototype._createContainer = function(){
  that = this;
  this.container = document.createElement("div");
  var index = 0;
  this.rawTitle.forEach(function(letter, index){
    var letterdiv = document.createElement("div");
    var letterElement = document.createElement("span");
    letterdiv.appendChild(letterElement);
    that.titleElements.push(letterElement);
    if(that.colorPalette[letter] === undefined){
      that.colorPalette[letter] = fontColor[(index++) % fontColor.length];
    }
    letterElement.textContent = letter;
    letterElement.setAttribute("style", "color:" + that.colorPalette[letter]);
    letterElement.setAttribute("style", 'color:' + that.colorPalette[letter]
                               + '; -webkit-transform: translateZ(' + index * 1 + 'px)');
  });
};

Title.prototype._getPerfectPosition = function(){
  var length = this.container.getAttribute("width");
};
