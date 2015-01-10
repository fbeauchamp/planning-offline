/*global define*/

define([
    'jquery',
    'backbone',
    'views/main-view'
], function ($, Backbone,View) {
    'use strict';

    var MainRouteRouter = Backbone.Router.extend({
        routes: {}

    });

    var view = new View({el:'#app'});
    console.log($('#app'))
    view.render();
    return MainRouteRouter;
});
