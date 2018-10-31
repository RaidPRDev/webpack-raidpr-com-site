import $ from "jquery";

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';

export default function QuoteSlider(parent)
{
    this.parentModule = parent;             // @Object
    this.owlCarousel = $('.owl-carousel');

    // check if we have a live one
    if (this.owlCarousel.length) this.initialize();
}

QuoteSlider.prototype.initialize = function()
{
    console.log("QuoteSlider.initialize");

    this.owlCarousel.each(function ()
    {
        const $owl = $(this);
        const itemsData = $owl.data('items');
        const autoplayData = $owl.data('autoplay');
        const autoPlayTimeoutData = $owl.data('autoplaytimeout');
        const dotsData = $owl.data('dots');
        const navData = $owl.data('nav');
        const marginData = $owl.data('margin');
        const stagePaddingData = $owl.data('stagepadding');
        const itemsDesktopData = $owl.data('items-desktop');
        const itemsTabletData = $owl.data('items-tablet');
        const itemsTabletSmallData = $owl.data('items-tablet-small');
        $owl.owlCarousel({
            items: itemsData
            , dots: dotsData
            , nav: navData
            , margin: marginData
            , loop: true
            , stagePadding: stagePaddingData
            , autoplay: autoplayData
            , autoplayTimeout: autoPlayTimeoutData
            , navText: ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-arrow-right'></i>"]
            , responsive:{
                0:{
                    items:itemsTabletSmallData,
                    stagePadding:0
                },
                600:{
                    items:itemsTabletData,
                    stagePadding:0
                },
                1000:{
                    items:itemsDesktopData
                }
            }
            , });
    });
};

