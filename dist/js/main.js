'use strict';

var carouselElements = document.querySelectorAll('.carousel');
carouselElements.forEach(function (carouselElement) {
  new Flickity(carouselElement, {
    prevNextButtons: false
  });
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
}, false);

// Hero background canvas