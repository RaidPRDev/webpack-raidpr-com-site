import $ from "jquery";
import './jquery.ripples-min.js';

export default function RippleEffect(target, options)
{
    this.target = target;
    this.options = {
        imageUrl: null,
        resolution: 256,
        dropRadius: 50,
        perturbance: 0.01,
        interactive: true,
        crossOrigin: '',
    };

    console.log("BEFORE: this.options: ", this.options);
    console.log("BEFORE: arg.options: ", options);

    if (options !== undefined)
    {
        this.options = Object.assign({}, options);

        console.log("this.options: ", this.options);

    }

    this.initialize();
}

RippleEffect.prototype.initialize = function()
{
    console.log("RippleEffect.initialize");

    this.draw();
};

RippleEffect.prototype.draw = function()
{
    console.log("RippleEffect.draw");

    if (this.target !== undefined && $.fn.ripples)
    {
        $(this.target).ripples({
            imageUrl: null,
            resolution: 256,
            dropRadius: 50,
            perturbance: 0.01,
            interactive: true,
            crossOrigin: '',
        });

        const posX = $(window).width() / 2;
        const posY = $(window).height() / 2;

        const ref = this;
        setTimeout(function()
        {
            $(ref.target).ripples('drop', posX, posY, 20, 1);
        }, 750);

    }
};