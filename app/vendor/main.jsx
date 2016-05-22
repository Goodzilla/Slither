// INIT FUNCTION
window.onload = function() {
	var winW = window.innerWidth * window.devicePixelRatio;
	var winH = window.innerHeight * window.devicePixelRatio;
	var game = new Phaser.Game(winW, winH, Phaser.AUTO, 'phaser-stage');

	game.state.add('Boot', PhaserBp.Boot);
	game.state.add('Preload', PhaserBp.Preload);
	game.state.add('Game', PhaserBp.Game);

	game.state.start('Boot');
};
