/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');
require('../css/greet.css');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

// import the function from greet.js (the .js extension is optional)
// ./ (or ../) means to look for a local file
//require('../js/greet.js');
//import greet from './greet';
function vv(){
           //document.getElementById("demo").innerHTML = "Hello World!";
		   //return document.write(52 + 17);
		   return "<h1>gdgdggd22</h1>";
}
function vv2(){
           //document.getElementById("demo").innerHTML = "Hello World!";
		   //return document.write(52 + 17);
		   return "<h1>sfdda44</h1>";
}
module.exports = {
   vv,
   vv2
   
}

$(document).ready(function() {
    //$('body').prepend('<p>hggg</p>');
});