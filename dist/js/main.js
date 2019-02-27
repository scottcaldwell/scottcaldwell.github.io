'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
  function Circle(x, y, column, row) {
    var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "black";

    _classCallCheck(this, Circle);

    this.x = x;
    this.y = y;
    this.column = column;
    this.row = row;
    this.color = color;
    this.rotation = 0;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
  }

  _createClass(Circle, [{
    key: 'draw',
    value: function draw(context) {
      // context.save();
      // context.translate(this.x, this.y);
      // context.rotate(this.rotation);
      // context.lineWidth = 2;
      // context.fillStyle = this.color;
      // context.strokeStyle = this.color;
      // context.beginPath();
      // context.arc(1, 1, 4, this.startAngle,this.endAngle);
      // context.closePath();
      // context.fill();
      // context.stroke();

      // context.restore();
    }
  }]);

  return Circle;
}();

var captureMouse = function captureMouse(element) {
  var mouse = {
    x: 0,
    y: 0,
    event: null
  };
  var body_scrollLeft = document.body.scrollLeft;
  var element_scrollLeft = document.documentElement.scrollLeft;
  var body_scrollTop = document.body.scrollTop;
  var element_scrollTop = document.documentElement.scrollTop;
  var offsetLeft = element.offsetLeft;
  var offsetTop = element.offsetTop;

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

var captureTouch = function captureTouch(element) {
  var touch = {
    x: null,
    y: null,
    isPressed: false,
    event: null
  };

  var body_scrollLeft = document.body.scrollLeft;
  var element_scrollLeft = document.documentElement.scrollLeft;
  var body_scrollTop = document.body.scrollTop;
  var element_scrollTop = document.documentElement.scrollTop;
  var offsetLeft = element.offsetLeft;
  var offsetTop = element.offsetTop;

  element.addEventListener('touchstart', function (event) {
    touch.isPressed = true;
    touch.event = event;
  }, false);

  element.addEventListener('touchend', function (event) {
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
    touch.event = event;
  }, false);

  element.addEventListener('touchmove', function (event) {
    var x = void 0,
        y = void 0,
        touch_event = event.touches[0]; //first touch

    if (touch_event.pageX || touch_event.pageY) {
      x = touch_event.pageX;
      y = touch_event.pageY;
    } else {
      x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
      y = touch_event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;

    touch.x = x;
    touch.y = y;
    touch.event = event;
  }, false);

  return touch;
};

var fitToContainer = function fitToContainer(canvas) {
  // Make it visually fill the positioned parent
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  // ...then set the internal size to match
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

var clearCanvas = function clearCanvas(canvas) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
};

var addArrowsToCanvas = function addArrowsToCanvas(canvas, arrowWidth, arrowHeight) {
  var columns = Math.trunc(canvas.width / arrowWidth);
  var rows = Math.trunc(canvas.height / arrowHeight);
  var numArrows = columns * rows;
  var xGap = (canvas.width - columns * arrowWidth) / 2;
  var yGap = (canvas.height - rows * arrowHeight) / 2;

  var createArrows = function createArrows(col, row) {
    var arrowArray = [];
    for (var x = 0; x < col; x++) {
      for (var y = 0; y < row; y++) {
        var xPos = xGap + arrowWidth / 2 + x * arrowWidth;
        var yPos = yGap + arrowHeight / 2 + y * arrowHeight;

        arrowArray.push(new Circle(xPos, yPos, x, y));
      }
    }
    return arrowArray;
  };

  clearCanvas(canvas);
  var arrows = createArrows(columns, rows);
  return arrows;
};

var canvas = document.getElementById('canvas');
var hero = document.getElementById('heroFade');

var mouse = captureMouse(hero);
var touch = captureTouch(hero);
var context = canvas.getContext('2d');

fitToContainer(canvas);
var arrows = addArrowsToCanvas(canvas, 40, 40);

window.addEventListener("resize", function () {
  fitToContainer(canvas);
  arrows = addArrowsToCanvas(canvas, 40, 40);
});

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);

  clearCanvas(canvas);
  arrows.forEach(function (arrow) {
    var dx = (mouse.x || touch.x) - arrow.x;
    var dy = (mouse.y || touch.y) - arrow.y;
    arrow.rotation = Math.atan2(dy, dx);
    arrow.draw(context);
  });
})();
'use strict';

var carouselElements = document.querySelectorAll('.carousel');
carouselElements.forEach(function (carouselElement) {
    new Flickity(carouselElement, {
        prevNextButtons: false,
        lazyLoad: true
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

// const tiltElement = document.getElementById('tilt');
// const mouse = captureMouse(tiltElement);

// tiltElement.addEventListener('mousemove', () => {
//     let elementWidth = tiltElement.offsetWidth;
//     let elementHeight = tiltElement.offsetHeight;
//     let percentX = 100 * mouse.x / elementWidth;
//     let percentY = 100 * mouse.y / elementHeight;
//     let tiltX = ( ( percentX / 10 ) - 5 ).toFixed(2);
//     let tiltY = ( ( percentY / 10 ) - 5 ).toFixed(2);
//     tiltElement.style = "transform: rotateY(" + tiltX + "deg) rotateX(" + tiltY + "deg)";
// }, false);


// var numSteps = 200.0;

var heroElement;
var heroFade;
var footerFade;
var footerElement;
var prevRatio = 0.0;

window.addEventListener("load", function (event) {
    heroElement = document.querySelector("#hero");
    footerElement = document.querySelector("#footer");
    heroFade = document.querySelector("#heroFade");
    footerFade = document.querySelector("#footerFade");

    createObservers();
}, false);

function createObservers() {
    var heroObserver;
    var footerObserver;

    var heroOptions = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };
    var footerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };

    heroObserver = new IntersectionObserver(fadeHero, heroOptions);
    heroObserver.observe(heroElement);
    footerObserver = new IntersectionObserver(fadeFooter, footerOptions);
    footerObserver.observe(footerElement);
}

function buildThresholdList() {
    var thresholds = [];
    var numSteps = 100;

    for (var i = 1.0; i <= numSteps; i++) {
        var ratio = i / numSteps;
        thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
}

function fadeFooter(entries, observer) {
    entries.forEach(function (entry) {
        footerFade.style.opacity = entry.intersectionRatio;
        prevRatio = entry.intersectionRatio;
    });
}

function fadeHero(entries, observer) {
    entries.forEach(function (entry) {
        heroFade.style.opacity = entry.intersectionRatio;
        prevRatio = entry.intersectionRatio;
    });
}