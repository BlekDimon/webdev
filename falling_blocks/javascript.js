const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const pixel = 50;
var fallingSquares = [];
var squareDelay = 1000, fallingDelay = 750, points = 0, endTime = 5, endPoints, showHighscore, highscore = localStorage.getItem("fallingBlocksScore");

var Player = {
	x: 8,
	y: 11,
}

document.addEventListener("keydown", (event) => {
	if (event.keyCode == "65" || event.keyCode == "37") {
		if (Player.x > 0) {
			Player.x = Player.x + -1;
		}
	}
	if (event.keyCode == "68" || event.keyCode == "39") {
		if (Player.x < 17) {
			Player.x = Player.x + 1;
		}
	}
});

function Square(x) {
	this.x = x;
	this.y = -2;
	this.loop = () => {
		this.y++;
		setTimeout(this.loop, fallingDelay);
	}
}

function squaresUpdating() {
	let x = Math.floor(Math.random()*18);
	if (x > 17) {
		console.log(x);
	}
	let square = new Square(x);
	square.loop();
	fallingSquares.push(square);

	if (squareDelay > 700) {
		squareDelay = squareDelay - 15;
	}
	else if (squareDelay > 350) {
		squareDelay = squareDelay - 10;
	}
	else if (squareDelay > 50) {
		squareDelay = squareDelay - 5;
	}
	else {
		squareDelay = 50;
	}


	if (fallingDelay > 500) {
		fallingDelay = fallingDelay - 15;
	}
	else if (fallingDelay > 200) {
		fallingDelay = fallingDelay - 10;
	}
	else if (fallingDelay > 75) {
		fallingDelay = fallingDelay - 5;
	}
	else {
		fallingDelay = 75;
	}

	console.log("loop: " + squareDelay);
	console.log("falling: " + fallingDelay);
	setTimeout(squaresUpdating, squareDelay);
}

function gameDraw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	fallingSquares.forEach((square) => {
		ctx.beginPath();
		ctx.fillStyle = "#ff0000";
		ctx.strokeStyle = "#251515";
		ctx.rect(square.x*pixel, square.y*pixel, pixel, pixel);
		ctx.fillRect(square.x*pixel, square.y*pixel, pixel, pixel);
		ctx.stroke();
	});

	ctx.beginPath();
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = "#251515";
	ctx.rect(Player.x*pixel, Player.y*pixel, pixel, pixel);
	ctx.fillRect(Player.x*pixel, Player.y*pixel, pixel, pixel);
	ctx.stroke();

	ctx.font = "30px Verdana";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "center";
	ctx.fillText("Points: " + points, canvas.width/2, canvas.height/10);


	for (let i=0; i<fallingSquares.length; i++) {
		if (fallingSquares[i].x == Player.x && fallingSquares[i].y == Player.y) {
			endPoints = points;
			endGame();
			return;
		}
		if (fallingSquares[i].y > 11) {
			points++;
			fallingSquares.splice(i, 1);
		}
	}

	setTimeout(gameDraw, 10);
}

function endGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.font = "50px Verdana";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "center";
	ctx.fillText(endTime, canvas.width/2, canvas.height/1.75);

	ctx.font = "50px Verdana";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "center";
	ctx.fillText("End Points: " + endPoints, canvas.width/2, canvas.height/2.30);

	if (highscore < points || highscore == null) {
		highscore = points;
		localStorage.setItem("fallingBlocksScore", highscore);
	}

	ctx.font = "30px Verdana";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "center";
	ctx.fillText("Highscore: " + highscore, canvas.width/2, canvas.height/3.15);

	endTime--;
	if (endTime <= 0) {
		setTimeout(() => {
			location.reload();
		}, 1000);
	}
	setTimeout(endGame, 1000);
}

squaresUpdating();
gameDraw();