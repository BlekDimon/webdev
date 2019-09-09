const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 288;
canvas.height = 512;

var background = new Image();
var bird = new Image();
var foreground = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var music = new Audio("sounds/music.mp3");
var fly = new Audio("sounds/fly.mp3");
var Score = new Audio("sounds/score.mp3");
background.src = "images/bg.png";
bird.src = "images/bird.png";
foreground.src = "images/fg.png";
pipeUp.src = "images/pipeNorth.png";
pipeDown.src = "images/pipeSouth.png";

var pipes = [];
var check = true;
var score = 0;
var start = true;
var bestScore = localStorage.getItem("bestScore");
var bestScore = parseInt(bestScore);

var Bird = {
	x: 50,
	y: canvas.height/2-50,
	rotate: 0
} // jest 38x26

function Pipe(y) {
	this.x = canvas.width;
	this.y = Math.floor(Math.random()*242)-242;
}

var pipe = new Pipe();
pipes.push(pipe);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("click", async function() {
	fly.play();
	if (start == true) {
		music.play();
		window.start = false;
	}
	window.check = false;
	var a = 20;
	while (a > 0) {
		if (Bird.rotate > -35) {
			Bird.rotate = Bird.rotate - 3;
		}
		Bird.y = Bird.y - 3;
		a--;
		await sleep(15);
	}
	window.check = true;
});

function music() {
	music.play();
	setTimeout(38000, music);
}

function draw() {
	ctx.drawImage(background, 0, 0);

	for (var i=0; i<pipes.length; i++) {
		ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
		ctx.drawImage(pipeDown, pipes[i].x, pipes[i].y+350);
		pipes[i].x--;
		if (pipes[i].x == canvas.width/2-25) {
			var pipe = new Pipe();
			pipes.push(pipe);
		}
		if (pipes[i].x < -1000) {
			pipes.shift();
		}
	}

	ctx.drawImage(foreground, 0, canvas.height-100);

	ctx.save();
	ctx.translate(Bird.x+19, Bird.y+13);
    ctx.rotate(Bird.rotate*Math.PI/180);
	ctx.drawImage(bird, -19, -13);
	ctx.restore();
	
	if (check == true) {
		if (Bird.rotate < 35) {
			Bird.rotate = Bird.rotate + 2.5;
		}
		Bird.y = Bird.y + 1.75;
	}

	for (var i=0; i<pipes.length; i++) {
		if (pipes[i].x == Bird.x) {
			score++;
			Score.play();
			if (score >= bestScore) {
				bestScore = score;
			}
		}
		if (Bird.x+38 >= pipes[i].x && Bird.x <= pipes[i].x+52 && (Bird.y <= pipes[i].y+242 || Bird.y+26 >= pipes[i].y+350) || Bird.y+26 >= canvas.height-100) {
			location.reload();
		}
	}
	localStorage.setItem("bestScore", bestScore);
	
	ctx.font = "80px Flappy Bird";
	ctx.lineWidth = "3";
	ctx.fillStyle = "white";
	ctx.fillText(score, canvas.width/2, 100);
	ctx.strokeText(score, canvas.width/2, 100);
	ctx.font = "45px Flappy Bird";
	ctx.lineWidth = "2";
	ctx.fillText("bestScore: " + bestScore, 25, canvas.height-25);
	ctx.strokeText("bestScore: " + bestScore, 25, canvas.height-25);
	requestAnimationFrame(draw);
}

background.onload = function() {
	draw();
};