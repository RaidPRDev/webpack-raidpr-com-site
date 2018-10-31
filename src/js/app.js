import '../css/bootstrap.min.css';
import '../css/reset.css';
import '../css/styles.css';
import '../css/responsive.css';

import $ from "jquery";

$(document).ready( function()
{
    const app = new App();
});

function App()
{
    this.initialize();
}

App.prototype.initialize = function()
{
    console.log("App.initialize");

    this.updateHeader();

    // add resize & scroll events
    $(window).on('resize.appview', this.onResize.bind(this));
    $(window).on('scroll.appview', this.onScroll.bind(this));
};

App.prototype.onResize = function(event)
{

};

App.prototype.onScroll = function(event)
{
    this.updateHeader();
};

App.prototype.updateHeader = function()
{
    const header = $('.header-background');
    const headerHeight = header.height();
    const navIcon = $('.nav-icon');
    const logo = $('.logo');

    const scrollPos =  window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPos > headerHeight)
    {
        if (!logo.hasClass('slide-up')) {
            logo.addClass('slide-up');
        }
        if (header.hasClass('slide-out')) {
            header.removeClass('slide-out');
        }
        if (!navIcon.hasClass('slide-up')) {
            navIcon.addClass('slide-up');
        }
    }
    else
    {
        if (logo.hasClass('slide-up')) {
            logo.removeClass('slide-up');
        }
        if (!header.hasClass('slide-out')) {
            header.addClass('slide-out');
        }
        if (navIcon.hasClass('slide-up')) {
            navIcon.removeClass('slide-up');
        }
    }

    const opacity = ((scrollPos / 20) / 19);
    let posX = (10 - (scrollPos / 4) / 2);
    let posY = (50 - (scrollPos / 4) / 2);
    let scaleVal = (1.5 - (scrollPos / 50) / 49);

    posX = Math.min(Math.max(posX, 0), 10);
    posY = Math.min(Math.max(posY, -50), 50);
    scaleVal = Math.min(Math.max(scaleVal, 1), 1.5);

    header.css({
        'opacity' : opacity
    });

    if (opacity <= 0) header.css("visibility", "hidden");
    else header.css("visibility", "visible");
};

App.prototype.destroy = function(event)
{
    $(window).off('resize.appview');
    $(window).off('resize.appview');
};