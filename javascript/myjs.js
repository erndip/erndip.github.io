var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
let yesButton = document.getElementById("yes");

let heartGrowing = false;
let heartGrown = false;
let heartFixing = false;
let timeStart = 0;

yesButton.onclick = function(){
	heartGrowing = true;
	heartGrown = false;
	heartFixing = false;

	timeStart = Date.now();
}

function drawLeftHeart(angle, color, strokeColor){
	context.save();
	context.lineJoin = "round";
	context.lineWidth = "3";
	context.fillStyle = color;
	context.strokeStyle = strokeColor;
	context.rotate(angle);
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,-100);
	context.arc(-50,-100,50,0,Math.PI, true);
	context.lineTo(-90,-90);
	context.lineTo(-90,-70);
	context.lineTo(-70,-70);
	context.lineTo(-70,-50);
	context.lineTo(-50,-50);
	context.lineTo(-50,-30);
	context.lineTo(-30,-30);
	context.lineTo(-30,-10);
	context.lineTo(-10,-10);
	context.closePath();

	context.fill();
	context.stroke();
	context.restore();
}

function drawRightHeart(angle, color, strokeColor){
	context.save();
	context.lineJoin = "round";
	context.lineWidth = "3";
	context.fillStyle = color;
	context.strokeStyle = strokeColor;
	context.rotate(angle);
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,-100);
	context.arc(50,-100,50,-Math.PI,0);
	context.lineTo(90,-90);
	context.lineTo(70,-90);
	context.lineTo(70,-70);
	context.lineTo(50,-70);
	context.lineTo(50,-50);
	context.lineTo(30,-50);
	context.lineTo(30,-30);
	context.lineTo(10,-30);
	context.lineTo(10,-10);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}

function drawBrokenHeart(){
	drawLeftHeart(Math.PI/2, "grey", "black");
	drawRightHeart(-Math.PI/2, "grey", "black");
}
// pink: rgb(255,192,203)
function growHeart(){
	let time = (Date.now()-timeStart)**1.3/8000;
	context.clearRect(0,0,canvas.width,canvas.height);
	let colorPercent = time/(Math.PI/4);
	let color = `rgb(${128+(127*colorPercent)}, ${128+((192-128)*colorPercent)}, ${128+((203-128)*colorPercent)})`


	drawLeftHeart((Math.PI/2)-time, color, "black");
	drawRightHeart((-Math.PI/2)+time, color, "black");
	if (time >= Math.PI/4){
		heartGrowing = false;
		heartGrown = true;
		heartFixing = true;
		timeStart = Date.now();
	}
}

function fixHeart(){
	let time = (Date.now()-timeStart)**0.8/200;
	let timeLimit = 2;
	let perc = time/timeLimit;
	context.save();
	context.lineWidth = "3";
	context.strokeStyle = `rgba(0,0,0,${0.8-perc})`
	context.moveTo(0,0);
	context.rotate(-Math.PI/4);
	context.lineTo(10,-10);
	context.lineTo(10,-30);
	context.lineTo(30,-30);
	context.lineTo(30,-50);
	context.lineTo(50,-50);
	context.lineTo(50,-70);
	context.lineTo(70,-70);
	context.lineTo(70,-90);
	context.lineTo(90,-90);
	context.lineTo(100,-100);

	context.stroke();
	context.restore();

	// Draw circle
	context.save();
	context.globalCompositeOperation = "destnation-atop";
	context.fillStyle = `rgba(255,0,0,${1-perc})`
	context.beginPath();
	context.arc(0,-75,perc*150,0,Math.PI*2);
	context.closePath();
	context.fill();
	context.restore();


	if (time >= timeLimit){
		heartFixing = false;
	}

}

function drawFullHeart(){
	context.save();
	context.lineWidth = "3";
	context.strokeStyle = "black";
	context.fillStyle = "pink"
	context.beginPath();
	context.save();
	context.rotate(Math.PI/4);
	context.arc(-50,-100,50,-Math.PI, 0);
	context.restore();
	context.lineTo(0,0);
	context.save();
	context.rotate(-Math.PI/4);
	context.arc(50,-100,50,-Math.PI, 0);
	context.restore();
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}



drawBrokenHeart();

function draw(ts){
	context.clearRect(0,0,canvas.width,canvas.height);
	context.save();
	context.translate(200,200);

	if(heartGrowing){
		growHeart(ts);
	}
	else if (heartGrown){
		drawFullHeart();
	}
	if (heartFixing){
		fixHeart();
	}

	context.restore();
	window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

