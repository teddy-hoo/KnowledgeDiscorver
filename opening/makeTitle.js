var fontColor = ["#00FA9A", "#0000FF", "#FF1493", "#808080", "#FF0000", "#00FF00", "#FFD700", "#00FFFF"];

var Title = function(rawTitle, selection){
  this.rawTitle = rawTitle.split("");
  this.selection = selection;
  this.container = null;
  this.titleElements = [];
  this.colorPalette = {};
};

Title.prototype.setSelection = function(selection){
  this.selection = selection;
};

Title.prototype.makeTtile = function(){
  that = this;
  this._createContainer();
  this.selection.appendChild(this.container);
  this.container.setAttribute("style", '-webkit-perspective-origin: 150% 150%;-webkit-perspective: 250px;-webkit-transform-style: preserve-3d;');
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
    that.titleElements.push(letterdiv);
    if(that.colorPalette[letter] === undefined){
      that.colorPalette[letter] = fontColor[(index++) % fontColor.length];
    }
    letterdiv.textContent = letter;
    letterdiv.setAttribute("style", "color:" + that.colorPalette[letter]);
    letterdiv.setAttribute("style", 'height: 100px; wigdth: 100px;-webkit-transform: translateZ(' + index * 50 + 'px)');
  });
};
