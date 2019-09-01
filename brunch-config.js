module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': [
          'node_modules/process/browser.js',
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/phaser/dist/phaser.min.js',
        ],
        'js/app.js': /^app\/js/
      },
      order: {
        before: [
          'app/vendor/js/jquery-3.2.1.min.js',
          //'app/vendor/js/d3.v5.js',
          //'app/vendor/js/d3-geo.v1.min.js',
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'css/app.css': /^app\/stylus\/app.styl/
      }
    }
  },

  plugins: {
    babel: {
      presets: ['es2015', 'es2016']
    },
    stylus: {
      includeCss: true
    },
    cleancss: {
      keepSpecialComments: 0,
      removeEmpty: true
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 8 versions']),
        require('csswring')
      ]
    }
  },

  npm: {
    enabled: true
  }

};
