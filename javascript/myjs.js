var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");

let heartGrowing = false;
let heartGrown = false;
let heartFixing = false;
let heartBreaking = false;
let heartBroken = false;
let timeStart = 0;

let texts = [];

let confetti = [];
let confettiColors = ["magenta","purple","blue","cyan","lime","yellow"];

let explosion = [];
let explosionColors = ["orange","yellow","pink","pink","grey","black"];

canvas.onclick = function(event){
	let mouseX = event.clientX;
    let mouseY = event.clientY;
    let box = (event.target).getBoundingClientRect();
    mouseX -= box.left;
    mouseY -= box.top;

	texts.push({"x":mouseX,"y":mouseY,"time":0});
}

noButton.onclick = function(){
	heartGrowing = false;
	heartGrown = false;
	heartFixing = false;
	heartBreaking = true;
	heartBroken = false;

	timeStart = Date.now();
	spawnExplosion(0,-75,100);
}

yesButton.onclick = function(){
	if (!heartGrown){
		heartGrowing = true;
		heartGrown = false;
		heartFixing = false;
		heartBreaking = false;
		heartBroken = false;

	timeStart = Date.now();
	}
	else{
		texts.push({"x":canvas.width/2,"y":canvas.height/2-50,"time":0});
	}
	
}

function drawText(){
	context.save();

	context.textAlign = "center";
	context.textBaseline = "middle";

	texts.forEach(function(t){
		context.fillStyle = `rgba(255,0,0,${1-t.time})`
		context.font = `${10+90*t.time}px Arial`;
		context.fillText("I Love You!!",t.x,t.y);

		t.time+= 0.01;
	});

	texts = texts.filter(t => (t.time < 1));

	context.restore();
}

function spawnConfetti(num){
	confetti = [];
	for (let i=0;i<num;i++){
		confetti.push({	"x":Math.floor((Math.random()-0.5)*canvas.width),
						"y":0,
						"xvel":(Math.random()-0.5)*0.5,
						"yvel": 16+(Math.random()-0.3)*6,
						"color": confettiColors[Math.floor(Math.random()*6)]});
	}
}

function drawConfetti(){
	context.save();
	confetti.forEach(function(con){
		context.fillStyle = con.color;
		context.fillRect(con.x-3,con.y-3,6,6);
		con.x += con.xvel;
		con.y -= con.yvel;
		if (con.yvel >=-1){
			con.yvel -= 0.45;
		}
	});
	context.restore();
	// Get rid of old confetti
	confetti = confetti.filter(con => (con.y < 200));
}

function spawnExplosion(x,y,num){
	explosion = [];
	for (let i=0;i<num;i++){
		explosion.push({"x":x,
						"y":y,
						"xvel":(Math.random()-0.5)*7,
						"yvel":(Math.random()-0.7)*7,
						"color": explosionColors[Math.floor(Math.random()*6)],
						"size":10});
	}
}

function drawExplosion(){
	context.save();
	explosion.forEach(function(p){
		context.fillStyle = p.color;
		context.fillRect(p.x,p.y,p.size,p.size);
		p.x += p.xvel;
		p.y += p.yvel;
		p.yvel += 0.07;
		p.size -= 0.03;
	});
	context.restore();
	// Get rid of old particles
	explosion = explosion.filter(p => (p.size > 0));
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
		spawnConfetti(200);
		texts.push({"x":canvas.width/2,"y":canvas.height/2-50,"time":0});
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

	texts.push({"x":0,"y":-50,"time":0});

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

function breakHeart(){
	let time = (Date.now()-timeStart)/3200;
	if (time < 0.5){
		drawLeftHeart(Math.PI/4, "grey", "black");
		drawRightHeart(-Math.PI/4, "grey", "black");	
	}
	else{
		drawLeftHeart(Math.PI/4 + (time-0.4)**2, "grey", "black");
		drawRightHeart(-Math.PI/4 - (time-0.4)**2, "grey", "black");	
	}
	
	drawExplosion();

	if (time >= 0.5 + (Math.PI/4)){
		heartBreaking = false;
		heartBroken = true;
	}
}

function draw(ts){
	context.clearRect(0,0,canvas.width,canvas.height);
	context.save();
	context.translate(canvas.width/2,100+canvas.height/2);
	
	context.scale(2,2);
	if(heartGrowing){
		growHeart(ts);
	}
	else if (heartGrown){
		drawConfetti();
		drawFullHeart();
	}
	if (heartFixing){
		fixHeart();
	}
	if (heartBreaking) {
		breakHeart();
	}
	else if (heartBroken){
		drawBrokenHeart();
	}
	
	context.restore();
	drawText();

	window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

