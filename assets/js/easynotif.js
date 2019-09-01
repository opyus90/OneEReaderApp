/**
 * EasyNotif jQuery Plugin
 * version: 1.0.0 2016/07/05
 * @requires jQuery v1.11.3 or later
 * Copyright (c) 2016 Amine Karismatik 
 * Project repository: https://github.com/AmineKarismatik/EasyNotif
 * Dual licensed under the Apache License.
 */
 const $ = require('jquery');

 
 (function($){

	$.fn.easynotif=function(options){
		var defaultOptions={
			type: "success",
			content: "Un erreur est servenue"};

			return this.each(function() {
                                        
                                     
 					var div = document.createElement("div");
 					$(div).addClass('easy-notif');

 					// Si les options ne sont pas fournis on recours aux options par défault var defaultOptions
 					if(typeof options==='undefined') { 
 						$(div).addClass(defaultOptions.type);
 						$(div).html(defaultOptions.content);
 					}else {
 						$(div).addClass(options.type);
 						$(div).html(options.content);

 					}

					// var e=$(this);
					document.body.appendChild(div);
					$(div).hide().delay( 200 ).fadeIn( "slow" );



					var element=$('body').find('.easy-notif');
                                        element.delay(2000).fadeOut('slow');
					element.on('click',function(){
						$(this).fadeOut('slow');
					});
                                     
                                        
			});






		};

                
               
	}(jQuery))
        


$(document).ready(function(){
     if ( $('.allert').length > 0 ){
                   $('.allert').hide().delay( 200 ).fadeIn( "slow" );                  
                   $('.allert').delay(2000).fadeOut('slow');
     }
  
 
       
       

});
