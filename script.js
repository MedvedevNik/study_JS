function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}


DomElement.prototype.elem = function () {
  let element;
  if (this.selector[0] === '.') {
      element = document.createElement('div');
      element.className = this.selector.slice(1);
  }
  if (this.selector[0] === '#') {
      element = document.createElement('p');
      element.id = this.selector.slice(1);
  }
  element.style.cssText = `height: ${this.height}px;
      width: ${this.width}px;
      background: ${this.bg};
      font-size: ${this.fontSize}px;`;
  return element;
};


let div = new DomElement('.block', 20, 15, 'red', 18);
let noDiv = new DomElement('#noblock', 20, 15, 'red', 18);

document.body.append(div.elem());

document.body.append(noDiv.elem());