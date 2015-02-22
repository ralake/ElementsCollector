var $ = function (selector) {
  var selectors = selector.match(/(?:\.|#)?\w+/g)
  var htmlElements = [].slice.call(document.body.children);
  var elementsCollector = new ElementsCollector(htmlElements, selectors);
  return elementsCollector.getResults();
};

function ElementsCollector(htmlElements, selectors) {
  this.results = [];
  this.selector = {};
  this.htmlElements = htmlElements;
  this.parseSelectors(selectors);
}

ElementsCollector.prototype.parseSelectors = function(selectors) {
  selectors.forEach((function(selector) {
    this._set(selector);
  }).bind(this));
};

ElementsCollector.prototype.getResults = function() {
  this.htmlElements.forEach((function(element) {
    if (this.selector.tag === element.tagName) this._getByTag(element);
    else if (!this.selector.tag) this._getByIdOrClassName(element);
  }).bind(this));
  return this.results;
};

ElementsCollector.prototype._getByTag = function(element) {
  if (!this.selector.elementId && !this.selector.elementClass) { 
    this.results.push(element);
  }
  this._getByIdOrClassName(element);
};

ElementsCollector.prototype._getByIdOrClassName = function(element) {
  if (this.selector.elementId === element.id) this.results.push(element);
  else if (this.selector.elementClass === element.className.split(' ')[0]) {
    this.results.push(element);
  }
};

ElementsCollector.prototype._set = function(selector) {
  if (!selector.match(/\W/)) this.selector.tag = selector.toUpperCase();
  if (selector.indexOf('#') === 0) this.selector.elementId = selector.slice(1);
  if (selector.indexOf('.') === 0) this.selector.elementClass = selector.slice(1);  
};
