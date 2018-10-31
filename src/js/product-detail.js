import $ from "jquery";

import Modernizr from 'modernizr';

import '../css/magnific-popup.css';

import AppPreloader from './app_preloader.js';
import TransitionEffect from './lib/transition_effect.js';
import EaselJS from './lib/easeljs.js';
import MagnificPopUp from './lib/jquery.magnific-popup.min.js';

$(document).ready( function()
{
    const productDetail = new ProductDetail();
});

function ProductDetail()
{
    this.hasVisited = true;
    this.appPreloader = null;               // @AppPreloader
    this.transition = null;                 // @TransitionEffect

    this.initialize();
}

ProductDetail.prototype.initialize = function()
{
    console.log("ProductDetail.initialize");

    const ref = this;

    // init transition
    this.transition = new TransitionEffect();

    // start progress loader
    this.appPreloader = new AppPreloader(this);
    this.appPreloader.initialize();

    // start lightbox
    this.setMagnificPopUp();

    // add resize event
    $(window).on('resize.aboutview', this.onResize.bind(this));
};

ProductDetail.prototype.setMagnificPopUp = function()
{
    const lightBox = $('.lightbox');

    if (lightBox.length)
    {
        lightBox.magnificPopup(
        {
            type:'image',
            gallery:{enabled:true},
            zoom:{enabled: true, duration: 300}
        });

    }
};

ProductDetail.prototype.onResize = function(event)
{
    this.updateHeader();
    this.updateFooter();
};

ProductDetail.prototype.appPreloaderComplete = function()
{
    console.log("ProductDetail.appPreloaderComplete");

    this.startPreloaderOutTransition();
};

ProductDetail.prototype.startPreloaderOutTransition = function()
{
    console.log("ProductDetail.startPreloaderOutTransition");

    $('.preloader').fadeOut();

    this.prepareTransition();
    this.initializeMenuItems();

    this.onResize();
};

ProductDetail.prototype.prepareTransition = function()
{
    this.transition.startSequence();

    const page = $(".page-title .title").text();

    $( ".page-title").append("<span></span>");
    $( ".page-title span").append(page);

};

ProductDetail.prototype.initializeMenuItems = function()
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

ProductDetail.prototype.onScrollBackToTopClick = function(event)
{
    $('body,html').animate({ scrollTop: $('body').scrollTop() }, 800);
};

ProductDetail.prototype.subMenuButtonClick = function(event)
{
    $('li.hassub a').not(this).next('ul').slideUp();
    $(this).next('ul').slideToggle();
};

ProductDetail.prototype.menuButtonClick = function(event)
{
    $(this).toggleClass('modal-close');
};

ProductDetail.prototype.onScroll = function(event)
{

};

ProductDetail.prototype.updateHeader = function()
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

ProductDetail.prototype.updateFooter = function()
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

ProductDetail.prototype.destroy = function()
{
    // cleanup

    $(window).off('resize.aboutview');

    $('.li.hassub .arrow').off('click.submenuarrow');
    $('.nav-icon').off('click.menubutton');

    $('.uptotop').off('click.uptotop');
};