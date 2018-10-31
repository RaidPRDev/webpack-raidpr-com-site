import $ from "jquery";

/*const jQueryBridget = require('jquery-bridget');
const Isotope = require('isotope-layout');
require('isotope-packery');
jQueryBridget( 'isotope', Isotope, $ );

const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin( $ );
*/

import 'modernizr';
import './lib/easeljs.js';
import '../css/home.css';
import '../css/slick.css';

import CookieHandler from './lib/cookie_handler';
import AppPreloader from './app_preloader.js';
import IntroTypedSequence from './lib/intro_sequence.js';
import TransitionEffect from './lib/transition_effect.js';
import HelixCanvas from './lib/helix_canvas.js';
import RippleEffect from "./lib/ripple";
import QuoteSlider from './lib/quote_slider.js';

$(document).ready( function()
{
    const home = new Home();
});

function Home()
{
    this.hasVisited = true;
    this.cookieHandler = null;              // @CookieHandler
    this.appPreloader = null;               // @AppPreloader
    this.transition = null;                 // @TransitionEffect
    this.introTypedSequence = null;         // @IntroTypedSequence
    this.typedInitSequence = null;          // @Typed
    this.typedInitSequenceB = null;         // @Typed
    this.helixCanvas = null;                // @HelixCanvas
    this.quoteSlider = null;                // @QuoteSlider

    this.initialize();
}

Home.prototype.initialize = function()
{
    console.log("Home.initialize");

    const ref = this;

    this.transition = new TransitionEffect();

    // start progress loader
    this.appPreloader = new AppPreloader(this);
    this.appPreloader.initialize();     // Resets cookies = true

    this.cookieHandler = new CookieHandler(this);
    this.hasVisited = this.cookieHandler.checkCookie('home');

    // add resize and scroll events
    $(window).on('resize.homeview', this.onResize.bind(this));
    $(window).on('scroll.homeview', this.onScroll.bind(this));
};

Home.prototype.onResize = function(event)
{
    this.updateHeader();
    this.updateFooter();
};

Home.prototype.appPreloaderComplete = function()
{
    console.log("Home.appPreloaderComplete");

    if (this.hasVisited) this.startPreloaderOutTransition();
    else
    {
        // initialize intro sequence
        this.helixCanvas = new HelixCanvas("target");
        this.introTypedSequence = new IntroTypedSequence(this);
        this.introTypedSequence.start();
    }
};

// start OS
Home.prototype.startTypedSequenceComplete = function(currIndex)
{
    console.log("startTypedSequenceComplete.currIndex:", currIndex);

    // sequence id is returned from @TypedSequence
    switch (currIndex)
    {
        case 0:             // initialize OS
            break;

        case 1:             // start OS
            break;

        case 2:             // start software command
            this.helixCanvas.setupHelix();
            break;

        case 3:             // run project
            this.helixCanvas.targetSpeed = 3;
            break;

        case 4:             // analyzing project
            break;

        case 5:             // begin project
            this.helixCanvas.destroy();
            this.startPreloaderOutTransition();
            break;
    }
};

Home.prototype.startPreloaderOutTransition = function()
{
    console.log("Home.startPreloaderOutTransition");

    this.initializeIsoImages();
    this.prepareTransition();
    this.initializeMenuItems();
    this.onResize();
    this.scalePageHeader();

    // initialize quote slider
    this.quoteSlider = new QuoteSlider();

    this.ripple = new RippleEffect('.main');

    $('.preloader').fadeOut();
};

Home.prototype.prepareTransition = function()
{
    this.transition.startSequence();

    const page = $(".page-title .title").text();

    $( ".page-title").append("<span></span>");
    $( ".page-title span").append(page);

};

Home.prototype.initializeMenuItems = function()
{
    //  social icons: update layout padding
    $( ".page-menu li:not(.social) a, .portfolio_filter ul li a").append( "<span></span>" );

    // update sub menu items
    $(".hassub ul").hide();

    // set button events

    // sub menu arrow and main menu button
    $('.li.hassub .arrow').on('click.submenuarrow', this.subMenuButtonClick.bind(this));
    $('.nav-icon').on('click.menubutton', this.menuButtonClick.bind(this));

    // header down arrow button
    $('.down-arrow').on('click.downarrow', this.onHeaderDownArrowClick.bind(this));

    // up to top button
    $('.uptotop').on('click.uptotop', this.onScrollBackToTopClick.bind(this));
};

Home.prototype.onScrollBackToTopClick = function(event)
{
    $('body,html').animate({ scrollTop: $('body').scrollTop() }, 800);
};

Home.prototype.onHeaderDownArrowClick = function(event)
{
    $('body,html').animate({ scrollTop: $('.main').height() - 20 }, 800);
};

Home.prototype.subMenuButtonClick = function(event)
{
    $('li.hassub a').not(this).next('ul').slideUp();
    $(this).next('ul').slideToggle();
};

Home.prototype.menuButtonClick = function(event)
{
    $(this).toggleClass('modal-close');
};

Home.prototype.onScroll = function(event)
{
    // we will use onscroll to handle the header scale
    const scrollTop = $(window).scrollTop();
    const mainBodyHeight = $(".main").height();
    const contentHeight = $(".content").height();
    const vf = $('.vf');

    // check position to see if we show the header
    if (scrollTop + mainBodyHeight / 1.5 > mainBodyHeight - 1 )
        vf.addClass("show");
    else
        vf.removeClass("show");

    if (scrollTop + mainBodyHeight > mainBodyHeight + contentHeight )
        vf.addClass("fix");
    else
        vf.removeClass("fix");

    this.scalePageHeader();
};

Home.prototype.updateHeader = function()
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

Home.prototype.scalePageHeader = function()
{
    const main = $('.main');
    const scrollPos =  window.pageYOffset || document.documentElement.scrollTop;

    // larger displays
    if ($(window).width() > 481)
    {
        const opacity = (1 - (scrollPos / 20) / 19);

        main.css({
            'transform': 'scale('+(100 - scrollPos / 100) / 100+')',
            'opacity' : opacity
        })

        if (opacity <= 0) main.css("visibility", "hidden");
        else main.css("visibility", "visible");
    }
    else
    {
        main.css({
            'transform': 'scale('+(100 - scrollPos / 100) / 99+')',
            'opacity' : (1 - (scrollPos / 20) / 15)
        })
    }
};

Home.prototype.updateFooter = function()
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

Home.prototype.initializeIsoImages = function()
{
    const isotopeItems = $('.isotope_items');
    const ref = this;

    if (isotopeItems.length)
    {
        jQuery( function()
        {
            isotopeItems.imagesLoaded( function()
            {
                isotopeItems.isotope(
                {
                    layoutMode: 'packery',
                    itemSelector: '.single_item',
                    gutter:0,
                    transitionDuration: "0.5s",
                    columnWidth: '.single_item'
                });
            })
        });
    }

    // filter open click
    $('.portfolio_filter').on('click.pfilteropen', this.onPortfolioFilterClick.bind(this));

    // add click to the items
    $('.portfolio_filter ul li a').on('click.portfolioitem', this.onPortfolioItemClick.bind(this));

    // filter button
    $('.vf').on('click.pfilter', this.onPortfolioFilterMenuClick.bind(this));
};

Home.prototype.onPortfolioFilterClick = function(event)
{
    if (!$(event.target).is(".portfolio_filter ul li a"))
    {
        $('.portfolio_filter').removeClass('show');

        return false;
    }
};

Home.prototype.onPortfolioFilterMenuClick = function(event)
{
    $('.portfolio_filter').addClass('show');
};

Home.prototype.onPortfolioItemClick = function(event)
{
    const isotopItems = $('.isotope_items');

    $('body,html').animate({scrollTop: isotopItems.offset().top - 30}, 800);
    $(".portfolio_filter ul li a").removeClass("select-cat");
    $(event.target).addClass("select-cat");

    const selector = $(event.target).attr('data-filter');

    isotopItems.isotope(
    {
        filter: selector,
        animationOptions:
        {
            duration: 750,
            easing: 'linear',
            queue: false,
        }
    });

    return false;
};

Home.prototype.destroy = function()
{
    // cleanup

    $(window).off('resize.homeview');
    $(window).off('scroll.homeview');

    $('.li.hassub .arrow').off('click.submenuarrow');
    $('.nav-icon').off('click.menubutton');

    $('.down-arrow').off('click.downarrow');
    $('.uptotop').off('click.uptotop');
};