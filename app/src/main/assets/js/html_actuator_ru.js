function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.sharingContainer = document.querySelector(".score-sharing");

  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;
  
  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);
    
    if (metadata.terminated) {
    var nick = storage.getNick();	
      if (metadata.over) {
		send_post("https://alphabet.romanvht.ru/post.php", {name: nick, size: metadata.size, score: metadata.score, win: 0}, true);
        self.message(false); // You lose
      } else if (metadata.won) {
		send_post("https://alphabet.romanvht.ru/post.php", {name: nick, size: metadata.size, score: metadata.score, win: 1}, true);
        self.message(true); // You win!
      }
    }

  });
};

HTMLActuator.prototype.continue = function () {
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "restart");
  }

  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 56) classes.push("tile-super");



  this.applyClasses(wrapper, classes);
  var outputtext = new Array();
  outputtext[0] = "";
  outputtext[1] = "A";
  outputtext[2] = "Б";
  outputtext[3] = "В";
  outputtext[4] = "Г";
  outputtext[5] = "Д";
  outputtext[6] = "Е";
  outputtext[7] = "Ж";
  outputtext[8] = "З";
  outputtext[9] = "И";
  outputtext[10] = "К";
  outputtext[11] = "Л";
  outputtext[12] = "М";
  outputtext[13] = "Н";
  outputtext[14] = "О";
  outputtext[15] = "П";
  outputtext[16] = "Р";
  outputtext[17] = "С";
  outputtext[18] = "Т";
  outputtext[19] = "У";
  outputtext[20] = "Ф";
  outputtext[21] = "Х";
  outputtext[22] = "Ц";
  outputtext[23] = "Ч";
  outputtext[24] = "Ш";
  outputtext[25] = "Ы";
  outputtext[26] = "Э";
  outputtext[27] = "Ю";
  outputtext[28] = "Я"; 
  outputtext[29] = "∞";
  outputtext[30] = "∞²"; 
  
  inner.classList.add("tile-inner");
  inner.textContent = outputtext[(tile.value/2)] || '';

  if (tile.previousPosition) {
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); 
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  wrapper.appendChild(inner);

  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;
  if (this.score > 9999){
  this.scoreContainer.textContent = Math.round(this.score/100)/10 +"т";
  } else {
  this.scoreContainer.textContent = this.score;
  }
  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  if (bestScore > 9999){
  this.bestContainer.textContent = Math.round(bestScore/100)/10 +"т";
  } else {
  this.bestContainer.textContent = bestScore;}
};


HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "Победа!" : "Ваш счет: "+this.score;
  var external_score;
  
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "end", type, this.score);
  }

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
  this.clearContainer(this.sharingContainer);
  this.showSocialButtons();
};

HTMLActuator.prototype.clearMessage = function () {
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};

HTMLActuator.prototype.showSocialButtons = function (){ 
	var text = '';
    var html ='<div id="social-buttons" class="fadeable fade">'
            + '<ul class="social">'
            + '<div class="ya-share2" data-title="Головоломка Алфавит | Мой счет: '+this.score+'" data-url="'+window.location.href+'" data-description="Я набрал(а): '+this.score+' очков в игре Алфавит, а сколько наберешь ты?" data-services="vkontakte,facebook,odnoklassniki,twitter,viber,whatsapp,telegram"></div>'
			+ '</ul>'
			+ '<div id="fb-root"></div>'
            + '</div>';

	//document.getElementById('viewport').insertAdjacentHTML('beforeEnd', html);	
	document.getElementById('viewport').innerHTML = html;

	
    script = document.createElement('script');
    script.async = true;
    script.src = 'https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js';
    document.getElementById('social-buttons').appendChild(script);

    script = document.createElement('script');
    script.async = true;
    script.src = 'https://yastatic.net/share2/share.js';
    document.getElementById('social-buttons').appendChild(script);

    window.setTimeout( function () {
        document.getElementById('social-buttons').removeAttribute('class');
    }, 1000 );
   return html
};
