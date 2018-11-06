const carouselElements = document.querySelectorAll('.carousel');
carouselElements.forEach(carouselElement => {
    new Flickity( carouselElement, {
        prevNextButtons: false,
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
}, false);



// Hero background canvas
