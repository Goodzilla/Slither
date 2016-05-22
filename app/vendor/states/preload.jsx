// Preload State
PhaserBp.Preload = function(game) {
	console.log("Load State Initiated");
};

PhaserBp.Preload.prototype = {
	preload: function () {
        this.load.image('background', 'images/debug-grid-1920x1920.png');
		this.load.image('snake-head', 'images/snake-head.png');
		this.load.image('snake-body', 'images/snake-body.png');
	},

	create: function () {

	},

	update: function () {
        this.state.start('Game');
	}
};
