/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/main.mustache',

], function ($, _, Backbone, Mustache, template) {
    'use strict';

    Date.prototype.getWeekNumber = function(){
        var d = new Date(+this);
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
    };
    Date.prototype.getMonday = function(){
            var d = new Date(+this);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
            return new Date(d.setDate(diff));

    };
    var days=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
        months =['Janvier','Février' ,'Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Décembre'];


    var transform_prop = window.Modernizr.prefixed('transform'),
        transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function () {
            var props = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd otransitionend',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            };
            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
        })();


    var MainViewView = Backbone.View.extend({
        template: template,
        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .open-btn': 'toggleNav',
            'click .close-btn': 'toggleNav',
            'click': function (e) {
                if (this.nav_open && !$(e.target).parents('nav')) {
                    e.preventDefault();
                    this.closeNav();
                }
            },
            'click .day .add': function(e){
                console.log(' open modal ')
                var $target = $(e.target);
                if(!$target.hasClass('btn')){
                    $target = $($target.parent());
                }
                var date = new Date($target.data('date')),
                    readable_date = days[ (date.getDay()+6)%7];
                this.selected_date = date;

                readable_date+=' '+date.getDate();
                readable_date+=' '+months[date.getMonth()];
                readable_date+=' '+ date.getFullYear();
                this.$('.date-container').text(readable_date);
                console.log($target.data('date'))

            },
            'click #modal-add-constraint .btn-primary': function(e){
                console.log(' add  constraint')
                var constraints;
                try{
                    constraints = JSON.parse(localStorage.getItem('constraints')) || [];
                }catch (e){
                    constraints =[];
                }
                constraints.push({
                    label:this.$('#modal-add-constraint input[name=label]').val(),
                    level:this.$('#modal-add-constraint select[name=level]').val(),
                    date:this.selected_date
                });
                localStorage.setItem('constraints',JSON.stringify(constraints));
                this.render();
            }

        },
        toggleNav: function (e) {
            console.log('toggle nav')

            if (this.nav_open && $(this.$el).hasClass('js-nav')) {
                this.closeNav();
            } else {
                this.openNav();
            }
            if (e) {
                e.preventDefault();
            }
        },
        openNav: function () {

            if (this.nav_open) {
                return;
            }
            this.$el.addClass('js-nav')
            this.nav_open = true;
        },
        closeNav: function () {
            var that = this;
            console.log('close nave ')

            if (this.nav_open) {
                // close navigation after transition or immediately
                var duration = (transition_end && transition_prop) ? parseFloat(this.$('#inner-wrap').css(transition_prop + 'Duration')): 0;
                if (duration > 0) {

                    this.el.addEventListener(transition_end, function(){
                        that.closeNavEnd()
                    }, false);
                } else {
                    that.closeNavEnd(null);
                }
            }
            this.$el.removeClass('js-nav')

        },
        closeNavEnd: function (e) {
            if (e && e.target === this.el.getElementById('inner-wrap')) {
                this.el.removeEventListener(transition_end)
            }
            this.nav_open = false;
        },
        initialize: function () {
           // this.listenTo(this.model, 'change', this.render);
            this.nav_open = false;
        },

        render: function () {
            var json  ={};
            var constraints
            try{
                constraints = JSON.parse(localStorage.getItem('constraints')) ||[];
            }catch (e){
                constraints =[];
            }
            constraints = _.map(constraints, function(constraint){
                constraint.date = new Date(constraint.date);
                return constraint;
            })
            json.week_number = new Date().getWeekNumber();
            json.week = []
            var  monday = new Date().getMonday();
            for( var i = 0 ; i < 7 ; i ++){
                var d = new Date(+monday + i*24*60*60*1000),
                    start = new Date(+d).setHours(0,0,0),
                    end = new Date(+d).setHours(23,59,59);
                console.log( d.getMonth())
                json.week.push({
                    label : days[i],
                    date:d,
                    dayofmonth: d.getDate(),
                    month: d.getMonth(),
                    monthlabel:months[ d.getMonth()],
                    year: d.getFullYear(),
                    constraints: _.filter(constraints, function(constraint){
                         return constraint.date >= start && constraint.date <= end
                    })
                })
            }
            console.log(json.week)
            this.$el.html(Mustache.render(this.template,json));
            this.$el.addClass('js-ready')


        }
    });

    return MainViewView;
});
