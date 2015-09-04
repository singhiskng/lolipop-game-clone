function lol_rod(x, y, l, speed,sprite) {
	this.x = x;
	this.y = y;

	this.l = l;
	this.w = 5;

	this.sprite = sprite;
};

lol_rod.prototype.draw = function() {
	// ctx.drawImage(this.sprite, this.y, this.l);
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#38d";
	ctx.fillRect(this.x-this.w/2, this.y, 2*this.w, this.l);
	ctx.restore();
};

function lol_circle(x, y, r, speed, sprite) {
	this.x = x;
	this.y = y;

	this.r = r;
	this.sprite = sprite;
};

lol_circle.prototype.draw = function() {
	ctx.save();
	ctx.beginPath();

	if (this.sprite) {
		ctx.drawImage(Sprite, this.sprite[0] , 0, this.sprite[1],this.sprite[2], this.x-this.r, this.y-this.r, 2*this.r, 2*this.r);
	}
	else{
		ctx.fillStyle = "#5c4";
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		ctx.fill();
	}
	ctx.restore();
};


// ==============================================================


function lolipop (x, speed) {
	this.x = x;
	this.speed = speed;
	this.crossed = false;

	var pass = Math.random()*YMAX/3 +  100;

	this.UpRod = new lol_rod(this.x, 0, pass ,null);
	this.UpCircle = new lol_circle(this.x + this.UpRod.w/2, this.UpRod.l, 40, null);
	this.UpCircle.sprite = lolSprite.getCircle();

	var y = pass + this.UpCircle.r + 150 + Math.random()*50;

	this.DownRod = new lol_rod(this.x, y ,  YMAX-y ,null);
	this.DownCircle = new lol_circle(this.x + this.DownRod.w/2, y, 40, null);
	this.DownCircle.sprite = lolSprite.getCircle();
}

lolipop.prototype.draw = function() {
	this.UpRod.draw();
	this.UpCircle.draw();
	this.DownRod.draw();
	this.DownCircle.draw();
};

lolipop.prototype.update = function() {
	this.x += this.speed;
	this.UpRod.x += this.speed;
	this.UpCircle.x += this.speed;
	this.DownRod.x += this.speed;
	this.DownCircle.x += this.speed;
};