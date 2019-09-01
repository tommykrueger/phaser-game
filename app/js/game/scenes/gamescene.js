import HUD from "../components/hud";
import Player from "../components/player";

import Boss from "../components/boss";

export default class GameScene extends Phaser.Scene {
  
  constructor() {
      
    super({ key: 'GameScene' });

    //this.bullets = [];
    //this.lastFired = 0;

    this.enemies = [];
    this.enemiesBullets = [];

    this.coinsGroup;
    this.itemsGroup;
		this.group;
		this.explodeEmitter;


		this.movableGroup;

    //this.coins = 0;
    //this.points = 0;
    //this.health = 100;

    //this.coinsText;
    //this.pointsText;

		//this.fireRate = 500;
		
		this.rectangle;

    this.platforms;
    this.secondsElapsed = 0;

		this.EnemyBullet = new Phaser.Class({

			Extends: Phaser.Physics.Arcade.Image,

			initialize:

			function Bullet (scene)
			{
				Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'laser');

				this.setBlendMode(1);
				this.setDepth(1);
				this.speed = 1000;
				this.lifespan = 10000;
				this.width = 12;
				this.height = 1;
				this.setOrigin(0.5);

				// console.log(this);
				// this.body.setSize(24, 5, true);
			},

			fire: function (ship)
			{
					this.lifespan = 10000;

					this.setActive(true);
					this.setVisible(true);
					// this.setRotation(ship.rotation);
					//this.setAngle(ship.body.rotation);
					this.setPosition(ship.x, ship.y);
					this.body.reset(ship.x, ship.y);


					this.setVelocityX(-this.speed);

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
					// }

					// this.body.world.velocityFromRotation(angle, this.speed + ship.body.speed, this.body.velocity);
					//this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);

					//this.body.velocity.x *= 2;
					//this.body.velocity.y *= 2;
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

  }

  preload() {

    //this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');

    //this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue007/';
    //this.load.crossOrigin = 'anonymous';

    this.load.image('background', 'img/space_bg_far.jpg');
    //this.load.image('foreground', 'img/fore.png');

    // player sprites
    this.load.image('player', 'img/ship.png');
		this.load.image('blaster', 'img/blaster.png');
		this.load.image('laser', 'img/laser.png');

    this.load.image('spark', 'img/blue.png');

    this.load.image('health', 'img/firstaid.png');
    this.load.image('coin', 'img/yellow_ball.png');

    this.load.image('box', 'img/steelbox.png');
    this.load.image('ufo', 'img/ufo3.png');
		this.load.image('ll', 'img/spark.png');

		this.load.audio('fire_laser', [ 'sounds/laser.ogg' ]);
		this.load.image('balls', 'img/balls.png');

    //this.load.image('tiles', 'img/tilemaps/slopes32mud.png');

    // A standard Weltmeister map with two layers: "map" & "collision"
    //this.load.tilemapImpact('map', 'img/impact3.json');

  }

  create() {


		this.add.image(0, 0, 'background').setOrigin(0);
		this.add.image(1366, 0, 'background').setOrigin(0);
		

		//this.cameras.main.setBackgroundColor('#ccccff'); 

		this.cameras.main.setBounds(0, 0, 1366 * 2, 768);
		this.physics.world.setBounds(0, 0, 1366 * 2, 768); 

		//this.background.autoScroll(-40, 0);
		//this.foreground = this.add.tileSprite(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, 'foreground');
		//this.foreground.autoScroll(-60, 0);


		this.player = new Player({ game: this });
		this.player.init();

    //this.setCollideWorldBounds(0, 0, 5000, 2000);

    //this.setBounds(0, 0, 5000, 2000);

    //this.background = this.add.tileSprite(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, 'background');
    //this.background.fixedToCamera = true;

    


   

    //var map = this.make.tilemap({ key: 'map' });

    // Name of tileset from Weltmeister map, name of image in Phaser cache
    //var tileset = map.addTilesetImage('media/tiles.png', 'tiles');


    // Name of layer from Weltmeister, tileset, x, y
    //var layer = map.createStaticLayer('map', tileset, 0, 0);

    // This will pull in the "collision" layer from the associated map
    // this.physics.world.setCollisionMap('map');

    
    var graphics = this.add.graphics();

		/*
    graphics.lineStyle(50, 0xffffff);

    graphics.beginPath();
    graphics.arc(400, 300, 200, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), false, 0.01);
    graphics.strokePath();
    graphics.closePath();

    graphics.beginPath();
    graphics.lineStyle(40, 0xff00ff);
    graphics.arc(400, 300, 200, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true, 0.01);
    graphics.strokePath();
		graphics.closePath();
		*/
	
    
    

    //this.player = this.physics.add.sprite(64, 200, 'player');
    // this.player.setBounce(1, 1);
    //this.player.setCollideWorldBounds(true);
    //this.player.setGravityY(0);

		/*
		var particles = this.add.particles('spark');

    this.em = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
		});
		
		this.em.startFollow(this.player.getSprite());    

		*/


    // this.physics.add.collider(block, staticBlock);
    // this.cursors = this.input.keyboard.createCursorKeys();

		/*
    this.bullets = this.physics.add.group({
        classType: this.Bullet,
        maxSize: 30,
        runChildUpdate: true
		});
		*/



		this.platforms = this.physics.add.staticGroup();

    for (var i=0; i<100; i++) {
			let box = this.platforms.create( 640 + i * 32, 32/2, 'box');
					box.setDisplaySize(32, 32).refreshBody();
		}

		for (var i=0; i<100; i++) {
			let box = this.platforms.create( 640 + i * 32, 48, 'box');
					box.setDisplaySize(32, 32).refreshBody();
		}

		for (var i=0; i<100; i++) {
			let box = this.platforms.create( 640 + i * 32, 80, 'box');
					box.setDisplaySize(32, 32).refreshBody();
		}

		for (var i=0; i<100; i++) {
			let box = this.platforms.create( 640 + i * 32, 360, 'box');
					box.setDisplaySize(32, 32).refreshBody();
		}

		for (var i=0; i<100; i++) {
			let box = this.platforms.create( 640 + i * 32, 392, 'box');
					box.setDisplaySize(32, 32).refreshBody();
		}




		for (var i=0; i<5; i++) {
			let box = this.platforms.create( 800, 160 + (i * 32), 'box');
					box.setDisplaySize(32, 32).refreshBody();
					box.lifespan = 3;
		}

		for (var i=0; i<5; i++) {
			let box = this.platforms.create( 832, 160 + (i * 32), 'box');
					box.setDisplaySize(32, 32).refreshBody();
					box.lifespan = 4;
		}

		for (var i=0; i<5; i++) {
			let box = this.platforms.create( 864, 160 + (i * 32), 'box');
					box.setDisplaySize(32, 32).refreshBody();
					box.lifespan = 5;
		}




		this.movableGroup = this.physics.add.group({
			key: 'balls',
			frameQuantity: 5,
			runChildUpdate: true
		});

		let j = 0;
		this.movableGroup.children.iterate(function (child) {
			
			child.setOrigin(0.5, 0.5 * (-j), true);
			child.setPosition(640 + (32 * j), 64 + (j * 32/2));

			j++;
	
		});
		
		

		this.enemiesBullets = this.physics.add.group({
			classType: this.EnemyBullet,
			maxSize: 200,
			runChildUpdate: true
		});
    


    //  Create 10 random health pick-ups
    this.itemsGroup = this.physics.add.staticGroup({
        key: 'health',
        frameQuantity: 10,
        immovable: true
		});


    var children = this.itemsGroup.getChildren();

    for (var i = 0; i < children.length; i++)
    {
        var x = Phaser.Math.Between(500, 2000);
        var y = Phaser.Math.Between(64, 640);

        children[i].setPosition(x, y);
    }

    this.itemsGroup.refresh();



    this.coinsGroup = this.physics.add.group({
        key: 'coin',
        repeat: 10,
        setXY: { x: 12, y: 300, stepX: 70 }
    });
    
    this.coinsGroup.children.iterate(function (child) {
    
        //child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });


    /*
    this.group = this.physics.add.group({
        width: 32,
        key: 'box',
        frameQuantity: 30,
        immovable: true
    });
    */

	
	/*
	 var particles = this.add.particles('spark');

	 this.emitter = particles.createEmitter({
			 x: 0,
			 y: 0,
			 angle: { min: 170, max: 190 },
			 speed: 500,
			 gravityY: 0,
			 lifespan: {
					 onEmit: (particle, key, t, value) => {
							 return Phaser.Math.Percent(this.player.body.speed, 0, 300) * 200;
					 }
			 },
			 alpha: {
					 onEmit: (particle, key, t, value) => {
							 return Phaser.Math.Percent(this.player.body.speed, 0, 500);
					 }
			 },
			 scale: { start: 0.6, end: 0 },
			 blendMode: 'ADD'
	 });
	 
	 this.emitter.startFollow(this.player);

	 */


    // add some fucking enemies
		this.enemies = this.physics.add.group();
		

		// this.boss = new Boss({ game: this });



    // Phaser.Actions.PlaceOnRectangle(this.group.getChildren(), new Phaser.Geom.Rectangle(84, 84, 616, 416));
		this.physics.add.collider(this.player.getSprite(), this.platforms, this.playerHitPlatform.bind(this));
		
		this.physics.add.collider(this.player.getSprite(), this.enemies, this.playerHitEnemy.bind(this));

    this.physics.add.overlap(this.player.getSprite(), this.itemsGroup, this.itemHit.bind(this));

    this.physics.add.overlap(this.player.getSprite(), this.coinsGroup, this.collectCoin.bind(this));

    this.physics.add.overlap(this.player.bullets, this.platforms, this.platformHit.bind(this));

		this.physics.add.overlap(this.player.bullets, this.enemies, this.enemyHit.bind(this));
		
		this.physics.add.overlap(this.player.getSprite(), this.enemiesBullets, this.bulletHitPlayer.bind(this));

		this.physics.add.overlap(this.enemiesBullets, this.platforms, this.bulletHitPlatform.bind(this));

		this.physics.add.overlap(this.player.getSprite(), this.movableGroup, this.playerHitMovableObject.bind(this));




		this.hud = new HUD({ game: this });
		this.hud.init();



		this.explodeEmitter = this.add.particles('spark').createEmitter({
			x: 400,
			y: 400,
			quantity: 25,
			speed: { min: -800, max: 800 },
			angle: { min: 0, max: 360 },
			//scale: { start: 2, end: 0 },
			blendMode: 'ADD',
			//active: false,
			lifespan: 350,
			gravityY: 0
		});

  }

  update (time, delta) {

    if (this.secondsElapsed != Math.round( (time) / 1000) ) {

			this.secondsElapsed++;
			
			// console.log('second', this.secondsElapsed);

			let enemy = this.enemies.create(this.cameras.main.scrollX + this.cameras.main.width, Phaser.Math.Between(50, 400), 'ufo');
			enemy.displayWidth = 32;
			enemy.displayHeight = 32;
			enemy.startTime = time;
			enemy.lastFired = 0;
			enemy.fireRate = 5000;


			this.enemies.children.iterate((enemy) => {
				
				enemy.setVelocityX(-50);
				
			});

    }

    this.enemies.children.iterate((enemy) => {
            
			enemy.setAngle(time * 0.1);

			if (time > enemy.lastFired && (enemy.startTime + 3000) <= time ) {

				var bullet = this.enemiesBullets.get();
				console.log('enemy firing', bullet);

				if (bullet)	{
						bullet.fire(enemy);
						enemy.lastFired = time + enemy.fireRate;
				}

			}
			
		});
		


		this.movableGroup.children.iterate( (object) => {
            
			// object.setAngle(time * 0.2);
			// object.rotation = time * 0.01;
			// console.log(object);
			// object.refreshBody();
			
		});
		


    this.cameras.main.scrollX += 1;
    //this.cameras.main.setBounds(this.cameras.main.scrollX, 0, 1366 * 2, 768);
    //this.physics.world.setBounds(this.cameras.main.scrollX, 0, 1366 * 2, 768); 

    // console.log(this.cameras.main.scrollX);
    // this.physics.world.collide(this.player, this.group);

    //this.background.x -= 0.35;
    //this.foreground.x -= 0.55;		

		this.player.update(time);

	}
	


	gameover () {

		this.event('gameover');
		this.scene.start('GameOver');

	}

	// shortened function for global scene events
	event (which) {

		this.events.emit( which );

	}


	playerHitPlatform (player, platform) {

		let playerPos = player.x;
		let platformPos = platform.x;

		console.log(playerPos, platformPos);

		if (platformPos - playerPos <= 32) {
			// this.player.die();
		}

	}



	playerHitEnemy (player, enemy) {

		console.log('player met enemy', enemy);

		this.cameras.main.shake(450);

		enemy.destroy();

		this.player.addDestroyedEnemy(1);
		this.hud.updateText('enemies', this.player.getEnemiesDestroyed());

		this.player.addHealth(-25);
		this.hud.updateText('health', this.player.getHealth());
	}


  itemHit (sprite, item) {

    console.log('item was hit', sprite, item);
    
    //  Hide the sprite
    this.itemsGroup.killAndHide(item);

    //  And disable the body
    item.body.enable = false;

    //  Add 10 health, it'll never go over maxHealth
    // this.currentHealth = Phaser.Math.MaxAdd(currentHealth, 10, maxHealth);
  }


  collectCoin (sprite, item) {

    console.log('collecting a coint', sprite, item);
    
    this.coinsGroup.killAndHide(item);

    item.body.enable = false;
		
		this.player.addCoins(1);
		this.hud.updateText('coins', this.player.getCoins());

  }

	/**
	 * The Players BUllet hit a platform
	 * @param {*} bullet 
	 * @param {*} item 
	 */
  platformHit (bullet, platform) {

		if (platform.lifespan > 0) {
			platform.setAlpha(1 - 1/platform.lifespan);
			platform.lifespan--;
		}

		if (platform.lifespan <= 0)
			this.platforms.remove(platform);

    console.log('platform hit', bullet, platform);

    this.player.bullets.killAndHide(bullet);
    bullet.remove();

  }


  enemyHit (bullet, enemy) {

    //console.log('enemy hit', bullet);

    this.player.bullets.killAndHide(bullet);
    //bullet.kill();

    bullet.remove();
		enemy.destroy();
		

		//this.explodeEmitter.setPosition(enemy.x, enemy.y);
		//this.explodeEmitter.explode();

	
		var particles = this.add.particles('balls');

		var emitter1 = particles.createEmitter({
			x: enemy.x,
			y: enemy.y,
			speed: 1000,
			angle: {min: 0, max: 360},
			quantity: 100,
			blendMode: 'ADD',
			lifespan: 10000
		}); 

		emitter1.explode();
		


		this.player.addPoints(10);
		this.hud.updateText('points', this.player.getPoints());

		this.player.addDestroyedEnemy(1);
		this.hud.updateText('enemies', this.player.getEnemiesDestroyed());

	}
	

	bulletHitPlayer (player, bullet) {

		//console.log('bullet hit player', bullet, player);

		this.enemiesBullets.killAndHide(bullet);
		
		if (bullet)
			bullet.remove();


		this.cameras.main.shake(450);

		this.player.addHealth(-10);
		this.hud.updateText('health', this.player.getHealth());

	}


	bulletHitPlatform (bullet, item) {

		this.enemiesBullets.killAndHide(bullet);
    bullet.remove();

	}


	playerHitMovableObject (player, object) {

		console.log(player, object);
		this.player.isAlive = false;

	}

}

