var g = new Object();
/*
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
g.dragging
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
      alert(g.ccopy.style.left + "," + g.ccopy.style.top);
      adjustPosition();

      // add drag event listener
      g.ccopy.addEventListener("mousedown", dragstart, false);
      document.addEventListener("mousemove",drag, false);
      document.addEventListener("mouseup", dragend, true);

      //g.info = document.getElementById("info");

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
        rot = Math.PI * rotateStr[1] / 180.0;
        dx = ccopyHeight * Math.sin(Math.PI * rotateStr[1] / 180.0);
        dy = ccopyHeight * (1.0 - Math.cos(Math.PI * rotateStr[1] / 180.0));
      }
      if(translateXY){
        var tx = parseInt(translateXY[1]);
	var ty = parseInt(translateXY[2]);
        dx += tx;
        dy += ty;
      }

      var agent = navigator.userAgent;
      if(agent.match(/Chrome/)){
        g.minX = dx;
        //minY = 0;
        g.maxX = g.image.offsetWidth  - ccopyWidth - g.margin;
      }else if(agent.match(/Safari/)){
        g.minX = g.margin;
        //minY = 0;
        g.maxX = g.image.offsetWidth  - ccopyWidth - dx;
      }
      g.minY = -g.image.offsetHeight;
      g.maxY = g.minY + g.image.offsetHeight - ccopyHeight + dy - g.margin;

      //showInfo();
    }

    function adjustPosition() {
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

