'use strict';

function getRandomPoints(min, max) {
    var arrayPoints = [];
    for (var i = 0; i < 3; i++) {
        arrayPoints[i] = Math.random() * (max - min) + min;
    }
    return arrayPoints;
}

function getRandomNumber(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}

function createTrapezoid(initX, initY) {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var width = canvas.width;
    var x = initX;
    var y = initY;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // var timesRotated90 = getRandomNumber(0,3);
        // var largeRotateDegrees = timesRotated90 * 90;
        var minorRotateDegrees = getRandomNumber(-10, 10);

        while (x < width) {
            var randomPoints = getRandomPoints(100, 200);
            var color = 0;
            var randomShade = getRandomNumber(color, color + 40);
            console.log(randomShade);
            ctx.fillStyle = 'rgb(' + randomShade + ',' + randomShade + ',' + randomShade + ')';
            // ctx.rotate(minorRotateDegrees * Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + randomPoints[0], y);
            ctx.lineTo(x + randomPoints[0], y + randomPoints[1]);
            ctx.lineTo(x, y + randomPoints[2]);
            ctx.closePath();
            ctx.fill();
            x += getRandomNumber(50, 100);
        }
    }
}


// createTrapezoid(0, 0);
//function createShape(opacity)
//loop
//create row of shapes, with similar opacity range

//Image galleries
var allImages = {
    csImagesArray : ["cameronsparling_grid.png", "cameronsparling_full.png", "cameronsparling_contact.png", "cameronsparling_mobile.png"],
    nhlImagesArray : ["nhlrecap_full.png", "nhlrecap_hidden.png", "nhlrecap_modal.png"],
    pomoImagesArray : ["pomo_init.png", "pomo_additional_time.png"],
    syncImagesArray : ["syncline_login.png", "syncline_landing.png", "syncline_sites.png", "syncline_location.png", "syncline_drill_hole.png"]
}


//I should probably combine these functions into one (changeImage), since only one line of code is different
function nextImage(imageId, imageArray) {
    var image = document.getElementById(imageId);
    var currentIndex = image.dataset.index;
    var newIndex = (parseInt(currentIndex) + 1) >= imageArray.length ? 0 : parseInt(currentIndex) + 1;
    image.src = "img/" + imageArray[newIndex];
    image.dataset.index = newIndex;
}

function prevImage(imageId, imageArray) {
    var image = document.getElementById(imageId);
    var currentIndex = image.dataset.index;
    var newIndex = (parseInt(currentIndex) - 1) < 0 ? imageArray.length - 1 : parseInt(currentIndex) - 1;
    image.src = "img/" + imageArray[newIndex];
    image.dataset.index = newIndex;
}


var nextImageElements = document.getElementsByClassName("next-image");
var prevImageElements = document.getElementsByClassName("prev-image");

for(var i = 0; i < nextImageElements.length; i++){
    nextImageElements[i].addEventListener('click', function (a) {
        //there has to be a better way to do this. I suppose that's where jQuery excels at DOM traversal
        //if I change the html structure this will break.
        var imageId = this.previousElementSibling.childNodes[1].childNodes[1].id;
        var imageArray = allImages[ imageId + "Array"];
        nextImage(imageId, imageArray);
    }, false);
}

for(var i = 0; i < prevImageElements.length; i++){
    prevImageElements[i].addEventListener('click', function (e) {
        var imageId = this.nextElementSibling.childNodes[1].childNodes[1].id;
        var imageArray = allImages[ imageId + "Array"];
        prevImage(imageId, imageArray);
    }, false);
}

//Hamburger menu(code snippet from Bulma docs)
document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {

                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});