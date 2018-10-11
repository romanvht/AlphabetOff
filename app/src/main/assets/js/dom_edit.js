	document.addEventListener("DOMContentLoaded", function(event) {		
		updateColor(storage.getStyle());
	
		/*var toplink = document.getElementById("top_link");
		toplink.onclick = function() {
			event.preventDefault();
			top_ = document.getElementById("top");
			smoothScroll("top");
		};*/
		
		var nick = storage.getNick();
		if(nick == ''){
			var randID = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
			storage.setNick('Игрок_'+randID);
			var nick = 'Игрок_'+randID;
		}
		document.getElementById('nick').setAttribute("value", nick);
		
		document.getElementById('nick').oninput = function() {
			storage.setNick(this.value);
		}
	});
	
	function load_get(url, IDel, sync){
		var ajax = new XMLHttpRequest();
		ajax.open('GET', url, sync);
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4){
				if (ajax.status == 200) {
					document.getElementById(IDel).innerHTML = ajax.responseText;
					console.log('Успешное выполнение GET запроса: ' + url + ': HTML to element #' + IDel);	
				}else{
					console.log('Ошибка отправки запроса GET: ' + url + ': HTML to element #' + IDel + '(' + ajax.status + ': ' + ajax.statusText + ')');	
				}
			}else{
				console.log('Отправка запроса GET: ' + url + ': HTML to element #' + IDel);				
			}
		}
		ajax.send(null);
	}
      
	function send_post(url, data, sync){
		var ajax = new XMLHttpRequest();
		var args = '?';
		ajax.open('POST', url, sync);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		for (key in data) { 
			args += key+"="+data[key]+"&";
		}
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4){
				if (ajax.status == 200){
					console.log('Успешное выполнение POST запроса: ' + args + ': ' + url);
				}else{
					console.log('Ошибка при отправке POST запроса: ' + args + ': ' + url + '(' + ajax.status + ': ' + ajax.statusText + ')');
				}
			}else{
				console.log('Отправка запроса POST: ' + args + ': ' + url);
			}
		}
		ajax.send(args);
	}  
	
	document.querySelector('.color-button').onclick = function() {
		var style = storage.getStyle();
		var color = setColor(style);
		storage.setStyle(color);
		document.getElementById("style").setAttribute("href", "css/"+color+".css?"+version);
	};
		
	function getYPos(eID) {
		var elm = document.getElementById(eID);
		var y = elm.offsetTop;
		var node = elm;
		while (node.offsetParent && node.offsetParent != document.body) {
			node = node.offsetParent;
			y += node.offsetTop;
		} return y;
	}

	function smoothScroll(eID) {
		var startY = self.pageYOffset;
		var stopY = getYPos(eID);
		var distance = stopY > startY ? stopY - startY : startY - stopY;
		
		if (distance < 100) {
			scrollTo(0, stopY); return;
		}
		
		var speed = Math.round(distance / 100);
		
		if (speed >= 20) speed = 20;
		
		var step = Math.round(distance / 25);
		var leapY = stopY > startY ? startY + step : startY - step;
		var timer = 0;
		
		if (stopY > startY) {
			for (var i=startY; i<stopY; i+=step) {
				setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
				leapY += step; if (leapY > stopY) leapY = stopY; timer++;
			} return;
		}else{
			for (var i=startY; i>stopY; i-=step) {
				setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
				leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
			}
		}
	}
		
	function setColor(str){
		switch(str){
			default:
				var color = 'black';
				document.getElementById("color").setAttribute("style", "background: #000000;"); /* Next color */
				document.getElementById("theme-meta").setAttribute("content", "#000000");
				return color;
			break;
			
			case "black":
				var color = 'blue';
				document.getElementById("theme-meta").setAttribute("content", "#0083ff");
				document.getElementById("color").setAttribute("style", "background: green;"); /* Next color */
				return color;
			break;

			case "blue":
				var color = 'green';
				document.getElementById("theme-meta").setAttribute("content", "green");
				document.getElementById("color").setAttribute("style", "background: purple;"); /* Next color */
				return color;
			break;

			case "green":
				var color = 'purple';
				document.getElementById("theme-meta").setAttribute("content", "purple");
				document.getElementById("color").setAttribute("style", "background: black;"); /* Next color */
				return color;
			break;

			case "purple":
				var color = 'black';
				document.getElementById("theme-meta").setAttribute("content", "#111111");
				document.getElementById("color").setAttribute("style", "background: #0083ff;"); /* Next color */
				return color;
			break;
		}
	}  
	  
	function updateColor(str){
		switch(str){
			default:
				document.getElementById("color").setAttribute("style", "background: #000000;"); /* Next color */
				document.getElementById("theme-meta").setAttribute("content", "#000000");
				return;
			break;
			
			case "black":
				document.getElementById("color").setAttribute("style", "background: #0083ff;"); /* Next color */
				document.getElementById("theme-meta").setAttribute("content", "#111111");
				return;
			break;

			case "blue":
				document.getElementById("color").setAttribute("style", "background: green;"); /* Next color */
				document.getElementById("theme-meta").setAttribute("content", "#0083ff");
				return;
			break;

			case "green":
				document.getElementById("color").setAttribute("style", "background: purple;"); /* Next color */
				document.getElementById("theme-meta").setAttribute("content", "green");
				return;
			break;

			case "purple":
				document.getElementById("color").setAttribute("style", "background: #000000;"); /* Next color */
				document.getElementById("theme-meta").setAttribute("content", "purple");
				return;
			break;
		}
	} 