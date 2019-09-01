// load framework logic
//import Global     from './framework/global';
//import Language   from './framework/language';
//import Test       from './framework/test';
//import Game       from './app/modules/game';


//import TooltipComponent from './app/game/components/tooltip';


//import CirclePathMerge from './app/tests/circlePathMerge';
//import ChartManager from './app/chart/chartmanager';


import $ from 'jquery';


const _modules = [];
import Game from './game/game';
//import Game from './app/modules/game';

//_modules.combat = Combat;
_modules.game = Game;

export default class App { 


  constructor () {

    // this.global = new Global();
    this.init();

  }


  init () {

    console.log('init App');

    // init global framework data
    // this.language = new Language();

    this.game = new Game();
    this.game.init();

    //this.circlePathMerge = new CirclePathMerge({ circles: 2 });
    //this.circlePathMerge.init();

    //this.chartManager = new ChartManager();

    //this.tooltipComponent = new TooltipComponent({ app: this });
    //this.tooltipComponent.init();

    // load the app specific Game
    //if (window.location.href.indexOf('map.php') > -1)
      //this.game = new Game({ app: this });


    this.getNodes();

  }



  getNodes() {

    $('[data-module]').each((i, node) => {

      let module = $(node).data('module');

      if (typeof _modules[module] !== undefined) {

        try {
          
          new (_modules[module])({ app: this, node: node });

        } catch (e) {

          console.warn('module ' + module + ' could not be called', e);

        }

      }

    });

  }


};

new App();
