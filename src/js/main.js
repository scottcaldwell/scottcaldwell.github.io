
const carouselElements = document.querySelectorAll('.carousel');
carouselElements.forEach(carouselElement => {
    new Flickity( carouselElement, {
        prevNextButtons: false,
        lazyLoad: true
    });
});

  

let captureMouse = function (element) {
    let mouse = {x: 0, y: 0, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;
  
  element.addEventListener('mousemove', function (event) {
    let x, y;
    
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


window.addEventListener("load", function(event) {
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

    for (var i=1.0; i<=numSteps; i++) {
        var ratio = i/numSteps;
        thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
}

function fadeFooter(entries, observer) {
    entries.forEach(function(entry) {
        footerFade.style.opacity = entry.intersectionRatio;   
        prevRatio = entry.intersectionRatio;
    });
}

function fadeHero(entries, observer) {
    entries.forEach(function(entry) {
        heroFade.style.opacity = entry.intersectionRatio;
        prevRatio = entry.intersectionRatio;
    });
}


