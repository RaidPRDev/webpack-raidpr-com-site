import $ from "jquery";

import Modernizr from 'modernizr';

import AppPreloader from './app_preloader.js';
import TransitionEffect from './lib/transition_effect.js';
import EaselJS from './lib/easeljs.js';


$(document).ready( function()
{
    const contact = new Contact();
});

function Contact()
{
    this.hasVisited = true;
    this.hasSentEmail = false;
    this.appPreloader = null;               // @AppPreloader
    this.transition = null;                 // @TransitionEffect

    this.initialize();
}

Contact.prototype.initialize = function()
{
    console.log("Contact.initialize");

    const ref = this;

    this.transition = new TransitionEffect();

    // start progress loader
    this.appPreloader = new AppPreloader(this);
    this.appPreloader.initialize();


    $('.submit-button').on("click", this.onSubmit.bind(this));

      // add resize event
    $(window).on('resize.contactview', this.onResize.bind(this));
};

Contact.prototype.onSubmit = function(e)
{
    e.preventDefault();
    console.log("Contact.onSubmit");

    this.sendEmail();

   /* var form = document.myform;
    $(form).on('submit', function(e)
    {
        e.preventDefault();

        console.log("form.SEND");
    });*/
};

Contact.prototype.onResize = function(event)
{
    this.updateHeader();
    this.updateFooter();
};

Contact.prototype.appPreloaderComplete = function()
{
    console.log("Contact.appPreloaderComplete");

    this.startPreloaderOutTransition();
};

Contact.prototype.startPreloaderOutTransition = function()
{
    console.log("Contact.startPreloaderOutTransition");

    $('.preloader').fadeOut();

    this.prepareTransition();
    this.initializeMenuItems();

    this.onResize();
};

Contact.prototype.prepareTransition = function()
{
    this.transition.startSequence();

    const page = $(".page-title .title").text();

    $( ".page-title").append("<span></span>");
    $( ".page-title span").append(page);

};

Contact.prototype.initializeMenuItems = function()
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

Contact.prototype.onScrollBackToTopClick = function(event)
{
    $('body,html').animate({ scrollTop: $('body').scrollTop() }, 800);
};

Contact.prototype.subMenuButtonClick = function(event)
{
    $('li.hassub a').not(this).next('ul').slideUp();
    $(this).next('ul').slideToggle();
};

Contact.prototype.menuButtonClick = function(event)
{
    $(this).toggleClass('modal-close');
};

Contact.prototype.onScroll = function(event)
{

};

Contact.prototype.updateHeader = function()
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

Contact.prototype.updateFooter = function()
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

Contact.prototype.destroy = function()
{
    // cleanup

    $(window).off('resize.contactview');

    $('.li.hassub .arrow').off('click.submenuarrow');
    $('.nav-icon').off('click.menubutton');

    $('.uptotop').off('click.uptotop');
};

Contact.prototype.emailSentComplete = function()
{
    console.log("Contact.emailSentComplete");




};

Contact.prototype.sendEmail = function()
{
    console.log("Contact.sendEmail");

    if (this.hasSentEmail) return;

    const $form		= $('.contact-form');
    $form.append( '<input type="hidden" name="ajax" value="1" />' );

    const $formSent  = $('.form-sent');

    const ajaxData    = new FormData( $form[0] );

    // check fields
    let fieldsEmpty = false;
    let i;
    for (i = 0; i < $form[0].length; i++)
    {
        console.log("addUser: ", $form[0][i].name + ': ' + $form[0][i].value);

        if ($form[0][i].value.length === 0)
        {
            console.log("Contact.fieldsEmpty");
            fieldsEmpty = true;
            break;
        }

        ajaxData.append( $form[0][i].name, $form[0][i].value );
    }

    if (fieldsEmpty) return;

    const ref = this;

    // ajax request
    $.ajax(
        {
            url: 			'api/SendEmail.php',
            type:			$form.attr( 'method' ),
            data: 			ajaxData,
            dataType:		'json',
            cache:			false,
            contentType:	false,
            processData:	false,
            complete: function()
            {
                console.log("sent.email.complete");
                ref.hasSentEmail = true;
            },
            success: function( data )
            {
                console.log("addUser.success.data: ", data);
                $form.addClass( data.success == true ? 'is-success' : 'is-error' );
                if( !data.success )
                {
                    console.error("Error", data.error, "error");
                    const fieldError = data.fieldError;
                    $('#con_' + fieldError).addClass('required');

                }
                else
                {
                    console.log("email sent!");

                    $form.fadeOut('slow', function()
                    {
                        $form.addClass('hidden');
                        $formSent.removeClass('hidden');
                        $formSent.fadeIn('slow', function()
                        {

                        });

                    });
                }
            },
            error: function(request, status, error)
            {
                console.error("Error", error);
            }
        });

    return false;
}