

export default class GameOver extends Phaser.Scene {
  
  constructor() {
      
		super({ key: 'GameOver' });
	
  }

  preload() {

    this.load.image('background', 'img/space_bg_far.jpg');

  }

  create() {

		this.width = this.sys.game.config.width;
		this.height = this.sys.game.config.height;

    this.add.image(0, 0, 'background').setOrigin(0);
		this.add.image(1366, 0, 'background').setOrigin(0);

		this.text = this.add.text(this.width/2, this.height/2, 'GAME OVER', { font: "64px Georgia", fill: "#ce0000"});
		this.text.setOrigin(0.5);
		this.text.setScrollFactor(0);
		

		// Add Start Button =>  Try Again

		this.button = this.add.text(this.width/2, this.height/2 + 100, 'Try Again', { font: "24px Georgia", fill: "#ffffff"}).setInteractive();
		this.button.setOrigin(0.5);
		this.button.setScrollFactor(0);
    this.button.on('pointerup', () => { this.scene.start('GameScene') }, this);

  }

  update (time, delta) {}

}

