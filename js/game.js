var Space = false;
var Grav = 0;
var jumpSpeed = 10;

var bg1Sprite = new Image();
var bg2Sprite = new Image();
bg1Sprite.src = "img/bg1.png"
bg2Sprite.src = "img/bg2.png"

window.addEventListener('keydown',keyDown,false);
window.addEventListener('keyup',keyUp,false);

window.onfocus = function() {
	WORLD.init();
};

function keyDown(e) {
	if (e.keyCode == 32) {
		Space = true;
	};
	Grav = 1;
};

function keyUp(e) {
	if (e.keyCode == 32) {
		Space = false;
	}
};

// ===================================================

function flappy (x , y, r) {
	this.x = x;
	this.y = y;

	this.r = r;

	this.vy = 0;
	this.vx = 3;

	this.sprite = new Image();
	this.sprite.src = "img/robot.png";

	this.ang = 0;
}

flappy.prototype.draw = function() {
	var r = this.r;

	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#f00";
	ctx.translate(this.x , this.y);
	this.ang = Math.atan2(this.vy, this.vx) + Math.PI/2;
	ctx.rotate(this.ang);
	// ctx.arc(0, 0, r, 0, 2*Math.PI, false);
	// ctx.stroke();
	ctx.drawImage(this.sprite,0,0,100,118, -r, -r, 2*r ,2*r+5);
	ctx.restore();
};

flappy.prototype.update = function() {
	this.vy += Grav;
	this.y += this.vy;

	if (Space) {
		this.vy = -jumpSpeed;
	};

	if (this.y-this.r < 0) {
		this.y = this.r;
	};
	if (this.y+this.r > YMAX) {
		this.y = YMAX - this.r;
		WORLD.dead();
	};

};

//  =====================================
//  =========     main     ==============
//  =====================================

window.onload  = function() {
	C = document.getElementById('world');
	ctx = C.getContext('2d');

	XMAX = C.width;
	YMAX = C.height;

	WORLD = new world();
	WORLD.init();

	var dashboard = document.getElementById('scoreBoard');

	function animate() {
		dashboard.innerHTML = WORLD.Score;

		var currentTime = Date.now();
		WORLD.elapsedTime += (currentTime - WORLD.startTime)/1000;


		if (WORLD.living){
			ctx.clearRect(0,0,XMAX,YMAX);
			
			
			WORLD.update();
			WORLD.draw();
			WORLD.checkCollision();

			
			if (WORLD.elapsedTime > 2){
				WORLD.addLPop();
				WORLD.elapsedTime = 0;
			}
		};
		
		WORLD.startTime = currentTime;

		requestAnimationFrame(animate);
	};

	frame = animate();
};