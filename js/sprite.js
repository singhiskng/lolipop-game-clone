var Sprite = new Image();
Sprite.src = "img/lolipop.png";

var lolSprite = {
	cir : [
		[
			0,
			133,
			126
		],
		[
			146,
			124,
			126
		],
		[
			277,
			125,
			126
		],
		[
			415,
			125,
			126
		],
	],

	getCircle : function() {
		return this.cir[Math.floor(Math.random()*4)];
	}
};