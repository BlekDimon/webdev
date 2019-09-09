const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.beginPath();
ctx.rect(0, 0, 5000, 5000);
ctx.fillStyle = "black";
ctx.fill();

var r = 30;
var cx = canvas.width/2;
var cy = canvas.height/2;
var speed = 5;

ctx.beginPath();
ctx.arc(cx, cy, r, 0, 2 * Math.PI);
ctx.fillStyle = "#FFFFFF";
ctx.fill();

document.getElementById("canvas").addEventListener("click", function(event) {
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX-rect.left;
	var y = event.clientY-rect.top;
	var radians = Math.atan2(y - cy, x - cx);
	var distance = Math.abs(Math.pow((cx-x), 2) + Math.pow((cy-y), 2));
	distance = Math.sqrt(distance)/speed;
	var dx = Math.cos(radians)*speed;
	var dy = Math.sin(radians)*speed;

	run(dx, dy, distance, x, y);
});

function run(dx, dy, distance, x, y) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect(0, 0, 5000, 5000);
	ctx.fillStyle = "black";
	ctx.fill();
	console.log(distance);
	if (distance > 0) {
		distance--;
		cx = cx + dx;
		cy = cy + dy;
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, 2 * Math.PI);
		ctx.fillStyle = "#FFFFFF";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(x, y, 5, 0, 2 * Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
	}
	else {
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, 2 * Math.PI);
		ctx.fillStyle = "#FFFFFF";
		ctx.fill();
		return;
	}
	setTimeout(run, 25, dx, dy, distance, x, y);
}