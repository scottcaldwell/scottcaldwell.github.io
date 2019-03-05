
const carouselElements = document.querySelectorAll('.carousel');
carouselElements.forEach(carouselElement => {
    var flkty = new Flickity( carouselElement, {
        prevNextButtons: false,
    });

    //resize to prevent translateX bug on flickty container
    setTimeout(function(){ flkty.resize(); }, 100);
});

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
    var numSteps = 30;

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

// Lazy Loading Images
// Modified from https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    let active = false;
  
    const lazyLoad = function() {
      if (active === false) {
        active = true;
  
        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("lazy");
  
              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });
  
              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });
  
          active = false;
        }, 200);
      }
    };
  
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  });

