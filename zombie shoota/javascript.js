const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var tabZombie = [],
    keys = [],
    tabBullet = [],
    kratka = new Image(),
    points = 0,
    time = 4100;
kratka.src = "kratka.png";

var Player = {
	x: canvas.width/2,
	y: canvas.height/2,
	velY: 0,
	velX: 0,
	speed: 3.5,
	friction: 0.94,
	radius: 30,
}

window.addEventListener("mousedown", function(e) {
	spawnBullet(e);
	window.timer = setInterval(spawnBullet, 500, e);
});

window.addEventListener("mouseup", function(e) {
	clearInterval(window.timer);
});

function spawnBullet(e) {
	var x = e.clientX;
	var y = e.clientY;
	var bullet = new Bullet(Player.x, Player.y, 7.5, 5, x, y);
	tabBullet.push(bullet);
}

function Bullet(x, y, radius, speed, mouseX, mouseY) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.speed = speed;
	this.mouseX = mouseX;
	this.mouseY = mouseY;
	this.lifetime = 65;
	this.radians = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
	this.xdir = Math.cos(this.radians)*this.speed;
	this.ydir = Math.sin(this.radians)*this.speed;
	this.loop = function() {
		this.x = this.x + this.xdir;
		this.y = this.y + this.ydir;
		this.lifetime--;
	}
}

function Zombie(x, y, radius, speed) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.speed = speed;	
	this.health = 5;
	this.loop = function() {
		this.radians = Math.atan2(Player.y - this.y, Player.x - this.x);
		this.xdir = Math.cos(this.radians)*this.speed;
		this.ydir = Math.sin(this.radians)*this.speed;
		this.x = this.x + this.xdir;
		this.y = this.y + this.ydir;
	}
}

function adding() {
	var distance = 0;
	if (time > 900) {
		time = time - 100;
	}
	while (distance < 500) {
		var x = Math.floor(Math.random()*canvas.width);
		var y = Math.floor(Math.random()*canvas.height);
		var distance = Math.abs(Math.pow((x-Player.x), 2) + Math.pow((y-Player.y), 2));
		distance = Math.sqrt(distance);
	}
	var zombie = new Zombie(x, y, 22.5, 0.8);
	tabZombie.push(zombie);
	setTimeout(adding, time);
}


function aktual() {
	requestAnimationFrame(aktual);
	if (keys[65]) { //a
		if (Player.velX > -Player.speed) {
            Player.velX--;
        }
	}
	if (keys[68]) { //d
		if (Player.velX < Player.speed) {
	        Player.velX++;
	    }
	}
	if (keys[87]) { //w
		if (Player.velY > -Player.speed) {
	        Player.velY--;
	    }
	}
	if (keys[83]) { //s
		if (Player.velY < Player.speed) {
        	Player.velY++;
	    }
	}

	Player.velY *= Player.friction;
    Player.y += Player.velY;
    Player.velX *= Player.friction;
    Player.x += Player.velX;

    //clear
	ctx.beginPath();
	ctx.rect(0, 0, 5000, 5000);
	ctx.fillStyle = "white";
	ctx.fill();

	ctx.fillStyle = ctx.createPattern(kratka, "repeat");
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (i=0; i<tabBullet.length; i++) {
		if (tabBullet[i].lifetime <= 0) {
			tabBullet.splice(i, 1);
		}
	}

	for (j=0; j<tabZombie.length; j++) {
		var distance = Math.abs(Math.pow((tabZombie[j].x-Player.x), 2) + Math.pow((tabZombie[j].y-Player.y), 2));
		distance = Math.sqrt(distance);
		if (distance-tabZombie[j].radius-Player.radius <= 0) {
			alert("Koniec gry.\nWynik koncowy: " + points);
			location.reload();
		}
		for (i=0; i<tabBullet.length; i++) {
			var distance = Math.abs(Math.pow((tabZombie[j].x-tabBullet[i].x), 2) + Math.pow((tabZombie[j].y-tabBullet[i].y), 2));
			distance = Math.sqrt(distance);
			if (distance-tabZombie[j].radius <= 0) {
				tabBullet.splice(i, 1);
				tabZombie[j].health--;
				if (tabZombie[j].health <= 0) {
					tabZombie.splice(j, 1);
					points++;
				}
			}
		}
	}

	for (i=0; i<tabBullet.length; i++) {
		tabBullet[i].loop();
		ctx.beginPath();
		ctx.arc(tabBullet[i].x, tabBullet[i].y, tabBullet[i].radius, 0, 2 * Math.PI);
		ctx.fillStyle = "#000";
		ctx.fill();
	}

	ctx.beginPath();
	ctx.arc(Player.x, Player.y, Player.radius, 0, 2 * Math.PI);
	ctx.fillStyle = "#F00";
	ctx.fill();
	ctx.lineWidth = "0.3";
	ctx.stroke();

	for (i=0; i<tabZombie.length; i++) {
		tabZombie[i].loop();
		ctx.beginPath();
		ctx.arc(tabZombie[i].x, tabZombie[i].y, tabZombie[i].radius, 0, 2 * Math.PI);
		ctx.fillStyle = "#070";
		ctx.fill();
		ctx.lineWidth = "0.3";
		ctx.stroke();

		ctx.fillStyle = "#0A0";
		ctx.beginPath();
		ctx.fillRect(tabZombie[i].x-tabZombie[i].radius, tabZombie[i].y-50, 50, 10);
		ctx.fillStyle = "white";
		ctx.fillRect(tabZombie[i].x-tabZombie[i].radius+(tabZombie[i].health*10), tabZombie[i].y-50, 50-(tabZombie[i].health*10), 10);

		ctx.lineWidth = "0.75";
		ctx.rect(tabZombie[i].x-tabZombie[i].radius, tabZombie[i].y-50, 50, 10);
		ctx.stroke();
	}

	ctx.fillStyle = "black";
	ctx.font = "20px Verdana";
	ctx.fillText("Punkty: " + points, (canvas.width/2)-45, 75);
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

adding();
aktual();