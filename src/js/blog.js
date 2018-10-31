import $ from "jquery";

import Modernizr from 'modernizr';

import AppPreloader from './app_preloader.js';
import TransitionEffect from './lib/transition_effect.js';
import EaselJS from './lib/easeljs.js';


$(document).ready( function()
{
    const blog = new Blog();
});

function Blog()
{
    this.hasVisited = true;
    this.appPreloader = null;               // @AppPreloader
    this.transition = null;                 // @TransitionEffect

    this.initialize();
}

Blog.prototype.initialize = function()
{
    console.log("Blog.initialize");

    const ref = this;

    // init transition
    this.transition = new TransitionEffect();

    // start progress loader
    this.appPreloader = new AppPreloader(this);
    this.appPreloader.initialize();

    // add resize event
    $(window).on('resize.aboutview', this.onResize.bind(this));
};

Blog.prototype.onResize = function(event)
{
    this.updateHeader();
    this.updateFooter();
};

Blog.prototype.appPreloaderComplete = function()
{
    console.log("Blog.appPreloaderComplete");

    this.startPreloaderOutTransition();
};

Blog.prototype.startPreloaderOutTransition = function()
{
    console.log("Blog.startPreloaderOutTransition");

    $('.preloader').fadeOut();

    this.prepareTransition();
    this.initializeMenuItems();

    this.onResize();
};

Blog.prototype.prepareTransition = function()
{
    this.transition.startSequence();

    const page = $(".page-title .title").text();

    $( ".page-title").append("<span></span>");
    $( ".page-title span").append(page);

};

Blog.prototype.initializeMenuItems = function()
{
    // update sub menu items
    $(".hassub ul").hide();

    // set button events

    // sub menu arrow and main menu button
    $('.li.hassub .arrow').on('click.submenuarrow', this.subMenuButtonClick.bind(this));
    $('.nav-icon').on('click.menubutton', this.menuButtonClick.bind(this));

    // up to top button
    $('.uptotop').on('click.uptotop', this.onScrollBackToTopClick.bind(this));
};

Blog.prototype.onScrollBackToTopClick = function(event)
{
    $('body,html').animate({ scrollTop: $('body').scrollTop() }, 800);
};

Blog.prototype.subMenuButtonClick = function(event)
{
    $('li.hassub a').not(this).next('ul').slideUp();
    $(this).next('ul').slideToggle();
};

Blog.prototype.menuButtonClick = function(event)
{
    $(this).toggleClass('modal-close');
};

Blog.prototype.onScroll = function(event)
{

};

Blog.prototype.updateHeader = function()
{
    const main = $('.main');
    const content = $('.content');
    const homeHeight = $(window).height();

    main.css({
        "height": homeHeight + "px"
    });
    content.css({
        "margin-top":  homeHeight + "px"
    });
};

Blog.prototype.updateFooter = function()
{
    const win = $(window);
    const body = $('body');
    const footer = $('footer');

    if (footer.height() < win.height())
    {
        body.css({
            "padding-bottom": footer.height() + "px"
        });
        footer.css({
            "position": 'fixed'
        });
    }
    else
    {
        body.css({
            "padding-bottom": '0'
        });
        footer.css({
            "position": 'relative'
        });
    }
};

Blog.prototype.destroy = function()
{
    // cleanup

    $(window).off('resize.aboutview');

    $('.li.hassub .arrow').off('click.submenuarrow');
    $('.nav-icon').off('click.menubutton');

    $('.uptotop').off('click.uptotop');
};