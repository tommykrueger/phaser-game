

export default class StartScene extends Phaser.Scene {
  
  constructor() {
      
		super({ key: 'StartScene' });
	
  }

  preload() {

    this.load.image('background', 'img/space_bg_far.jpg');

  }

  create() {

		this.width = this.sys.game.config.width;
		this.height = this.sys.game.config.height;

    this.add.image(0, 0, 'background').setOrigin(0);
		this.add.image(1366, 0, 'background').setOrigin(0);

		this.text = this.add.text(this.width/2, this.height/2, 'START GAME', { font: "64px Georgia", fill: "#ce0000", resolution: 4 });
		this.text.setInteractive();
		this.text.setOrigin(0.5);
		this.text.setScrollFactor(0);

    this.text.on('pointerup', () => { 
			
			this.time.delayedCall(250, function() {
				this.cameras.main.fade(250);
			}, [], this);

			this.time.delayedCall(500, function() {
				this.scene.start('GameScene'); 
			}, [], this);
			
		}, this);

  }

  update (time, delta) {}

}

