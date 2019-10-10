window.onload = () => {
	loopTime();
	document.querySelector(".start-stop").onclick = () => {
		changeStatus();
	}
	document.querySelector(".reset").onclick = () => {
		tms = 0;
		ts = 0;
		tm = 0;
		ms = 0;
		s = 0;
		m = 0;
		numerlap = 0;
		running = true;
		changeStatus();
		document.getElementById("time-text").innerHTML = "00:00";
		let node = document.getElementById("laps");
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
	document.querySelector(".lap").onclick = () => {
		numerlap++;
		createNr(numerlap);
		createTime(numerlap);
		createTotalTime(numerlap);
		document.getElementById("laps").scrollTo(0, 100000);
		ms = 0;
		s = 0;
		m = 0;
	}
}

function createNr(numerlap) {
	let divNode = document.createElement("div");
	divNode.classList.add("divLapNr");
	let spanNode = document.createElement("span");
	spanNode.classList.add("spanLapNr");
	let textNode = document.createTextNode(numerlap + ".");
	spanNode.appendChild(textNode);
	document.getElementById("laps").appendChild(divNode);
	document.getElementsByClassName("divLapNr")[numerlap-1].appendChild(spanNode);
	if (document.getElementsByClassName("spanLapNr").length > 1) {
		let helpvar = document.getElementsByClassName("spanLapNr").length-2;
		$(".spanLapNr:eq(" + helpvar + ")").css("color", "#888");
	}
}

function createTime(numerlap) {
	var ptms = ms, pts = s, ptm = m;
	if (ptms < 10) {
		ptms = "0" + ptms;
	}
	if (pts < 10) {
		pts = "0" + pts;
	}
	if (ptm < 10) {
		ptm = "0" + ptm;
	}
	if (ptm != 0) {
		var textNode = document.createTextNode(ptm + ":" + pts + ":" + ptms);
	}
	else {
		var textNode = document.createTextNode(pts + ":" + ptms);
	}
	ms = 0;
	s = 0;
	m = 0;

	let divNode = document.createElement("div");
	divNode.classList.add("divLapTime");
	let spanNode = document.createElement("span");
	spanNode.classList.add("spanLapTime");
	// let textNode = document.createTextNode(ts + ":" + tms);
	spanNode.appendChild(textNode);
	document.getElementById("laps").appendChild(divNode);
	document.getElementsByClassName("divLapTime")[numerlap-1].appendChild(spanNode);
	if (document.getElementsByClassName("spanLapTime").length > 1) {
		let helpvar = document.getElementsByClassName("spanLapTime").length-2;
		$(".spanLapTime:eq(" + helpvar + ")").css("color", "#888");
	}
}

function createTotalTime(numerlap) {
	var ptms = tms, pts = ts, ptm = tm;
	if (ptms < 10) {
		ptms = "0" + ptms;
	}
	if (pts < 10) {
		pts = "0" + pts;
	}
	if (ptm < 10) {
		ptm = "0" + ptm;
	}
	if (ptm != 0) {
		var textNode = document.createTextNode(ptm + ":" + pts + ":" + ptms);
	}
	else {
		var textNode = document.createTextNode(pts + ":" + ptms);
	}
	let divNode = document.createElement("div");
	divNode.classList.add("divLapTotalTime");
	let spanNode = document.createElement("span");
	spanNode.classList.add("spanLapTotalTime");
	// let textNode = document.createTextNode("00:00:00");
	spanNode.appendChild(textNode);
	document.getElementById("laps").appendChild(divNode);
	document.getElementsByClassName("divLapTotalTime")[numerlap-1].appendChild(spanNode);
	if (document.getElementsByClassName("spanLapTotalTime").length > 1) {
		let helpvar = document.getElementsByClassName("spanLapTotalTime").length-2;
		$(".spanLapTotalTime:eq(" + helpvar + ")").css("color", "#888");
	}
}

var tms = 0, ts = 0, tm = 0, ms = 0, m = 0, s = 0, numerlap = 0, running = false;

function changeStatus() {
	running = !running;
	if (running) {
		$(".fa-play").css("display", "none");
		$(".fa-pause").css("display", "inline");
	}
	else {
		$(".fa-play").css("display", "inline");
		$(".fa-pause").css("display", "none");
	}
}

function loopTime() {
	if (running) {
		tms++;
		ms++;
		if (tms >= 99) {
			ts++;
			tms = 0;
		}
		if (ts > 59) {
			tm++
			ts = 0;
		}
		if (ms >= 99) {
			s++;
			ms = 0;
		}
		if (s > 59) {
			m++
			s = 0;
		}
		var ptms = ms, pts = s, ptm = m;
		if (ptms < 10) {
			ptms = "0" + ptms;
		}
		if (pts < 10) {
			pts = "0" + pts;
		}
		if (ptm < 10) {
			ptm = "0" + ptm;
		}
		if (ptm != 0) {
			document.getElementById("time-text").innerHTML = ptm + ":" + pts + ":" + ptms;
		}
		else {
			document.getElementById("time-text").innerHTML = pts + ":" + ptms;
		}
	}
	setTimeout(loopTime, 10);
}