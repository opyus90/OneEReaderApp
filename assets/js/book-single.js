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
require('../css/book-single.css');



// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');

import 'jquery/dist/jquery.min.js';
import 'jquery-countdown';
import 'bootstrap';


import 'owl.carousel2';
import './jquery-ui.js';
import './jquery.stellar.min.js';
import './main.js';



console.log('Hello Webpack Encore! Edit me in assets/js/book-single.js');

var voted = false;
var commented = false;
var databsingle = JSON.parse( $("#single").attr("datab-single") );



function bookPage(){
	    var urlimage;
		var title = $("#single").attr("book-title");
		var urlbook = $("#single").attr("book-path");
        var bookpage = urlbook.replace("book-title", databsingle[0]["Titles"]);	
        var pageread = bookpage.replace("action", "read");	
        var pagedownload = bookpage.replace("action", "download");		
		urlimage = '/images/books/'+title+'.jpg';
        $("#single").append('<div class="col-md-5 mr-auto"><div class="border text-center">'
                          +'<img src="'+urlimage+'"	alt="Image" class="img-fluid p-5"></a></div></div>' 
						  +'<div class="col-md-6"><h2 class="text-black">'+title+'</h2><p>'+databsingle[0]["Description"]+'</p>'
						  +'<div class="mb-5"><div class="input-group mb-3"><div class="vote"><ul class="rating">'
						  +'<li class="st star" id="fullnum1"></li><li class="st star" id="fullnum2"></li><li class="st star" id="fullnum3"></li>'
						  +'<li class="st star" id="fullnum4"></li><li class="st star" id="fullnum5"></li><li class="st starhalf fullstar half"></li><li></li></ul>'
						  +'<ul class="rating2"><li class="star-empty" id="num1"></li><li class="star-empty" id="num2"></li><li class="star-empty" id="num3"></li>'
						  +'<li class="star-empty" id="num4"></li><li class="star-empty" id="num5"></li><li ></li></ul>'
						  +'</div><p id="votefloat">'+(databsingle[0]["Votes"]).toFixed(2)+'</p><div class="vote-review"><p><strong class="text-primary h3"> ('+databsingle[0]["Voted"]+' Reviews)</strong></p></div></div></div><p>'
						  +'<a href="'+pageread+'" class="buy-now btn btn-sm height-auto px-4 py-3 btn-primary read-online">Read Online</a></p>'
						  +'<div class="mt-5"><ul class="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">'
						  +'<li class="nav-item"><a href="'+pagedownload+'" class="buy-now btn btn-sm height-auto px-4 py-3 btn-primary download">Download</a></li>'
						  +'<li class="nav-item"><p id="downloaded">Downloaded: '+databsingle[0]["Downloads"]+'</p></li></ul></div></div></div>');

}

function getVotesBegin(intrating, floatrating){
		var n = floatrating - intrating;
		console.log("begin floatrating is "+floatrating+"intrating is "+intrating);
		if ( floatrating > 0 ) {
		    $(".rating .st").eq(intrating).prevAll().addClass("voted");
			$(".voted").removeClass("starhalf fullstar half");
			if( n > 0){
		      $(".rating .star").eq(intrating).addClass("starhalf fullstar half");
		      $("style.5star").replaceWith('<style class="5star">.half::after{width: '+n*40+'px !important;} .fullstar::after {margin-left: '+((intrating*41)+(intrating*0.7))+'px !important;</style>');
		    } else {
			  $("style.5star").replaceWith('<style class="5star">.half::after{width: '+n*40+'px !important;} .fullstar::after {margin-left: '+((intrating*41)+(intrating*0.7))+'px !important;</style>');
			}
		} else {
			$("style.5star").replaceWith('<style class="5star">.half::after{width: '+n*40+'px !important;} .fullstar::after {margin-left: '+((intrating*41)+(intrating*0.7))+'px !important;</style>');
		}
		
}

function getVotes(intrating, floatrating){
		var n = floatrating - intrating;
		if ( floatrating > 0 ) {
		    if( $(".rating .star").hasClass("voted") ){
		        $(".rating .star").removeClass("voted");
		    }	
			if( $(".rating .star").hasClass("half") ){
		        $(".rating .star").removeClass("starhalf fullstar half");
		    }
		   
		    $(".rating .st").eq(intrating).prevAll().addClass("voted");
		    $(".voted").removeClass("starhalf fullstar half");
		    if( n > 0){
		      $(".rating .star").eq(intrating).addClass("starhalf fullstar half");
		      $("style.5star").replaceWith('<style class="5star">.half::after{width: '+n*40+'px !important;} .fullstar::after {margin-left: '+((intrating*41)+(intrating*0.7))+'px !important;</style>');
		    } else {
			  $("style.5star").replaceWith('<style class="5star">.half::after{width: '+n*40+'px !important;} .fullstar::after {margin-left: '+((intrating*41)+(intrating*0.7))+'px !important;</style>');
			}
		} else {
			$("style.5star").replaceWith('<style class="5star">.half::after{width: '+n*40+'px !important;} .fullstar::after {margin-left: '+((intrating*41)+(intrating*0.7))+'px !important;</style>');
		}
}

function addLogout(){
	    var lenuser = $('.user-email').attr('user').length;
		if ( lenuser > 0 ) {
		   var logout = $('.user-email').attr('logout');
		   $('.cta .loginBtn').replaceWith('<a class="nav-link loginBtn" href="'+logout+'"><span class="logout">Logout</span></a>');
		}
}

function getActions(){
	    var urluser = $('.book-single').attr('book-user');
		var lenuser = $('.user-email').attr('user').length;
		if ( lenuser > 0 ) {
		  urluser = urluser.replace('someuser', $('.user-email').attr('user'));
		  urluser = urluser.replace('sometitle', $("#single").attr("book-title"));
		  console.log("getaction");
	      $.ajax({
	        method: 'POST', //used post method, on get have error with length uri
	        url: urluser,
	        data: databsingle[0]["Titles"],
	        success: function(data) {
				        //console.log("data"+data);
                        var obj = JSON.parse(data);
						//console.log("if voted"+obj.Vote);
						voted = obj.Vote;
						commented = obj.Comment;
						if(!commented){
						    $(".comment-form-wrap").replaceWith('<div class="comment-form-wrap pt-5"><h3 class="mb-5">Leave a comment</h3><form class="p-5 bg-light">'
						                                        +'<div class="form-group"><label for="message">Message</label><textarea id="message" cols="30" rows="10" '
																+'class="form-control text-comment" required></textarea></div><div class="form-group">'
																+'<input type="button" value="Post Comment" class="btn btn-primary commentBtn leave-comment"></div></form></div>');
						}
	        },
	        error: function(a,b,c) {
		        console.log(b);
	        }
          });
		}
}

function getComments(){
	    var urluser = $('#single').attr('all-comments');
		urluser = urluser.replace('title', databsingle[0]["Titles"]);

		console.log("getcomments");
	    $.ajax({
	        method: 'POST', //used post method, on get have error with length uri
	        url: urluser,
	        data: databsingle[0]["Titles"],
	        success: function(data) {
                        var obj = JSON.parse(data);
						var count = 1;
						console.log("if commented"+JSON.stringify(obj));
						$.each(obj, function(key, value) {  //
						  $.each(value, function(k, val) { 
						    var struser = String(k);
	        		        var usern = struser.substring(0, struser.lastIndexOf("@"));  
						    $("ul.comment-list").append('<li class="comment"><div class="vcard bio"><img src="/images/unknown.jpg" alt="Image placeholder">'
						                              +'</div><div class="comment-body"><h3>'+usern+'</h3><p>'+val+'</p></div></li>');
							count++;
						  });
                        });
						$('#numcom').replaceWith('<span id="numcom">'+count+'</span>');
	        },
	        error: function(a,b,c) {
		        console.log(b);
	        }
        });
		
}

$(document).ready(function() {
    
	bookPage();
	addLogout();
	getComments();
	getActions();
	
	getVotesBegin(parseInt(databsingle[0]["Votes"]), parseFloat(databsingle[0]["Votes"]));
	
	$(".search-title").on('keypress',function(e) {
        if( (e.which == 13) && ($('.search-title').val().length > 0) ) {
		   var val = $('.search-title').val();
		   var urlt = $('.dropdown li a').eq(0).attr('href');
		   urlt = urlt.replace('All', 'search-'+val);
		   e.preventDefault();
		   $('.search-title').val('');  
		   $('.search-wrap').removeClass('active');
		   window.location.href = urlt;
        }
    });
	
	$(document).on("click", ".leave-comment", function () {
		if ((!commented) && ($('.user-email').attr('user').length > 0)) {
            if( $('.text-comment').val().length > 0 ) {
		       var val = $('.text-comment').val();
			   var urlupdate = $("#single").attr("book-comment");
			   var username = $('.user-email').attr('user');
		       urlupdate = urlupdate.replace("username", username);
               urlupdate = urlupdate.replace("name", databsingle[0]["Titles"]);
		       
               $.ajax({
	                method: 'POST', //used post method, on get have error with length uri
	                url: urlupdate,
	                data: val,
	                success: function(data) {
                        //var obj = JSON.parse(data);
						if ( data == "success" ) {
							var numcom = parseInt($('#numcom').text());
						    var usern = username.substring(0, username.lastIndexOf("@"));  
						    $("ul.comment-list").append('<li class="comment"><div class="vcard bio"><img src="/images/unknown.jpg" alt="Image placeholder">'
						                              +'</div><div class="comment-body"><h3>'+usern+'</h3><p>'+val+'</p></div></li>');
							$(".comment-form-wrap").replaceWith('<div class="comment-form-wrap pt-5"><h3 class="mb-5"></div>');
							$('#numcom').replaceWith('<span id="numcom">'+(numcom+1)+'</span>');
						}
						
	                },
	                error: function(a,b,c) {
		                console.log(b);
	                }
                });
			 
		    }
        }
    });
	
	
	$(".star-empty").hover(function(){
	  if ((!voted) && ($('.user-email').attr('user').length > 0)) {
		var x = $(this).attr('id');
		$(".rating #full"+x).next().prevAll().toggleClass('special');
        if ( $(".rating .star").hasClass("starhalf fullstar half special") ) {
		   $('.half').addClass('full').removeClass('starhalf fullstar half');
	    }
	  }  
    }, function(){
		if ((!voted) && ($('.user-email').attr('user').length > 0)) {
		    var x = $(this).attr('id');
		    $(".rating #full"+x).next().prevAll().toggleClass('special');
            if ( $(".rating .star").hasClass("full") ) {
		       $('.full').addClass('starhalf fullstar half').removeClass('full');
	        }
		
		    $(".rating .voted.half").siblings().removeClass("starhalf fullstar half");
		}
    });
	
	
	
	$('.rating2 li').on('click', function() {
	  if ((!voted) && ($('.user-email').attr('user').length > 0)) {
		var x = $(this).attr('id');
        var count = $(this).next().prevAll().length; 
		var urlupdate = $("#single").attr("book-update");
		urlupdate = urlupdate.replace("username", $('.user-email').attr('user'));
        urlupdate = urlupdate.replace("name", databsingle[0]["Titles"]);
		urlupdate = urlupdate.replace("vote", count);
		console.log("count is: "+count);
        $.ajax({
	        method: 'POST', //used post method, on get have error with length uri
	        url: urlupdate,
	        data: databsingle[0]["Titles"],
	        success: function(data) {
                        var obj = JSON.parse(data);
						$(".vote-review").replaceWith('<div class="vote-review"><p><strong class="text-primary h3"> ('+(obj.voted)+' Review)</strong></p></div>');
						getVotes(parseInt(obj.vote), parseFloat(obj.vote));
						$("p#votefloat").replaceWith('<p id="votefloat">'+(parseFloat(obj.vote)).toFixed(2)+'</p>');
						$(".rating #full"+x).next().prevAll().toggleClass('special');
                        if ( $(".rating .star").hasClass("full") ) {
		                    $('.full').addClass('starhalf fullstar half').removeClass('full');
	                    }
		
		    $(".rating .voted.half").siblings().removeClass("starhalf fullstar half");
						
	        },
	        error: function(a,b,c) {
		        console.log(b);
	        }
        });
      }		
		
    });
	
	
	$("a.download").on('click', function() { //change counter of downloaded
            var $this = $(this);
			$("p#downloaded").replaceWith('<p id="downloaded">Downloaded: '+(databsingle[0]["Downloads"]+1)+'</p>');
		
	});
	
	
	$(".menu-cl").on('click', function(e) { //work in production
            var $this = $(this);
			e.preventDefault();
			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			}
		
	});
	
	$(".vote-review .h3").click(function() {
        $('html,body').animate({
            scrollTop: $("#numcom").offset().top},
            'slow');
    });

    
	
});