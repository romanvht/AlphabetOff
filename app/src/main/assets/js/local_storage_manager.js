function LocalStorageManager(size) {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";
  this.size     		= size;
  this.SizeKey    		= "Size";
  this.NickKey    		= "Nick";
  this.StyleKey    		= "Style";
  this.storage = window.localStorage;
}

LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey+this.size) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score, ) {
  this.storage.setItem(this.bestScoreKey+this.size, score);
};

LocalStorageManager.prototype.setNick = function (str) {
  this.storage.setItem(this.NickKey, str);
};

LocalStorageManager.prototype.getNick = function () {
  return this.storage.getItem(this.NickKey) || '';
};

LocalStorageManager.prototype.setStyle = function (str) {
  this.storage.setItem(this.StyleKey, str);
};

LocalStorageManager.prototype.getStyle = function () {
  return this.storage.getItem(this.StyleKey) || 'black';
};

LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey+this.size);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey+this.size, JSON.stringify(gameState));
};

LocalStorageManager.prototype.getLastGameState = function () {
  var stateJSON = this.storage.getItem("Last"+this.gameStateKey+this.size);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setLastGameState = function (gameState) {
  this.storage.setItem("Last"+this.gameStateKey+this.size, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey+this.size);
};