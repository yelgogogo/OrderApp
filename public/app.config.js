'use strict';
require.config({
    paths:{
        'jquery': 'http://cdn.bootcss.com/jquery/1.12.4/jquery.min',
        'bootstrap': 'http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min',
        'angular': 'http://cdn.bootcss.com/angular.js/1.5.7/angular.min',
        'angular-route': 'http://cdn.bootcss.com/angular.js/1.5.0/angular-route',
        'angular-resource':'http://cdn.bootcss.com/angular-resource/1.5.0/angular-resource',
        'uiSwitch':'libs/angular-ui-switch',
        'controllers':'controllers/controllers',
        'filters': 'filters/filters',
        'directives': 'directives/directives',
        'services':'services/services',
        'factories': 'services/factories',
        'data':'model/data'
    },
    map:{
      
    },
    shim:{
        jquery:{
            exports:'jquery'
        },
        bootstrap:{
          deps:[
              'jquery'
          ],
          exports: 'bootstrap'
        },
        angular:{
            exports:'angular'
        },
        'angular-route':{
            deps: ['angular']
        },
        'angular-resource':{
            deps: ['angular']
        },
        'uiSwitch': {
            deps: ['angular']
        }
    },
    waitSeconds:0,
    // urlArgs: 't=' + (new Date()).getTime()
});

function createStyleSheet(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href= url;
    document.getElementsByTagName('head')[0].appendChild(link);
}


function loadCss(urls) {
    for(var i = 0;i < urls.length;i++) {
        createStyleSheet(urls[i]);
    }
}

loadCss([
    'libs/bootstrap.min.css',
    'libs/angular-ui-switch.css',
    'css/styles.css',
]);

require(['angular','app'],function(angular,app){
    //angularjs start
    angular.bootstrap(document,['BarbecueShop']);
});