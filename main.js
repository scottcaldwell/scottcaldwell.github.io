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


// x, y -> x+r, y
// x+r, y -> x+r, y+r2
// x+r, y+r2 -> x, y+r3

//function createShape(opacity)


//loop
//create row of shapes, with similar opacity range

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