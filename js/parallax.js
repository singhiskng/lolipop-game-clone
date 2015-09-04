function parallax( speed, sprite) {

	this.speed = speed;
	this.sprite = sprite;

	this.offsetX = Math.random()*100;
}

parallax.prototype.draw = function() {
	var l = XMAX/this.sprite.width + 1;
	ctx.save();
	ctx.globalAlpha = 0.8;
	for (var i = 0; i <= l; i++) {
		ctx.drawImage(this.sprite, i * this.sprite.width + this.offsetX, 0);		
	};
	ctx.restore();

	this.offsetX += this.speed;
	if (this.offsetX < -this.sprite.width) 
		this.offsetX = 0;
};