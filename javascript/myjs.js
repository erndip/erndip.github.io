let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let yesButton = document.getElementById("yes");

let heartGrowing = false;
let heartGrown = false;
let heartFixing = false;
let timeStart = 0;

yesButton.onclick = function(){
	heartGrowing = true;
	timeStart = Date.now();
	console.log(timeStart);
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
	let time = (Date.now()-timeStart)/2000;
	context.clearRect(0,0,canvas.width,canvas.height);
	let colorPercent = time/(Math.PI/4);
	let color = `rgb(${128+(127*colorPercent)}, ${128+((192-128)*colorPercent)}, ${128+((203-128)*colorPercent)})`


	drawLeftHeart((Math.PI/2)-time, color, "black");
	drawRightHeart((-Math.PI/2)+time, color, "black");
	if (time >= Math.PI/4){
		heartGrowing = false;
		heartGrown = true;
	}
}

function fixHeart(){
	let time = (Date.now()-timeStart)/2000;

}

function drawFullHeart(){
	context.save();
	context.lineWidth = "3";
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

	context.restore();
	window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

