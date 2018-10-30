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
var flkty = new Flickity( elem, {
  // options
//   cellAlign: 'center',
//   contain: true,
  prevNextButtons: false,
//   fullScreen: true
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


//Mouse listener - get percentage across screen x and y
//Get element with mouse tilt
//translateX(-5% to 5%)
//translateY(-5% to 5%)
const tiltElement = document.getElementById('tilt');
const mouse = captureMouse(tiltElement);

tiltElement.addEventListener('mousemove', () => {
    let elementWidth = tiltElement.offsetWidth;
    let elementHeight = tiltElement.offsetHeight;
    let percentX = 100 * mouse.x / elementWidth;
    let percentY = 100 * mouse.y / elementHeight;
    let tiltX = ( ( percentX / 10 ) - 5 ).toFixed(2);
    let tiltY = ( ( percentY / 10 ) - 5 ).toFixed(2);
    tiltElement.style = "transform: rotateY(" + tiltX + "deg) rotateX(" + tiltY + "deg)";
    console.log("x: " + tiltX + ", y: " + tiltY);
}, false);



// //Image galleries
// var allImages = {
//     rsImagesArray : ["rs_onboarding.png", "rs_campaigns.png", "rs_content_editor.png", "rs_social.png"],
//     csImagesArray : ["cs_grid.png", "cs_full.png", "cs_contact.png", "cs_mobile.png"],
//     nhlImagesArray : ["nhl_full.png", "nhl_hidden.png", "nhl_modal.png"],
//     syncImagesArray : ["syncline_login.png", "syncline_landing.png", "syncline_sites.png", "syncline_location.png", "syncline_drill_hole.png"]
// }

// function nextImage(imageId, imageArray) {
//     var image = document.getElementById(imageId);
//     var currentIndex = parseInt(image.dataset.index);
//     var newIndex = (currentIndex + 1) >= imageArray.length ? 0 : currentIndex + 1;
//     image.src = "img/" + imageArray[newIndex];
//     image.dataset.index = newIndex;
// }

// function prevImage(imageId, imageArray) {
//     var image = document.getElementById(imageId);
//     var currentIndex = parseInt(image.dataset.index);
//     var newIndex = (currentIndex - 1) < 0 ? imageArray.length - 1 : currentIndex - 1;
//     image.src = "img/" + imageArray[newIndex];
//     image.dataset.index = newIndex;
// }

// var nextImageElements = document.getElementsByClassName("next-image");
// var prevImageElements = document.getElementsByClassName("prev-image");

// for(var i = 0; i < nextImageElements.length; i++){
//     nextImageElements[i].addEventListener('click', function (a) {
//         var imageId = this.previousElementSibling.childNodes[1].childNodes[1].id;
//         var imageArray = allImages[ imageId + "Array"];
//         nextImage(imageId, imageArray);
//     }, false);
// }

// for(var i = 0; i < prevImageElements.length; i++){
//     prevImageElements[i].addEventListener('click', function (e) {
//         var imageId = this.nextElementSibling.childNodes[1].childNodes[1].id;
//         var imageArray = allImages[ imageId + "Array"];
//         prevImage(imageId, imageArray);
//     }, false);
// }

// //Show note if no direct link to code
// function showNote(ele){
//     ele.parentElement.nextElementSibling.style.display = 'block';
// }