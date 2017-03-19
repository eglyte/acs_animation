var Common = {
    init: function(){
        var  self = this;
        self.initFontSize($("#acs-select-size a"));
    },

    initFontSize: function($trigger){
        var self = this;
        $trigger.click(function(event){
            var $e = $(this), 
                val = $e.attr("rel");
            console.log(val);
            event.preventDefault();
            $e.addClass("select"); 
            $trigger
                .not($e)
                .removeClass("select");

            $("body").removeClass("font-extra-small font-small font-medium font-large").addClass('font-'+val);
        });
    }
}

jQuery(function ($) {

    var _width = $(window).width();

    //PagePreloader();

    //wrapDivTitleBox();
/*
    $('#main-content').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 100    
    });   

*/
    function hhSetHight(){
		$halfwidth = $(".halfwidth");
		$halfwidth.each(function () {
			$(this).height(halfWidth($(this)));
		});

		$equalwidth = $(".equalWidth");
		$equalwidth.each(function () {
			$(this).height(equalWidth($(this)));
		});
	}hhSetHight();

/*
    // Sticky menu
    var sticky = new Waypoint.Sticky({

        element: $('.site-header')[0],
        handler: function (direction) {
            if (direction == 'down')
                animateCss(this.element, 'fadeIn');
            else
                $(this.element).removeClass('fadeIn');
        },

        offset: -340
    })
*/
    //$(".acs-formbuilder fieldset").matchHeight();

    /*
     * Toggle Search Form
     */
    var $btnSearch = $('.btn-search');
    $btnSearch.on('click', function (e) {
        var target = e ? e.target : window.event.srcElement;
        if ($(this).hasClass('opened')) {
            $(this).removeClass('opened');
            $('.asc-search-form-wrap').removeClass('opened');
        } else {
            $(this).addClass('opened');
            $('.asc-search-form-wrap').addClass('opened');
        }
        e.preventDefault();
    });

    /*
        Change font size
    */
    window.Common.init();

    // Resize window
    $(window).resize(function () {
		hhSetHight();
    });

    /**
     *  Get Internet Explorer Version
     */
    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 0;
    }

    /**
     *  Animate.css
     */
    function animateCss(element, animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(element).addClass('animated ' + animationName).one(animationEnd, function () {
            $(element).removeClass('animated ' + animationName);
        });
    }

    /**
     *  Smooth Scroll
     */
    $('a[href*=#]:not([href=#])').not('#btn-redirect').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                return false;
            }
        }
    });

    /**
     *  Page Preloader
     */
    function PagePreloader() {
        $("#page-loader .page-loader-inner").delay(500).fadeIn(10, function () {
            $(this).fadeOut(500, function () {
                $("#page-loader").fadeOut(500);
            })
        })
    }

    /**
     *  Set the height of a div to be half width
     */
    function halfWidth($el) {
        var width = $el.width();
        return width / 2;
    }

    /**
     *  Set the height of a div to be equal width
     */
    function equalWidth($el) {
        var width = $el.width();
        return width;
    }

    /**
     *  Wrap an div tag around each .acs-title-box
     */
    function wrapDivTitleBox() {
        var $boxs = $('.acs-title-box');
        if ($boxs.length) {
            var $wrap = $("<div class='acs-title-box-wrap'><div class='acs-content'></div></div>");
            $boxs.each(function () {
                $wrap.css({
                    'width': $(window).width() + 'px',
                    'margin-left': -$(this).offset().left + 'px'
                });
                $(this).wrap($wrap);
            });
        }
    }


    /**
     *  Using Ajax to submit the form
     */

    $("body").on('click', ".contact-form-wrap .cms_form .cms_submit", function(event) {
        event.preventDefault();
        var _btnSubmit = $(this);
        var _form = _btnSubmit.closest('.cms_form');

        /* Act on the event */
        var _posturl = _form.attr("action") + "?showtemplate=false",  
            _postdata = _form.serialize(),
            _frm_container = _form.parent(".contact-form-wrap");

        _btnSubmit.val('Submitting...');
        _btnSubmit.attr('disabled','disabled');

        /* ajax */
        $.post(_posturl,_postdata,function(data) {
            _form.replaceWith(data);
            _frm_container.fadeIn(1000);
            // _frm_container.trigger( "resize" );
            $(".acs-formbuilder fieldset").matchHeight();
        });
    });

});


$(window).load(function () {
    $('.flexslider').flexslider({
        animation: "fade"
    });
    $('#topslider').flexslider({
        animation: "fade",
        directionNav: false,
        controlNav: false,
        slideshowSpeed: 4000, // Default: 7000
        animationSpeed: 3000,
        initDelay: 10000, // sets an initial delay of the slider initialization, in milliseconds. Default: 0
        after: function (slider) {
            if ((slider.currentSlide + 1) == slider.count) {
                 slider.pause();
            }
        }
    });
});

// Set a resize timer for efficiency
var delay = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
/*
jQuery(function($){ //create closure so we can safely use $ as alias for jQuery

    $('ul.sf-menu').supersubs({ // Initialize Superfish Menu
        minWidth:	12,	 // minimum width of submenus in em units
        maxWidth:	27,	 // maximum width of submenus in em units
        extraWidth:	1	 // extra width can ensure lines don't sometimes turn over
    }).superfish();

    $('#hamburger').click(function () { // Capture responsive menu button click
        // Show/hide menu
        $('.sf-menu').toggle();
    });

    // Check if our window has been resized
    $(window).resize(function() {
        // set a timeout using the delay function so this doesn't fire evey millesecond
        delay(function () {
            // If we're not in responsive mode
            if ($(document).width() > 768) {
                // Always show the main menu, in case it was toggled off.
                $('.sf-menu').css('display', 'block');
            }
        }, 500);
    });
});
*/
// Youtube vieo
(function() {
    var v = document.getElementsByClassName("youtube-player");
    for (var n = 0; n < v.length; n++) {
        var p = document.createElement("div");
        p.innerHTML = labnolThumb(v[n].dataset.id, v[n].dataset.img);
        p.onclick = labnolIframe;
        v[n].appendChild(p);
    }

    function labnolThumb(id, image) {
        if (image != '')
            return '<img class="youtube-thumb" src="'+image+'"><div class="play-button"></div>';
        else
            return '<img class="youtube-thumb" src="//i.ytimg.com/vi/' + id + '/hqdefault.jpg"><div class="play-button"></div>';
    }

    function labnolIframe() {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=0&showinfo=0");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("id", "youtube-iframe");
        iframe.setAttribute("width", "876");
        iframe.setAttribute("height", "450");
        this.parentNode.replaceChild(iframe, this);
    }
})();

// Google map api
(function($) {

    function render_map( $el ) {
        var $markers = $el.find('.marker');
        var args = {
            zoom        : 16,
            center      : new google.maps.LatLng(0, 0),
            mapTypeId   : google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map( $el[0], args);
        map.markers = [];

        $markers.each(function(){

            add_marker( $(this), map );

        });
        center_map( map );
    }

    function add_marker( $marker, map ) {

        var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
        var marker = new google.maps.Marker({
            position    : latlng,
            map         : map
        });
        map.markers.push( marker );

        if( $marker.html() )
        {
            var infowindow = new google.maps.InfoWindow({
                content     : $marker.html()
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open( map, marker );
            });
        }
    }


    function center_map( map ) {
        var bounds = new google.maps.LatLngBounds();
        $.each( map.markers, function( i, marker ){
            var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
            bounds.extend( latlng );

        });
        if( map.markers.length == 1 )
        {
            map.setCenter( bounds.getCenter() );
            map.setZoom( 16 );
        }
        else
        {
            map.fitBounds( bounds );
        }
    }

    $(document).ready(function(){
        $('.map_canvas').each(function(){
            render_map( $(this) );
        });
    });

    function windowSize() {
        windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    }
    windowSize();
    $( window ).resize(function() {
        windowSize();
        $( "#hello" ).css( "height", (windowHeight));
    });
    $( "#hello" ).css( "height", (windowHeight));

    
})(jQuery);