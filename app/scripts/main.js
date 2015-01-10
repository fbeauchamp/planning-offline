/*global require*/
'use strict';

require.config({
    shim: {

        bootstrap: {
            deps: [
                'jquery'
            ]
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',

        requirejs: '../bower_components/requirejs/require',
        modernizr: '../bower_components/modernizr/modernizr',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        mustache: '../bower_components/mustache/mustache'

    }
});

require([
    'backbone',
    'jquery',
    'routes/main-route',
    'bootstrap'
], function (Backbone) {
    Backbone.history.start();
});
