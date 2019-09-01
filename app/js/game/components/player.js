export default class Player {

  constructor ( options = {} ) {

    this.game = options.game;

    this.sprite = null;

  }


  init () {

    // the players health
    this.health = 100;

    // players shield health
    this.shield = 0;

    // how many enemies have you destroyed
    this.enemiesDestroyed = 0;

    // you get points for destroying enemies
    this.points = 0;

    // how many coins have you collected
    this.coins = 0;


    this.sprite = this.game.physics.add.sprite(64, 200, 'player');
    // this.sprite.setBounce(1, 1);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setGravityY(0);
    this.sprite.setVelocity(0);

    this.isAlive = true;
    

    this.bullets = [];
    this.lastFired = 0;
    this.fireRate = 500;

    
    // create input logic for user keys 
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // use space bar to fire
    this.fire = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    this.Bullet = new Phaser.Class({

      Extends: Phaser.Physics.Arcade.Image,

      initialize:

      function Bullet (scene)
      {
        Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'laser');

        this.setBlendMode(1);
        this.setDepth(1);
        //this.setSize(10, 1, true);

        this.speed = 1000;
        this.lifespan = 10000;

        this.width = 12;
        this.height = 1;
        this.setOrigin(0.5, 0.5, true);
        this.y -= 43;

        // this._temp = new Phaser.Math.Vector2();
      },

      fire: function (ship)
      {
        this.lifespan = 10000;

        this.setActive(true);
        this.setVisible(true);
        // this.setRotation(ship.rotation);
        this.setAngle(ship.body.rotation);
        this.setPosition(ship.x, ship.y);
        this.body.reset(ship.x, ship.y);

        // ship.body.advancePosition(10, this._temp);

        // this.setPosition(this._temp.x, this._temp.y);
        // this.body.reset(this._temp.x, this._temp.y);

        //  if ship is rotating we need to add it here
        // var a = ship.body.angularVelocity;

        // if (ship.body.speed !== 0)
        // {
        //     var angle = Math.atan2(ship.body.velocity.y, ship.body.velocity.x);
        // }
        // else
        // {
            var angle = Phaser.Math.DegToRad(ship.body.rotation);


            // angle = 90;
        // }

        // this.body.world.velocityFromRotation(angle, this.speed + ship.body.speed, this.body.velocity);
        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);

        this.body.velocity.x *= 2;
        this.body.velocity.y *= 2;
      },

      update: function (time, delta)
      {
        this.lifespan -= delta;

        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
            this.body.stop();
        }
      },


      remove: function () {
        this.lifespan = -1;
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();

        this.y = -10000;
        // this.body.destroy();
      }

    });
  


    this.bullets = this.game.physics.add.group({
      classType: this.Bullet,
      maxSize: 30,
      runChildUpdate: true
    });



    this.game.events.on('gameover', () => { console.log('gameover'); }, this);

  }


  update (time) {


    this.sprite.setVelocity(0);
    this.sprite.setVelocityX(60);

    if (this.cursors.left.isDown)
    {
        this.sprite.setVelocityX(-500);
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.setVelocityX(500);
    }

    if (this.cursors.up.isDown)
    {
        this.sprite.setVelocityY(-350);
    }
    else if (this.cursors.down.isDown)
    {
        this.sprite.setVelocityY(350);
    }


    if (this.sprite.x <= this.game.cameras.main.scrollX) {
        this.sprite.setVelocityX(0);
        this.sprite.setPosition(this.game.cameras.main.scrollX + this.sprite.width/2, this.sprite.y);
    }

    if (this.sprite.x >= this.game.cameras.main.scrollX + this.game.cameras.main.width) {
        this.sprite.setVelocityX(0);
        this.sprite.setPosition(this.game.cameras.main.scrollX + this.game.cameras.main.width - this.sprite.width, this.sprite.y);
    }


    if (this.fire.isDown && time > this.lastFired)
    {
        var bullet = this.bullets.get();

        if (bullet)
        {
            bullet.fire(this.sprite);

            this.lastFired = time + this.fireRate;

            this.game.sound.play('fire_laser');
        }
		}
		

		if (!this.isAlive) {

			this.game.gameover();

		}


  }


  die () {

    this.isAlive = false;

  }


  getSprite () {
    
    return this.sprite;

  }


  getCoins () {

    return this.coins;

  }

  getHealth () {

    return this.health;

  }

  getPoints () {

    return this.points;

  }

  getEnemiesDestroyed () {

    return this.enemiesDestroyed;

  }


  addHealth (value) {

    this.health += value;

    if (this.health <= 0) {
      this.isAlive = false;
    }

  }

  addShield (value) {

    this.shield += value;

  }

  addCoins ( amount ) {

    this.coins += amount;

  }

  addPoints ( amount ) {

    this.points += amount;

  }

  addDestroyedEnemy ( amount ) {

    this.enemiesDestroyed += amount;

  }


  playerHitByEnemy (player, enemy) {

    console.log('player met enemy', enemy);

		this.game.cameras.main.shake(450);

		enemy.destroy();

  }

}