var g = new Object();
/*
*** global variants ***
g.ccopy
g.image

g.startLeft
g.startTop
g.startMouseX
g.startMouseY
g.minX
g.minY
g.maxX
g.maxY
g.margin
g.dragging

*** functions ***
init()             -- call when page is loaded.
updateMessagePosition() -- update message position for updating css params
calcMovableArea()  -- calc movable area of message
adjustMessageTop() -- adjust position of message (subtract image height)
adjustPosition()   -- adjust position of message (check bounds of image)

dragstart(e)       -- Callback function of mousedown
drag(e)            -- Callback function of mousemove
dragend(e)         -- callback function of mouseup
showInfo()         -- for debug
*/
g.margin = 10;

    function init() {
      // get image and ccopy(catch-copy) elements
      g.image = document.getElementById("img");
      g.ccopy = document.getElementById("ccopy");

      // set ccopy position
      var styleLeft = trans.left | 0;
      var styleTop  = trans.top  | 0;
      g.ccopy.style.left = styleLeft + "px";
      g.ccopy.style.top  = styleTop + "px";
      adjustMessageTop();

      // add drag event listener
      g.ccopy.addEventListener("mousedown", dragstart, false);
      document.addEventListener("mousemove",drag, false);
      document.addEventListener("mouseup", dragend, true);

      calcMovableArea();

      //g.info = document.getElementById("info");
      //showInfo();
    }

    function updateMessagePosition() {
      calcMovableArea();
      adjustPosition();
    }

    function calcMovableArea() {
      // get ccopy style
      var transform = g.ccopy.style["-webkit-transform"];
      var rotateStr = transform.match(/rotate\((-?[0-9]+)deg\)/);
      var translateXY = transform.match(/translate\((-?[0-9]+)px.*(-?[0-9]+)px\)/);

      // get ccopy size
      g.ccopy.style.position="absolute";
      var ccopyWidth  = g.ccopy.offsetWidth;
      var ccopyHeight = g.ccopy.offsetHeight;
      g.ccopy.style.position="relative";

      var dx = 0;
      var dy = 0;
      if(rotateStr){
        var angle1 = Math.atan(ccopyWidth / ccopyHeight);
        var angle2 = Math.PI * rotateStr[1] / 180.0;
	var rot = angle1 + angle2;
        var r = Math.sqrt(ccopyHeight * ccopyHeight + ccopyWidth * ccopyWidth) * 0.5;
	dx = Math.abs(r * Math.sin(rot) - ccopyWidth  * 0.5);
	dy = Math.abs(r * Math.cos(rot) - ccopyHeight * 0.5);
      }
      if(translateXY){
        var tx = parseInt(translateXY[1]);
	var ty = parseInt(translateXY[2]);
        dx += tx;
        dy += ty;
      }

      var agent = navigator.userAgent;
      g.minX = dx + g.margin;
      g.maxX = g.image.offsetWidth - ccopyWidth - dx - g.margin;
      g.minY = -g.image.offsetHeight - dy + g.margin;
      g.maxY = -ccopyHeight + dy - g.margin;
    }

    function adjustPosition() {
      var nowLeft = trans.left;
      var nowTop  = trans.top - g.image.offsetHeight;

      if(nowLeft < g.minX)
        nowLeft = g.minX;
      
      if(nowLeft > g.maxX)
        nowLeft = g.maxX;

      if(nowTop < g.minY)
        nowTop = g.minY;

      if(nowTop > g.maxY)
        nowTop = g.maxY;

      g.ccopy.style.left = nowLeft + "px";
      g.ccopy.style.top = nowTop + "px";

      trans.left = nowLeft;
      trans.top  = nowTop + g.image.offsetHeight;
      document.getElementById("input_left").value = trans.left;
      document.getElementById("input_top").value  = trans.top;
    }

    function adjustMessageTop() {
      if(!g.image){
        g.image = document.getElementById("img");
        g.ccopy = document.getElementById("ccopy");
      }
      var y = -g.image.offsetHeight;
      var ccopyTop = parseInt(g.ccopy.style.top);
      var ccopyTopStyle = (ccopyTop + y) + "px";
      g.ccopy.style.top = ccopyTopStyle; 
    }

    function dragstart(e) {
      g.dragging = true;

      g.startLeft = parseInt(g.ccopy.style.left);
      g.startTop = parseInt(g.ccopy.style.top);
      g.startMouseX = e.pageX;
      g.startMouseY = e.pageY;

      return false;
    }

    function drag(e) {
      if(!g.dragging)
        return;

      var nowMouseX = e.pageX;
      var nowMouseY = e.pageY;
      var nowLeft = g.startLeft + (nowMouseX - g.startMouseX);
      var nowTop = g.startTop + (nowMouseY - g.startMouseY);

      trans.left = nowLeft;
      trans.top  = nowTop + g.image.offsetHeight;

      adjustPosition();

      //showInfo();

      return false;
    }

    function dragend(e) {
      g.dragging = false;
    }

    function showInfo() {
      info.innerHTML = "(" + g.minX + "," + g.minY + "," + g.maxX + "," + g.maxY + ")<br />";
      info.innerHTML += g.ccopy.style.left + "," + g.ccopy.style.top + "<br />";
    }

