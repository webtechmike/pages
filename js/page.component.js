(function(){
    'use strict';

    var app = angular.module('App');

    function controller(){
        var model = this;

        model.text = "Got something to say?";
    }


    app.component('page', {
        templateUrl: 'tpls/page.component.html',
        controllerAs: 'model',
        controller: [controller]
    });
})();
