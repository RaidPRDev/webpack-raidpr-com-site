import $ from "jquery";

export default function TransitionEffect()
{
    this.transitionLayer = $('.cd-transition-layer');           // Transition Layer, contains the sprite sheet
    this.transitionBackground = this.transitionLayer.children();
    this.modalTrigger = $('.nav-icon');
    this.modalWindow = $('.full-menu');

    this.frameProportion = 1.78;                                // png frame aspect ratio
    this.spriteFrames = 25;                                     // number of png frames
    this.isResize = false;
    this.onRequestAnimationFrameUpdate = this.setLayerDimensions.bind(this);

    this.initialize();
}

TransitionEffect.prototype.initialize = function()
{
    // console.log("TransitionEffect.initialize");

    // update base layer size
    this.setLayerDimensions();

    /*
     jQuery manages the bind function references, keeps event handlers organized into namespaces,
     So we can remove named subsets of them (without having to maintain references to them)
     */

    // resizing events to update layer
    $(window).on('resize.transitioneffect', this.onResize.bind(this));

    // click events to close and block page
    this.modalTrigger.on('click.modaltrigger', this.onModalTriggerClick.bind(this));
    this.modalWindow.on('click.modalwindow', '.modal-close', this.onModalWindowClick.bind(this));
};

TransitionEffect.prototype.onResize = function(event)
{
    // console.log("TransitionEffect.onResize");

    if(!this.isResize)
    {
        this.isResize = true;

        (!window.requestAnimationFrame)
            ? setTimeout(this.onRequestAnimationFrameUpdate, 300)
            : window.requestAnimationFrame(this.onRequestAnimationFrameUpdate);
    }

};

TransitionEffect.prototype.startSequence = function()
{
    this.transitionLayer.addClass('closing').delay(1000).queue(function()
    {
        $(this).removeClass("visible closing opening").dequeue();
    });

};

TransitionEffect.prototype.onModalTriggerClick = function(event)
{
    // console.log("TransitionEffect.onModalClick");

    event.preventDefault();

    // start transition in
    this.transitionLayer.addClass('visible opening');

    // check if we have css animation support ( modernizr )
    const delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;

    // show modal panel
    const ref = this;
    setTimeout(function() {
        ref.modalWindow.addClass('visible');
    }, delay);

};

TransitionEffect.prototype.onModalWindowClick = function(event)
{
    // console.log("TransitionEffect.onModalWindowClick");

    const events = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

    // close modal window
    event.preventDefault();

    // start transition out
    this.transitionLayer.addClass('closing');

    // hide window
    this.modalWindow.removeClass('visible');

    const ref = this;

    // on css animation complete, remove layer
    this.transitionBackground.one(events, function()
    {
        // close layer
        ref.transitionLayer.removeClass('closing opening visible');

        // remove all events
        ref.transitionBackground.off(events);
    });

};

TransitionEffect.prototype.setLayerDimensions = function()
{
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    let layerHeight, layerWidth;

    if (windowWidth / windowHeight > this.frameProportion)
    {
        layerWidth = windowWidth;
        layerHeight = layerWidth / this.frameProportion;
    }
    else
    {
        layerHeight = windowHeight * 1.2;
        layerWidth = layerHeight * this.frameProportion;
    }

    this.transitionBackground.css({
        'width': layerWidth * this.spriteFrames + 'px',
        'height': layerHeight + 'px',
    });

    this.isResize = false;
};

TransitionEffect.prototype.destroy = function()
{
    // console.log("TransitionEffect.destroy");

    this.onRequestAnimationFrameUpdate = null;

    $(this.modalTrigger).off('resize.modaltrigger');
    $(this.modalWindow).off('resize.modalwindow', '.modal-close');
    $(window).off('resize.transitioneffect');
};