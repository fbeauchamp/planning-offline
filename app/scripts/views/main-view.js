/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/main.mustache',

], function ($, _, Backbone, Mustache, template) {
    'use strict';
// helper functions

    var trim = function (str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    };

    var hasClass = function (el, cn) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function (el, cn) {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function (el, cn) {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };

    var hasParent = function (el, id) {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while ((el = el.parentNode));
        }
        return false;
    };
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
            console.log('open  nav');

            if (this.nav_open) {
                return;
            }
            console.log('add class')
            this.$el.addClass('js-nav')
            this.nav_open = true;
        },
        closeNav: function () {
            var that = this;
            console.log('close nave ')

            if (this.nav_open) {
                // close navigation after transition or immediately
                console.log(this.$('#inner-wrap').css(transition_prop + 'Duration'))
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
            console.log('close nave end')
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
            this.$el.html(Mustache.render(this.template));
            this.$el.addClass('js-ready')
            /*!
             *
             *  Copyright (c) David Bushell | http://dbushell.com/
             *
             */


            // normalize vendor prefixes

            var doc = document.documentElement;


            var _init = false, app = {};
/*
            var inner = document.getElementById('inner-wrap'),

                nav_open = false,

                nav_class = 'js-nav';


            app.init = function () {
                console.log('init')
                if (_init) {
                    return;
                }
                _init = true;

                var closeNavEnd = function (e) {
                    console.log('close nave end')
                    if (e && e.target === inner) {
                        document.removeEventListener(transition_end, closeNavEnd, false);
                    }
                    nav_open = false;
                };

                app.closeNav = function () {
                    console.log('close nave ')

                    if (nav_open) {
                        // close navigation after transition or immediately
                        var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                        if (duration > 0) {
                            document.addEventListener(transition_end, closeNavEnd, false);
                        } else {
                            closeNavEnd(null);
                        }
                    }
                    removeClass(doc, nav_class);
                };

                app.openNav = function () {
                    console.log('open  nav');

                    if (nav_open) {
                        return;
                    }
                    addClass(doc, nav_class);
                    nav_open = true;
                };

                app.toggleNav = function (e) {
                    console.log('toggle nav')

                    if (nav_open && hasClass(doc, nav_class)) {
                        app.closeNav();
                    } else {
                        app.openNav();
                    }
                    if (e) {
                        e.preventDefault();
                    }
                };

                // open nav with main "nav" button
                document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);

                // close nav with main "close" button
                document.getElementById('nav-close-btn').addEventListener('click', app.toggleNav, false);

                // close nav by touching the partial off-screen content
                document.addEventListener('click', function (e) {
                        if (nav_open && !hasParent(e.target, 'nav')) {
                            e.preventDefault();
                            app.closeNav();
                        }
                    },
                    true);

                addClass(doc, 'js-ready');

            };
            app.init();
*/
        }
    });

    return MainViewView;
});
