export default class HUD {

  constructor ( options = {} ) {

    this.game = options.game;

    this.texts = {
      coins: (value) => { return `Coins: ${value}` },
      enemies: (value) => { return `Enemies Destroyed: ${value}` },

      // TODO
      enemies_escaped: (value) => { return `Enemies Escaped: ${value}` },
      health: (value) => { return `Health: ${value}` },
      points: (value) => { return `Points: ${value}` },
    }

    this.styles = {
      default: { font: "18px Georgia", fill: "#ffffff" },
      coins: { font: '18px Georgia', fill: '#ffff00' },
      health: { font: '18px Georgia', fill: '#00ff00', resolution: 2 }
    }

  }


  init () {

    this.points = this.game.add.text(32, 32, this.texts.points( this.game.player.getPoints() ), this.styles.default );
    this.points.setScrollFactor(0);

    this.coins = this.game.add.text(160, 32, this.texts.coins( this.game.player.getCoins() ), this.styles.coins );
    this.coins.setScrollFactor(0);

    this.health = this.game.add.text(320, 32, this.texts.health( this.game.player.getHealth() ), this.styles.health );
    this.health.setScrollFactor(0);

    this.enemies = this.game.add.text(480, 32, this.texts.enemies( this.game.player.getEnemiesDestroyed() ), this.styles.default );
    this.enemies.setScrollFactor(0);

  }


  updateText ( which, value ) {

    this[which].setText( this.texts[which](value) );

  }


  update (time) {



  }

}