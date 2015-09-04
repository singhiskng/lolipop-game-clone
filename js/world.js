
function world() {
	this.lolipops;
	this.FLAPPY;

	this.living;
	this.startTime;
	this.elapsedTime;

	this.Score = 0;
};

world.prototype.init = function() {
	this.Score = 0;
	Space = false;
	this.living = true;
	this.startTime = Date.now();
	this.elapsedTime = 0;
	this.FLAPPY = new flappy(300, YMAX/2, 20);
	this.lolipops = [];
	this.lolipops.push(new lolipop( XMAX + 100, -this.FLAPPY.vx));
	this.bg1 = new parallax( -0.1,bg1Sprite);
	this.bg2 = new parallax( -0.5,bg2Sprite);
};

world.prototype.dead = function() {
	this.living = false;
	// alert("You are Dead");

	var ask = confirm("Play again");
	ctx.clearRect(0,0,XMAX,YMAX);
	if (ask) {
		setTimeout(function() {
			WORLD.init();
			Grav = 0;
		},1000)
	}
};

world.prototype.addLPop = function() {
	this.lolipops.push(new lolipop( XMAX + 100, -this.FLAPPY.vx));
};

world.prototype.draw = function() {
	this.bg1.draw();
	this.bg2.draw();
	this.FLAPPY.draw();
	
	var LPOP = this.lolipops;
	var l = LPOP.length;
	for (var i = 0; i < l; i++) {
		LPOP[i].draw();
	};
};

world.prototype.update = function() {
	this.FLAPPY.update();

	var LPOP = this.lolipops;
	var l = LPOP.length;

	for (var i = 0; i < l; i++) {
		LPOP[i].update();
	};

	if (LPOP[0].UpCircle.x + LPOP[0].UpCircle.r < -10 && LPOP[0].DownCircle.x + LPOP[0].DownCircle.r < -10) {
		LPOP.shift();
	};
};

world.prototype.checkCollision = function() {
	var LPOP = this.lolipops;
	var l = LPOP.length;
	var F = this.FLAPPY;
	
	for (var i = 0; i < l; i++) {
		var possible = LPOP[i].x - F.x;
		if (possible < 100 && possible > -100) {
			// checking upper rod
			var UR = LPOP[i].UpRod;

			var dx = Math.abs(F.x  - UR.x) - (F.r + UR.w/2);
			if (dx < 0 ) {
				// penetration in x
				var dy = F.r - (UR.l - F.y);
				if (dy < 0) {
					// penetration in y
					this.dead();
					return;
				};
			};

			// checking upper circle
			var UC = LPOP[i].UpCircle;
			var dx = (UC.x - F.x);
			var dy = (UC.y - F.y);
			var p = Math.sqrt(dx*dx + dy*dy) - (UC.r+F.r);
			if (p < 0) {
				// collision with circle
				this.dead();
				return;
			};

			// checking lower rod
			var DR = LPOP[i].DownRod;

			var dx = Math.abs(F.x  - DR.x) - (F.r + DR.w/2);
			if (dx < 0 ) {
				// penetration in x
				var dy = DR.y - (F.y - F.r);
				if (dy < 0) {
					// penetration in y
					this.dead();
					return;
				};
			};

			// checking lower circle
			var DC = LPOP[i].DownCircle;
			var dx = (DC.x - F.x);
			var dy = (DC.y - F.y);
			var p = Math.sqrt(dx*dx + dy*dy) - (DC.r+F.r);
			if (p < 0) {
				// collision with circle
				this.dead();
				return;
			};
		};
		if (possible<0 && !LPOP[i].crossed) {
			this.Score++;
			LPOP[i].crossed = true;
			// console.log(Score);
		};
	};
};