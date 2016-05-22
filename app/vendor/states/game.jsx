// Game State
PhaserBp.Game = function(game) {
	console.log("Game State Initiated");
};

PhaserBp.Game.prototype = {
    create: function() {
		var worldWidth = 19200;
		var worldHeight = 19200;

		this.snakeSection = new Array();
		this.snakePath = new Array();
		this.numSnakeSections = 10;
		this.snakeSpacer = 5;
		this.velocity = 300;
		this.currentAngle = 0;
		this.maxTurningAngle = 4;

		// WORLD
		this.world.setBounds(0, 0, worldWidth, worldHeight);
		this.add.tileSprite(0, 0, worldWidth, worldHeight, 'background');

		// FPS COUNTER
		this.time.advancedTiming = true;
		this.time.desiredFps = 60;

		// ACTIVATE PHYSICS
		this.physics.startSystem(Phaser.Physics.ARCADE);

		// SNAKE'S BODY
		for (var i = 1; i <= this.numSnakeSections - 1; i++)
		{
			this.snakeSection[i] = this.add.sprite(this.world.centerX, this.world.centerY, 'snake-body');
			this.snakeSection[i].anchor.setTo(0.5, 0.5);
		}

		// SNAKE'S PATH
		for (var i = 0; i <= this.numSnakeSections * this.snakeSpacer; i++)
		{
			this.snakePath[i] = new Phaser.Point(this.world.centerX, this.world.centerY);
		}

		// SNAKE'S HEAD
		this.snakeHead = this.add.sprite(this.world.centerX, this.world.centerY, 'snake-head');
	    this.snakeHead.anchor.setTo(0.5, 0.5);
		this.physics.enable(this.snakeHead, Phaser.Physics.ARCADE);

		// CAMERA
		this.camera.follow(this.snakeHead);
    },

    update: function() {
		// HEAD ANGLE
		var newRotation = this.math.normalizeAngle(this.physics.arcade.angleToPointer(this.snakeHead));
		this.snakeHead.rotation = newRotation;

		// LIMIT SNAKE ROTATION
		this.targetAngle = this.math.radToDeg(newRotation);

		if (this.currentAngle - this.targetAngle !== 0) {
			if (Math.abs(this.currentAngle - this.targetAngle) < 180) {
				// ROTATE DIRECTLY TOWARDS THE TARGET
				if (this.currentAngle < this.targetAngle) this.currentAngle += this.maxTurningAngle;
				else this.currentAngle -= this.maxTurningAngle;
			} else {
				// ROTATE IN THE REVERSE DIRECTION
				if (this.currentAngle < this.targetAngle) this.currentAngle -= this.maxTurningAngle;
				else this.currentAngle += this.maxTurningAngle;
			}
			this.currentAngle = ((this.currentAngle % 360) + 360) % 360;

			this.physics.arcade.velocityFromAngle(this.currentAngle, this.velocity, this.snakeHead.body.velocity);
		}

		// BODY MOVEMENT AND ANGLE
	    var part = this.snakePath.pop();
	    part.setTo(this.snakeHead.x, this.snakeHead.y);
		this.snakePath.unshift(part);

	    for (var i = 1; i <= this.numSnakeSections - 1; i++)
	    {
	        this.snakeSection[i].x = (this.snakePath[i * this.snakeSpacer]).x;
	        this.snakeSection[i].y = (this.snakePath[i * this.snakeSpacer]).y;

			if (i === 1) {
				this.snakeSection[i].rotation = this.physics.arcade.angleBetween(this.snakeSection[i], this.snakeHead);
			}
			else {
				this.snakeSection[i].rotation = this.physics.arcade.angleBetween(this.snakeSection[i], this.snakeSection[i-1]);
			}
	    }
	},

	render: function() {
		this.game.debug.spriteInfo(this.snakeHead, 32, 32);
		this.game.debug.text(this.time.fps, 2, 14, "#00ff00");
		this.game.debug.text('currentAngle: ' + this.currentAngle, 32, 150);
		this.game.debug.text('targetAngle: ' + this.targetAngle, 32, 180);
	}
};
