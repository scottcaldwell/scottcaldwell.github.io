class Circle {
    constructor( x, y, column, row, color="black"){
      this.x = x;
      this.y = y;
      this.column = column;
      this.row = row;
      this.color = color;
      this.rotation = 0;
      this.startAngle = 0;
      this.endAngle = 2 * Math.PI;
    }
  
    draw(context){
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
  }
  
  const captureMouse =  (element) => {
    let mouse = {
          x: 0, 
          y: 0, 
          event: null
    };
    let body_scrollLeft = document.body.scrollLeft;
    let element_scrollLeft = document.documentElement.scrollLeft;
    let body_scrollTop = document.body.scrollTop;
    let element_scrollTop = document.documentElement.scrollTop;
    let offsetLeft = element.offsetLeft;
    let offsetTop = element.offsetTop;
    
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
  
  const captureTouch = (element) => {
    let touch = {
      x: null,
      y: null,
      isPressed: false,
      event: null
    };
    
    let body_scrollLeft = document.body.scrollLeft;
    let element_scrollLeft = document.documentElement.scrollLeft;
    let body_scrollTop = document.body.scrollTop;
    let element_scrollTop = document.documentElement.scrollTop;
    let offsetLeft = element.offsetLeft;
    let offsetTop = element.offsetTop;
  
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
      let x, y, touch_event = event.touches[0]; //first touch
      
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
  
  const fitToContainer = (canvas) => {
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  
  const clearCanvas = (canvas) => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  
  
  const addArrowsToCanvas = (canvas, arrowWidth, arrowHeight) => {  
    const columns = Math.trunc(canvas.width / arrowWidth);
    const rows = Math.trunc(canvas.height / arrowHeight);
    const numArrows = columns * rows;
    const xGap = (canvas.width - (columns *  arrowWidth)) / 2;
    const yGap = ((canvas.height - rows *  arrowHeight)) / 2;
    
    let createArrows = (col, row) => {
      const arrowArray = [];
      for (let x = 0; x < col; x++) {
        for (let y = 0; y < row; y++) {
          let xPos = xGap + (arrowWidth / 2) +  (x * arrowWidth);
          let yPos = yGap + (arrowHeight / 2) + (y * arrowHeight);

          arrowArray.push(new Circle(xPos, yPos, x, y)); 
        }
      }
      return arrowArray;
    }
    
    clearCanvas(canvas); 
    const arrows = createArrows(columns, rows);
    return arrows;
  };
  
  const canvas = document.getElementById('canvas');
  const hero = document.getElementById('heroFade');

  const mouse = captureMouse(hero);
  const touch = captureTouch(hero);
  const context = canvas.getContext('2d');
  
  fitToContainer(canvas);
  let arrows = addArrowsToCanvas(canvas, 40, 40);
  
  window.addEventListener("resize", ()=>{
    fitToContainer(canvas);
    arrows = addArrowsToCanvas(canvas, 40, 40);
  });
  
  
  (function drawFrame(){
    window.requestAnimationFrame(drawFrame, canvas);
   
    clearCanvas(canvas);
    arrows.forEach(function(arrow){
      let dx = (mouse.x || touch.x) - arrow.x;
      let dy = (mouse.y || touch.y) - arrow.y;
      arrow.rotation = Math.atan2(dy, dx);
      arrow.draw(context);
    })
  
    
  })();