export default class Boss {

  constructor ( options = {} ) {

    this.game = options.game;

    this.isAlive = true;

    // the units health
    this.health = 100;


    this.sprite = this.game.physics.add.sprite(10000, this.game.height / 2, 'skullmaster');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setGravityY(0);
    this.sprite.setVelocity(0);


  }


  init () {

    

  }


  update (time) {

        

  }

}