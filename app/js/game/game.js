import Phaser       from 'phaser';

import StartScene   from './scenes/startscene';
import GameScene    from './scenes/gamescene';
import GameOver     from './scenes/gameover';


export default class Game {

  constructor() {
    
  }


  init () {

    const config = {
      // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
      type: Phaser.AUTO,
      pixelArt: true, // removes antialiasing and performance increase
      roundPixels: true,
      autoResize: true, // does that work actually ??
      parent: 'content',
      resolution: window.devicePixelRatio || 1,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
        }
      },
      scene: [
        StartScene,
        GameScene,
        GameOver
      ]
    };
    
    const game = new Phaser.Game(config);

  }

}
