import $ from "jquery";

import 'modernizr';
import './lib/easeljs.js';
import './lib/slick.min.js';
import '../css/about.css';
import '../css/slick.css';

import AppPreloader from './app_preloader.js';
import TransitionEffect from './lib/transition_effect.js';

$(document).ready( function()
{
    const about = new About();
});

function About()
{
    this.hasVisited = true;
    this.appPreloader = null;               // @AppPreloader
    this.transition = null;                 // @TransitionEffect

    this.initialize();
}

About.prototype.initialize = function()
{
    console.log("About.initialize");

    const ref = this;

    // init transition
    this.transition = new TransitionEffect();

    // start progress loader
    this.appPreloader = new AppPreloader(this);
    this.appPreloader.initialize();

    // add resize event
    $(window).on('resize.aboutview', this.onResize.bind(this));
};

About.prototype.onResize = function(event)
{
    this.updateHeader();
    this.updateFooter();
};

About.prototype.appPreloaderComplete = function()
{
    console.log("About.appPreloaderComplete");

    this.startPreloaderOutTransition();
};

About.prototype.startPreloaderOutTransition = function()
{
    console.log("About.startPreloaderOutTransition");

    $('.preloader').fadeOut();

    this.prepareTransition();
    this.initializeMenuItems();
    this.initSlider();

    this.onResize();
};

About.prototype.initSlider = function()
{
    $('.edu_slider').slick({

        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        dots: false,
        autoplaySpeed: 3000,
        infinite: false,
        arrows: true,
        vertical: true,
        centerMode: true,
        verticalSwiping: true,
        mobileFirst: true,
        touchMove: false,
        swipe: false,
        centerPadding: '0px',
        nextArrow: '<i class="far fa-calendar-minus arrow_up"></i>',
        prevArrow: '<i class="far fa-calendar-plus arrow_dwn"></i>',
    });
};

About.prototype.prepareTransition = function()
{
    this.transition.startSequence();

    const page = $(".page-title .title").text();

    $( ".page-title").append("<span></span>");
    $( ".page-title span").append(page);

};

About.prototype.initializeMenuItems = function()
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

About.prototype.onScrollBackToTopClick = function(event)
{
    $('body,html').animate({ scrollTop: $('body').scrollTop() }, 800);
};

About.prototype.subMenuButtonClick = function(event)
{
    $('li.hassub a').not(this).next('ul').slideUp();
    $(this).next('ul').slideToggle();
};

About.prototype.menuButtonClick = function(event)
{
    $(this).toggleClass('modal-close');
};

About.prototype.onScroll = function(event)
{

};

About.prototype.updateHeader = function()
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

About.prototype.updateFooter = function()
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

About.prototype.destroy = function()
{
    // cleanup

    $(window).off('resize.aboutview');

    $('.li.hassub .arrow').off('click.submenuarrow');
    $('.nav-icon').off('click.menubutton');

    $('.uptotop').off('click.uptotop');
};