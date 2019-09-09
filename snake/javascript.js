const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const PIX = 20;
var snakeTail = [];

var Snake = {
	x: 10,
	y: 10,
	xdir: 0,
	ydir: 0
}

var Fruit = {
	x: Math.floor(Math.random()*20+1),
	y: Math.floor(Math.random()*20+1)
}

function Tail() {
	this.x = undefined;
	this.y = undefined;
}

window.addEventListener("keydown", function(event) {
	if (event.keyCode == "87") {
		Snake.xdir = 0;
		Snake.ydir = -1;
	}
	if (event.keyCode == "83") {
		Snake.xdir = 0;
		Snake.ydir = 1;
	}
	if (event.keyCode == "65") {
		Snake.xdir = -1;
		Snake.ydir = 0;
	}
	if (event.keyCode == "68") {
		Snake.xdir = 1;
		Snake.ydir = 0;
	}
});

function game() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.fillStyle = "#0A0";
	ctx.strokeStyle = "white";
	ctx.rect((Fruit.x-1)*PIX,(Fruit.y-1)*PIX,PIX,PIX);
	ctx.fillRect((Fruit.x-1)*PIX,(Fruit.y-1)*PIX,PIX,PIX);
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = "#F00";
	ctx.strokeStyle = "white";
	ctx.rect((Snake.x-1)*PIX,(Snake.y-1)*PIX,PIX,PIX);
	ctx.fillRect((Snake.x-1)*PIX,(Snake.y-1)*PIX,PIX,PIX);
	ctx.stroke();

	if (snakeTail.length > 0) {
		for (var i=0; i<snakeTail.length; i++) {
			if (Snake.x == snakeTail[i].x && Snake.y == snakeTail[i].y) {
				alert("Skonczyles uzyskujac dlugosc weza rowna: " + snakeTail.length);
				location.reload();
			}
		}
	}

	for (var i=0; i<snakeTail.length; i++) {
		if (snakeTail.length > 0) {
			ctx.beginPath();
			ctx.fillStyle = "#00F";
			ctx.strokeStyle = "white";
			ctx.rect((snakeTail[i].x-1)*PIX,(snakeTail[i].y-1)*PIX,PIX,PIX);
			ctx.fillRect((snakeTail[i].x-1)*PIX,(snakeTail[i].y-1)*PIX,PIX,PIX);
			ctx.stroke();
		}
	}

	if ((Snake.x == Fruit.x) && (Snake.y == Fruit.y)) {
		var tail = new Tail();
		snakeTail.push(tail);
		Fruit.x = Math.floor(Math.random()*20+1);
		Fruit.y = Math.floor(Math.random()*20+1);
	}

	for (var i=snakeTail.length-1; i>=0; i--) {
		if (snakeTail.length > 0) {
			if (i > 0) {
				snakeTail[i].x = snakeTail[i-1].x;
				snakeTail[i].y = snakeTail[i-1].y;
			}
			if (i == 0) {
				snakeTail[i].x = Snake.x;
				snakeTail[i].y = Snake.y;
			}
			
		}
	}

	Snake.x = Snake.x + Snake.xdir;
	Snake.y = Snake.y + Snake.ydir;

	if (Snake.x > 20) {
		Snake.x = 1;
	}
	if (Snake.x < 1) {
		Snake.x = 20;
	}
	if (Snake.y > 20) {
		Snake.y = 1;
	}
	if (Snake.y < 1) {
		Snake.y = 20;
	}

	setTimeout(game, 250);
}

game();