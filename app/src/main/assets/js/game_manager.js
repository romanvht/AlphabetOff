function GameManager(size, InputManager, Actuator, StorageManager) {
  this.size           = size; 
  this.inputManager   = new InputManager;
  this.storageManager = new StorageManager(size);
  this.actuator       = new Actuator;

  this.startTiles     = 2;

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("cancel", this.cancel.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));

  this.setup();
}

GameManager.prototype.restart = function () {
  this.storageManager.setLastGameState(this.serialize());
  this.storageManager.clearGameState();
  this.actuator.continue(); 
  this.setup();
};

GameManager.prototype.cancel = function () {
  var lastCourse = this.storageManager.getLastGameState();
  var Course = this.storageManager.getGameState();
  this.storageManager.setGameState(lastCourse);
  this.storageManager.setLastGameState(Course);
  this.actuator.continue();
  this.setup();
};

GameManager.prototype.keepPlaying = function () {
  this.keepPlaying = true;
  this.actuator.continue();
};

GameManager.prototype.isGameTerminated = function () {
  if (this.over || (this.won && !this.keepPlaying)) {
    return true;
  } else {
    return false;
  }
};

GameManager.prototype.setup = function () {
  var previousState = this.storageManager.getGameState();

  if (previousState) {
    this.grid        = new Grid(this.size, previousState.grid.cells); 
    this.score       = previousState.score;
    this.over        = previousState.over;
    this.won         = previousState.won;
    this.keepPlaying = previousState.keepPlaying;
  } else {
    this.grid        = new Grid(this.size);
    this.score       = 0;
    this.over        = false;
    this.won         = false;
    this.keepPlaying = false;

    this.addStartTiles();
  }

  this.actuate();
};

GameManager.prototype.addStartTiles = function () {
  for (var i = 0; i < this.startTiles; i++) {
    this.addRandomTile();
  }
};

GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
  	
  		var randBukv = Math.random() < 0.9 ? 2 : 4;
  		
	  if (this.score < 500){	
	    var value = Math.random() < 0.9 ? randBukv : 4;
	  }
	  if (this.score >= 500 && this.score < 1000){	
	    var value = Math.random() < 0.9 ? randBukv : 6;
	  }
	  if (this.score >= 1000 && this.score < 1500){	
	    var value = Math.random() < 0.9 ? randBukv : 8;
	  }
	  if (this.score >= 1500 && this.score < 2000){	
	    var value = Math.random() < 0.9 ? randBukv : 10;
	  }
	  if (this.score >= 2000 && this.score < 3000){	
	    var value = Math.random() < 0.9 ? randBukv : 12;
	  }
	  if (this.score >= 3000 && this.score < 4000){	
	    var value = Math.random() < 0.9 ? randBukv : 14;
	  }
	  if (this.score >= 4000 && this.score < 6000){	
	    var value = Math.random() < 0.9 ? randBukv : 16;
	  }
	  if (this.score >= 6000 && this.score < 8000){	
	    var value = Math.random() < 0.9 ? randBukv : 18;
	  }
	  if (this.score >= 8000 && this.score < 10000){	
	    var value = Math.random() < 0.9 ? randBukv : 20;
	  }
	  if (this.score >= 10000 && this.score < 12000){	
	    var value = Math.random() < 0.9 ? randBukv : 22;
	  }
	  if (this.score >= 12000 && this.score < 14000){	
	    var value = Math.random() < 0.9 ? randBukv : 24;
	  }
	  if (this.score >= 14000 && this.score < 16000){	
	    var value = Math.random() < 0.9 ? randBukv : 26;
	  }
	  if (this.score >= 16000 && this.score < 18000){	
	    var value = Math.random() < 0.9 ? randBukv : 28;
	  }
	  if (this.score >= 18000 && this.score < 20000){	
	    var value = Math.random() < 0.9 ? randBukv : 30;
	  }
	  if (this.score >= 20000 && this.score < 22000){	
	    var value = Math.random() < 0.9 ? randBukv : 32;
	  }
	  if (this.score >= 22000 && this.score < 28000){	
	    var value = Math.random() < 0.9 ? randBukv : 34;
	  }
	  if (this.score >= 28000 && this.score < 30000){	
	    var value = Math.random() < 0.9 ? randBukv : 36;
	  } 
	  if (this.score >= 30000 && this.score < 32000){	
	    var value = Math.random() < 0.9 ? randBukv : 38;
	  }
	  if (this.score >= 32000 && this.score < 34000){	
	    var value = Math.random() < 0.9 ? randBukv : 40;
	  }
	  if (this.score >= 34000 && this.score < 36000){	
	    var value = Math.random() < 0.9 ? randBukv : 42;
	  }
	  if (this.score >= 36000 && this.score < 38000){	
	    var value = Math.random() < 0.9 ? randBukv : 44;
	  }
	  if (this.score >= 38000 && this.score < 40000){	
	    var value = Math.random() < 0.9 ? randBukv : 46;
	  }
	  if (this.score >= 40000){	
	    var value = Math.random() < 0.9 ? randBukv : 48;
	  }

    var tile = new Tile(this.grid.randomAvailableCell(), value);

    this.grid.insertTile(tile);
  }
};

GameManager.prototype.actuate = function () {
  if (this.storageManager.getBestScore() < this.score) {
    this.storageManager.setBestScore(this.score);
  }
  
  if (this.over) {
    this.storageManager.clearGameState();
  } else {
    this.storageManager.setGameState(this.serialize());
  }

  this.actuator.actuate(this.grid, {
    score:      this.score,
	size:		this.size,
    over:       this.over,
    won:        this.won,
    bestScore:  this.storageManager.getBestScore(),
    terminated: this.isGameTerminated()
  });

};

GameManager.prototype.serialize = function () {
  return {
    grid:        this.grid.serialize(),
    score:       this.score,
    over:        this.over,
    won:         this.won,
    keepPlaying: this.keepPlaying
  };
};

GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

GameManager.prototype.moveTile = function (tile, cell) {
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};

GameManager.prototype.move = function (direction) {
  var self = this;

  if (this.isGameTerminated()) return; 

  this.storageManager.setLastGameState(this.serialize());
  
  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;

  this.prepareTiles();

  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);

        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value + 2);
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          tile.updatePosition(positions.next);

          self.score += merged.value;
		  external_score = self.score;

          if (merged.value === 56) self.won = true;
        } else {
          self.moveTile(tile, positions.farthest);
        }

        if (!self.positionsEqual(cell, tile)) {
          moved = true; 
        }
      }
    });
  });

  if (moved) {
	var GameState = this.storageManager.getGameState(); 
	
	if(GameState.score > 100){
		if (this.size == 4){
			if(Math.random() < 0.8)this.addRandomTile();
		}
		if (this.size == 5){
			if(Math.random() < 0.85)this.addRandomTile();
		}
		if (this.size == 6){
			if(Math.random() < 0.9)this.addRandomTile();
		}
		if (this.size == 7){
			this.addRandomTile();
		}
	}else{
		this.addRandomTile();
	}
	
    if (!this.movesAvailable()) {
      this.over = true;
    }

    this.actuate();
  }
};

GameManager.prototype.getVector = function (direction) {
  var map = {
    0: { x: 0,  y: -1 }, // Up
    1: { x: 1,  y: 0 },  // Right
    2: { x: 0,  y: 1 },  // Down
    3: { x: -1, y: 0 }   // Left
  };

  return map[direction];
};

GameManager.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

GameManager.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (this.grid.withinBounds(cell) &&
           this.grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell
  };
};

GameManager.prototype.movesAvailable = function () {
  return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

GameManager.prototype.tileMatchesAvailable = function () {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

GameManager.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};
