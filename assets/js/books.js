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
require('../css/books.css');



// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');

import 'jquery/dist/jquery.min.js';
import 'jquery-countdown';
import 'bootstrap';
import 'owl.carousel2';
import './jquery-ui.js';
import './jquery.stellar.min.js';
import './main.js';


console.log('Hello Webpack Encore! Edit me in assets/js/books.js');

var datab = JSON.parse( $("#list").attr("datab") );
var urlbook = $("#list").attr("book-path"); 

function layPages(pagenum, pages, key){
	var pageshtml = '<ul class="pages"><li><a class="page-books back" key="'+key+'" href="#">&lt;</a></li>';
	if( pagenum == 1 ) {
		var j;
		pageshtml = pageshtml.concat('<li class="active"><span>'+pagenum+'</span></li>');
		for ( j = 1; (j < pages) && (j < 5); j++) {
		    pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(j+1)+'</a></li>');
	    }
	               
	} else if ( pagenum == 2 ) {
		var j;
	    pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-1)+'</a></li>');
		pageshtml = pageshtml.concat('<li class="active"><span>'+pagenum+'</span></li>');
		for ( j = pagenum; (j < pages) && (j < pagenum+3); j++) {
		    pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(j+1)+'</a></li>');
	    }
	} else if ( (pagenum == pages-1) && ( pagenum > 2) ) {
		var j;
	    pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-3)+'</a></li>');
		pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-2)+'</a></li>');
		pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-1)+'</a></li>');
		pageshtml = pageshtml.concat('<li class="active"><span>'+pagenum+'</span></li>');
		for ( j = pagenum; (j < pages) && (j < pagenum+1); j++) {
		    pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(j+1)+'</a></li>');
	    }
	} else if ( (pagenum >= pages) && ( pagenum > 2)  ) {
	    pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-4)+'</a></li>');
		pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-3)+'</a></li>');
		pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-2)+'</a></li>');
		pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-1)+'</a></li>');
		pageshtml = pageshtml.concat('<li class="active"><span>'+pagenum+'</span></li>');
	} else {
		var j;
	    pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-2)+'</a></li>');
		pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(pagenum-1)+'</a></li>');
		pageshtml = pageshtml.concat('<li class="active"><span>'+pagenum+'</span></li>');
		for ( j = pagenum; j < pagenum+2; j++) {
		    pageshtml = pageshtml.concat('<li><a class="page-books num" key="'+key+'" href="#">'+(j+1)+'</a></li>');
	    }

	}
	pageshtml = pageshtml.concat('<li><a class="page-books forward" key="'+key+'" href="#">&gt;</a></li></ul>');
	$('.pages').replaceWith(pageshtml);
}

function allBooks(pagenum){	
    var i;
	var numrows = 0;
	var count = 0;
	var urlimage;
	var bookpage;
	var pages = 1;
	var k = 12*(pagenum-1);

	$.each(datab, function(key, value) {  //
	        count++;
            if (count == 13	) {
				pages++;
				count = 1;
            }	
            numrows++; 			
    });
	if( pagenum > pages ) return;
	$("#list").empty();
	for(i = 0; i < 12; i++) {
            bookpage = urlbook.replace("book-title", datab[k]["Titles"]);			
            urlimage = '/images/books/'+datab[k]["Titles"]+'.jpg';
            $("#list").append('<div class="col-sm-6 col-lg-4 text-center item mb-4">'
                          +'<a datitle="'+datab[k]["Titles"]+'" href="'+bookpage+'">' 
					      +'<img id="book" src="'+urlimage+'" alt="Image"></a>'
                          +'<h3 class="text-dark"><a href="'+bookpage+'">'+datab[k]["Titles"]+'</a>'
					      +'</h3></div>');
			k++;
			if (k === numrows) { break; }
	}
	layPages(pagenum, pages, 'All');

}

function sortByPopularity(pagenum){
		var i;
	    var numrows = 0;
	    var count = 0;
		var urlimage;
		var bookpage;
		var pages = 1;
	    var k = 12*(pagenum-1);
		var arr = []; 
        var sorted;
		
		$.each(datab, function(key, value) {  //
	        count++;
            if (count == 13	) {
				pages++;
				count = 1;
            }
            arr.push(value);			
            numrows++; 			
        });
	    if( pagenum > pages ) return;
	    $("#list").empty();
        
		sorted = arr.sort(function(a, b) {
            return b["Downloads"]- a["Downloads"];
        });
		for(i = 0; i < 12; i++) {
            bookpage = urlbook.replace("book-title", sorted[k]["Titles"]);			
            urlimage = '/images/books/'+sorted[k]["Titles"]+'.jpg';
            $("#list").append('<div class="col-sm-6 col-lg-4 text-center item mb-4">'
                          +'<a datitle="'+sorted[k]["Titles"]+'" href="'+bookpage+'">' 
					      +'<img id="book" src="'+urlimage+'" alt="Image"></a>'
                          +'<h3 class="text-dark"><a href="'+bookpage+'">'+sorted[k]["Titles"]+'</a>'
					      +'</h3></div>');
			k++;
			if (k === numrows) { break; }
	    }
	    layPages(pagenum, pages, 'downloads');
	
}

function sortByRating(pagenum){
		var i;
	    var numrows = 0;
	    var count = 0;
		var urlimage;
		var bookpage;
		var pages = 1;
	    var k = 12*(pagenum-1);
		var arr = []; 
        var sorted;
		
		$.each(datab, function(key, value) {  //
	        count++;
            if (count == 13	) {
				pages++;
				count = 1;
            }
            arr.push(value);			
            numrows++; 			
        });
	    if( pagenum > pages ) return;
	    $("#list").empty();
        
		sorted = arr.sort(function(a, b) {
            return b["Votes"]- a["Votes"];
        });
		for(i = 0; i < 12; i++) {
            bookpage = urlbook.replace("book-title", sorted[k]["Titles"]);			
            urlimage = '/images/books/'+sorted[k]["Titles"]+'.jpg';
            $("#list").append('<div class="col-sm-6 col-lg-4 text-center item mb-4">'
                          +'<a datitle="'+sorted[k]["Titles"]+'" href="'+bookpage+'">' 
					      +'<img id="book" src="'+urlimage+'" alt="Image"></a>'
                          +'<h3 class="text-dark"><a href="'+bookpage+'">'+sorted[k]["Titles"]+'</a>'
					      +'</h3></div>');
			k++;
			if (k === numrows) { break; }
	    }
	    layPages(pagenum, pages, 'rating');
	
}

function listByGenre(pagenum, genre){
	    var i;
	    var numrows = 0;
	    var count = 0;
		var urlimage;
		var bookpage;
		var pages = 1;
	    var k = 12*(pagenum-1);
		var arr = []; 
		if (genre == 'All') return allBooks(pagenum);
		
	    $.each(datab, function(key, value) {  //
		    var cat = value["Category"];
			if( cat.includes(genre) ) {
	            count++;
                if (count == 13	) {
				    pages++;
				    count = 1;
                }	
				arr.push(value);
                numrows++; 	
            }				
        });
	    if( pagenum > pages ) return;
	    $("#list").empty();
		
		for(i = 0; i < 12; i++) {
            bookpage = urlbook.replace("book-title", arr[k]["Titles"]);			
            urlimage = '/images/books/'+arr[k]["Titles"]+'.jpg';
            $("#list").append('<div class="col-sm-6 col-lg-4 text-center item mb-4">'
                          +'<a datitle="'+arr[k]["Titles"]+'" href="'+bookpage+'">' 
					      +'<img id="book" src="'+urlimage+'" alt="Image"></a>'
                          +'<h3 class="text-dark"><a href="'+bookpage+'">'+arr[k]["Titles"]+'</a>'
					      +'</h3></div>');
			k++;
			if (k === numrows) { break; }
	    }
	    layPages(pagenum, pages, genre);
		   
}

function listByName(pagenum, name) {
	    var i;
	    var numrows = 0;
	    var count = 0;
		var urlimage;
		var bookpage;
		var pages = 1;
	    var k = 12*(pagenum-1);
		var arr = []; 
		
	    $.each(datab, function(key, value) {  //
		    var title = value["Titles"].toLowerCase();
			var author = value["Author"].toLowerCase();
			if( title.includes(name.toLowerCase()) || author.includes(name.toLowerCase()) ) {
	            count++;
                if (count == 13	) {
				    pages++;
				    count = 1;
                }	
				arr.push(value);
                numrows++; 	
            }				
        });
	    if( pagenum > pages || arr.length < 1) return;
	    $("#list").empty();
		
		for(i = 0; i < 12; i++) {
            bookpage = urlbook.replace("book-title", arr[k]["Titles"]);			
            urlimage = '/images/books/'+arr[k]["Titles"]+'.jpg';
            $("#list").append('<div class="col-sm-6 col-lg-4 text-center item mb-4">'
                          +'<a datitle="'+arr[k]["Titles"]+'" href="'+bookpage+'">' 
					      +'<img id="book" src="'+urlimage+'" alt="Image"></a>'
                          +'<h3 class="text-dark"><a href="'+bookpage+'">'+arr[k]["Titles"]+'</a>'
					      +'</h3></div>');
			k++;
			if (k === numrows) { break; }
	    }
	    layPages(pagenum, pages, 'search-'+name);
		   
}

function initialList(){
	    var ki = $("#list").attr('key-initial');
	    if( ki.indexOf("search-") == 0 ) {
	        var str = ki.replace('search-', ''); 
	        listByName(1, str);
	    } else {
	        listByGenre(1, ki);
	    }
}

function addLogout(){
	    var lenuser = $('.user-email').attr('user').length;
		if ( lenuser > 0 ) {
		   var logout = $('.user-email').attr('logout');
		   $('.cta .loginBtn').replaceWith('<a class="nav-link loginBtn" href="'+logout+'"><span class="logout">Logout</span></a>');
		}
}


$(document).ready(function() {
    
	initialList();
	addLogout();
	
	$(document).on("click", ".cat", function () {
        var genre = $(this).attr('genre'); // 
        listByGenre(1, genre);
    });
	
	$(".search-title").on('keypress',function(e) {
        if( (e.which == 13) && ($('.search-title').val().length > 0) ) {
		   var val = $('.search-title').val();
		   e.preventDefault();
           listByName(1, val);
		   $('.search-title').val('');  
		   $('.search-wrap').removeClass('active');
        }
    });
	
	$(document).on("click", ".page-books", function () {
		var number;
		var numactive;
		var key = $(this).attr("key");
		if ( key == 'downloads' ) {
			if( $(this).hasClass("back") ){
		        numactive = parseInt($('.pages .active span').text());
		        if ( (numactive-1) != 0 ) sortByPopularity(numactive-1);
		    } else if ( $(this).hasClass("forward") ) {
		        numactive = parseInt($('.pages .active span').text());
		        sortByPopularity(numactive+1);
		    } else {
		        number = parseInt($(this).text());
                sortByPopularity(number);
		    }
		} else if ( key == 'rating' ) {
			if( $(this).hasClass("back") ){
		        numactive = parseInt($('.pages .active span').text());
		        if ( (numactive-1) != 0 ) sortByRating(numactive-1);
		    } else if ( $(this).hasClass("forward") ) {
		        numactive = parseInt($('.pages .active span').text());
		        sortByRating(numactive+1);
		    } else {
		        number = parseInt($(this).text());
                sortByRating(number);str.indexOf("search-")
		    }
		} else if ( key.indexOf("search-") == 0 ) {
			var str = key.replace('search-', '');
			if( $(this).hasClass("back") ){
		        numactive = parseInt($('.pages .active span').text());
		        if ( (numactive-1) != 0 ) listByName(numactive-1, str);
		    } else if ( $(this).hasClass("forward") ) {
		        numactive = parseInt($('.pages .active span').text());
		        listByName(numactive+1, str);
		    } else {
		        number = parseInt($(this).text());
                listByName(number, str);
		    }
		} else {
		    if( $(this).hasClass("back") ){
		        numactive = parseInt($('.pages .active span').text());
		        if ( (numactive-1) != 0 ) listByGenre(numactive-1, key);
		    } else if ( $(this).hasClass("forward") ) {
		        numactive = parseInt($('.pages .active span').text());
		        listByGenre(numactive+1, key);
		    } else {
		        number = parseInt($(this).text());
                listByGenre(number, key);
		    }
		}
    });
	
    $('#popularity').on('click', function() {
	    sortByPopularity(1);
	});
	
	$('#rating').on('click', function() {
	    sortByRating(1);
	});
	
	
	$('.vote li').on('click', function() {
        var selectedCssClass = 'selected';
        var $this = $(this);
        $this.siblings('.' + selectedCssClass).removeClass(selectedCssClass);
          
    });
	
	
	
	$("#dropdownMenuReference").on('click', function() { 
	    if ($(".dropdown-menu").hasClass("show")) {
			//document.getElementById("myDropdown").classList.toggle("show");
			$("#ref > .col-lg-6").addClass("show");
            $(".dropdown-menu").addClass("show");
			$("#ref button").attr("aria-expanded", "true");
			//
			
		} else {
			//$(".dropdown-menu").attr('style', 'display: none !important');
		    $("#ref > .col-lg-6").removeClass("show");
		    $(".dropdown-menu").removeClass("show");
			$("#ref button").removeAttr("aria-expanded");
		}
	});
	
	window.onclick = function(event) {
      if (!event.target.matches('#dropdownMenuReference')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
               openDropdown.classList.remove('show');
            }
        }
      }
	}
	
	$(".menu-cl").on('click', function(e) { //work in production
            var $this = $(this);
			e.preventDefault();
            //$('ul.dropdown li').prepend('<li><a href="#">Science</a></li>');
			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			}
		
	});
  
    $('.vote li').on('click', function() {
      var selectedCssClass = 'selected';
      var $this = $(this);
      $this.siblings('.' + selectedCssClass).removeClass(selectedCssClass);
      $this
        .addClass(selectedCssClass)
        .parent().addClass('vote-cast');
    });

    
	
});