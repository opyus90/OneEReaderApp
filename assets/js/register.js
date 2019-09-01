/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');
import '../fonts/icomoon/style.css';
import '../css/bootstrap.min.css';
import '../css/jquery-ui.css';
import 'owl.carousel2/dist/assets/owl.carousel.min.css';
import '../css/owl.theme.default.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/bootstrap-datepicker.css';
import '../fonts/flaticon/font/flaticon.css';
import '../css/aos.css';
import '../css/style.css';
require('../css/register.css');


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');

import 'jquery/dist/jquery.min.js';
import 'jquery-countdown';
import 'bootstrap';
import 'owl.carousel2';
import './jquery-ui.js';
import './jquery.stellar.min.js';
import './main.js';


console.log('Hello Webpack Encore! Edit me in assets/js/contact.js');


function addLogout(){
	    var lenuser = $('.user-email').attr('user').length;
		if ( lenuser > 0 ) {
		   var logout = $('.user-email').attr('logout');
		   $('.cta .loginBtn').replaceWith('<a class="nav-link loginBtn" href="'+logout+'"><span class="logout">Logout</span></a>');
		}
}


$(document).ready(function() {
    
	addLogout();
	
	
	$(".search-title").on('keypress',function(e) {
        if( (e.which == 13) && ($('.search-title').val().length > 0) ) {
		   var val = $('.search-title').val();
		   var urlt = $('.dropdown li a').eq(0).attr('href');
		   urlt = urlt.replace('All', 'search-'+val);
		   //e.preventDefault();
		   $('.search-title').val('');  
		   $('.search-wrap').removeClass('active');
		   window.location.href = urlt;
        }
    });
	
	
	$(".menu-cl").on('click', function(e) { //work in production
            var $this = $(this);
			//e.preventDefault();
            //$('ul.dropdown li').prepend('<li><a href="#">Science</a></li>');
			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			}
		
	});

    
	
});