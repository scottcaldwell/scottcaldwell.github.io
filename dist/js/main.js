'use strict';

// var mySwiper = new Swiper ('.swiper-container', {
//     // Optional parameters
//     // direction: 'vertical',
//     preloadImages: false,
//     // Enable lazy loading
//     lazy: true,

//     loop: true,

//     // And if we need scrollbar
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     },
// })

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
  // options
  //   cellAlign: 'center',
  //   contain: true,
  prevNextButtons: false
  //   fullScreen: true
});

var captureMouse = function captureMouse(element) {
  var mouse = { x: 0, y: 0, event: null },
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;

  element.addEventListener('mousemove', function (event) {
    var x = void 0,
        y = void 0;

    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + body_scrollLeft + element_scrollLeft;
      y = event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;

    mouse.x = x;
    mouse.y = y;
    mouse.event = event;
  }, false);

  return mouse;
};

//Mouse listener - get percentage across screen x and y
//Get element with mouse tilt
//translateX(-5% to 5%)
//translateY(-5% to 5%)
var tiltElement = document.getElementById('tilt');
var mouse = captureMouse(tiltElement);

tiltElement.addEventListener('mousemove', function () {
  var elementWidth = tiltElement.offsetWidth;
  var elementHeight = tiltElement.offsetHeight;
  var percentX = 100 * mouse.x / elementWidth;
  var percentY = 100 * mouse.y / elementHeight;
  var tiltX = (percentX / 10 - 5).toFixed(2);
  var tiltY = (percentY / 10 - 5).toFixed(2);
  tiltElement.style = "transform: rotateY(" + tiltX + "deg) rotateX(" + tiltY + "deg)";
  console.log("x: " + tiltX + ", y: " + tiltY);
}, false);

// Hero background canvas