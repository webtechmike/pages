(function(){
    'use strict';

    var app = angular.module('App');

    function controller(){
        var model = this;

        console.log('This', this);
    }


    app.component('page', {
        templateUrl: 'tpls/page.component.html',
        controllerAs: 'model',
        controller: [controller]
    });
})();
