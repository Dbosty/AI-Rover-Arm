var sliders = {
    inited : false,
    maxDiff: 100,
    dragStart: null,
    s : null,
    min: 0,
    max: 0,
    range: null,
    size : 0,
    sliderIdx : 0,
    lastIdx: 0
};

let oldDiff = 0;

var initSliders = function() {

    if ( sliders.inited )
        return;
    if ( did("armcontrol").style.display == "none" )
        return;
    sliders.inited = true;
    sliders.s = [
        {id: "slidera", slider: $("slidera"), x: 0, lastX: 0, moved: true, "invert":true  }, 
        {id: "sliderb", slider: $("sliderb"), x: 0, lastX: 0, moved: true, "invert":false }, 
        {id: "sliderc", slider: $("sliderc"), x: 0, lastX: 0, moved: true, "invert":true  },
        {id: "sliderd", slider: $("sliderd"), x: 0, lastX: 0, moved: true, "invert":false }, 
        {id: "slidere", slider: $("slidere"), x: 0, lastX: 0, moved: true, "invert":false }, 
        {id: "sliderf", slider: $("sliderf"), x: 0, lastX: 0, moved: true, "invert":true  },
        {id: "sliderx", slider: $("sliderx"), x: 0, lastX: 0, moved: true, "invert":false }, 
        {id: "slidery", slider: $("slidery"), x: 0, lastX: 0, moved: true, "invert":false }
   ];
    
    
    sliders.range = $("slidersize");
    sliders.size = sliders.range.offsetWidth;
    sliders.min = -(sliders.size/2) + 15;
    sliders.max = sliders.size/2;
    var mid = 0;
    
    for( var i = 0; i < sliders.s.length; i++ )
    {
        sliders.s[i].slider.addEventListener('mousedown', sliderHandleMouseDown); 
        sliders.s[i].slider.addEventListener('touchstart', sliderHandleMouseDown);
        sliders.s[i].slider.style.transform = `translate3d(${mid}px,0px,0px)`;
    }
    document.addEventListener('mousemove', sliderHandleMouseMove);
    document.addEventListener('touchmove', sliderHandleMouseMove);

    document.addEventListener('mouseup', sliderHandleMouseUp);
    document.addEventListener('touchend', sliderHandleMouseUp);
    setInterval( "bringBack()", 100 );
}

function sliderHandleMouseDown(event) {
    for( var i = 0; i < sliders.s.length; i++ ){
        if( sliders.s[i].id == event.target.id)
            sliders.sliderIdx = i;
    }
    
    sliders.s[sliders.sliderIdx].slider.style.transition = '0s';
    
    if (event.changedTouches) {
      sliders.dragStart = {
        x: event.changedTouches[0].clientX,
        y: 0
      };
      return;
    }
    sliders.dragStart = {
        x: event.clientX,
        y:0
    };
  }
function sliderHandleMouseMove(event) {
    if (sliders.dragStart === null) return;
    event.preventDefault();
    if (event.changedTouches) {
      event.clientX = event.changedTouches[0].clientX;
       
    }
      
    const xDiff = event.clientX - sliders.dragStart.x;
    const distance = Math.min( sliders.maxDiff, sliders.xDiff);
    var s = sliders.s[sliders.sliderIdx];
      
    s.x = Math.min(sliders.max, xDiff + s.lastX);
    s.x = Math.max(sliders.min, s.x);
    if ( Math.abs(xDiff) - Math.abs(oldDiff) < 35 ) {
        sendCommands()
    }
    else {
	    
	console.log(xDiff)
    }
    console.log(Math.abs(xDiff) - Math.abs(oldDiff) )
    oldDiff = xDiff
    s.slider.style.transform = `translate3d(${sliders.s[sliders.sliderIdx].x}px, 0px, 0px)`;
    s.moved = true;
}
function sliderHandleMouseUp(event)
{
    if (sliders.dragStart === null) return;
    var s = sliders.s[sliders.sliderIdx];
    s.lastX = s.x;
    sliders.dragStart = null;
}
function getLastMovedSliderPosition(){
    return sliders.s[sliders.sliderIdx].x;
}

function bringBack()
{
    
    if ( sliders.dragStart !== null )
        return;
    for(i=0; i <sliders.s.length; i++ )
    {
        var s = sliders.s[i];
        if ( s.x == 0 )
            continue;
        if ( s.x < 0 )
        {
            s.x += 40;
            if ( s.x > 0 )
                s.x = 0;
        }
        else if ( s.x > 0 )
        {
            s.x -= 40;
            if ( s.x < 0 )
                s.x = 0;
        }
        s.lastX = s.x;
        s.slider.style.transform = `translate3d(${s.x}px, 0px, 0px)`;
        s.moved = true;
    }
}

function getSliderPosIfMoved(i)
{
    var s = sliders.s[sliders.sliderIdx];
    var r = {"moved": !s.moved, "pos": s.x };
    s.moved = false;
    return r;
}
