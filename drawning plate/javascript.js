const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var drawnedDots = [], inter, x, y, hue=0;

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

window.addEventListener('mousedown', (event) => {
	inter = setInterval(createDot, 1, event);
});

window.addEventListener('touchstart', (event) => {
	x = event.clientX;
	y = event.clientY;
	inter = setInterval(createDot, 1, event);
});

window.addEventListener('mousemove', (event) => {
	x = event.clientX;
	y = event.clientY;
});

window.addEventListener('touchmove', (event) => {
	x = event.clientX;
	y = event.clientY;
});

window.addEventListener('touchend', (event) => {
	x = event.clientX;
	y = event.clientY;
	clearInterval(inter);
});

window.addEventListener('mouseup', () => {
	clearInterval(inter);
});

createDot = (event) => {
	if (!(drawnedDots.length == 0)) {
		for (let i=0; i<drawnedDots.length; i++) {
			if (!(x == (drawnedDots[drawnedDots.length-1].x) && y == (drawnedDots[drawnedDots.length-1].y))) {
				let dot = new Dot(hue, x, y, 50);
				dot.decay();
				drawnedDots.push(dot);
				hue++;
				if (hue > 359) {
					hue = 0;
				}
			}
		}
	}
	else {
		let dot = new Dot(hue, x, y, 50);
		dot.decay();
		drawnedDots.push(dot);
		hue++;
		if (hue > 359) {
			hue = 0;
		}
	}
}

function Dot(h, x, y, a) {
	this.x = x;
	this.y = y;
	this.a = a;
	this.h = h;
	this.decay = () => {
		if (this.a < 99.5) {
			this.a = this.a + 0.1;
			setTimeout(this.decay, 10);
		}
	}
}

drawningLoop = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (!(drawnedDots.length == 0)) {
		for (var i=0; i<drawnedDots.length; i++) {
			ctx.beginPath();
			ctx.fillStyle = `hsl(${drawnedDots[i].h}, 100%, ${drawnedDots[i].a}%)`;
			ctx.strokeStyle = `hsl(${drawnedDots[i].h}, 100%, ${drawnedDots[i].a}%)`;
			ctx.arc(drawnedDots[i].x, drawnedDots[i].y, 12, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
			if (drawnedDots[i].a >= 99.5) {
				drawnedDots.splice(i, 1);
			}
		}
	}
	setTimeout(drawningLoop, 1);
}

drawningLoop();
