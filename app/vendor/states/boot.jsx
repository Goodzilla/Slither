//Boot State
var PhaserBp = {};

PhaserBp.Boot = function(game) {
	console.log("Boot State Initiated");
};

PhaserBp.Boot.prototype = {
    create: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.forcePortrait = false;
		this.stage.disableVisibilityChange = true;
        this.input.addPointer();

        this.state.start('Preload');
    }
}
