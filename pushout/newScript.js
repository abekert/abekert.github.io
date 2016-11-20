window.onload = function() {
    document.PushOut = [];  
    document.cursorX = 0;
    document.cursorY = 0;
    document.startScroll = false;
    document.animate = false;
    window.onmousemove = mouseMove;
    window.onresize = resize;
    window.addEventListener("deviceorientation", handleOrientation, true);
    window.addEventListener("devicemotion", deviceMotion, true);
    
    window.addEventListener("click", click, true);
    window.addEventListener("touchstart", click, true);
    
    var label = document.getElementById('label');   
    label.startPositionX = 400;
    label.startPositionY = -190;
    label.isShadow = false;
    document.PushOut.push(label);
    
    
    var labelShadow = document.getElementById('label-shadow');   
    labelShadow.startPositionX = 400;
    labelShadow.startPositionY = -190;
    labelShadow.isShadow = true;
    document.PushOut.push(labelShadow);
    
    var giraffes = document.getElementById('giraffes');   
    giraffes.startPositionX = 400;    
    giraffes.startPositionY = 690;
    giraffes.isShadow = false;
    document.PushOut.push(giraffes);
    
    var giraffesShadow = document.getElementById('giraffes-shadow');   
    giraffesShadow.startPositionX = 400;    
    giraffesShadow.startPositionY = 690;
    giraffesShadow.isShadow = true;
    document.PushOut.push(giraffesShadow);
    
    var boardShadow = document.getElementById('board-shadow');   
    boardShadow.startPositionX = 335;    
    boardShadow.startPositionY = 300; 
    boardShadow.isShadow = true;
    document.PushOut.push(boardShadow);   
    
    var sea = document.getElementById('sea');   
    sea.startPositionX = 0;    
    sea.startPositionY = -200;
    sea.isShadow = true;
    document.PushOut.push(sea);      
}



function windowWidth() {
    var x = 0;
    if (self.innerHeight)
        x = self.innerWidth;
    else if (document.documentElement && document.documentElement.clientHeight)
        x = document.documentElement.clientWidth;
    else if (document.body)
        x = document.body.clientWidth;
    return x;
}

function windowHeight() {
    var y = 0;
    if (self.innerHeight)
        y = self.innerHeight;
    else if (document.documentElement && document.documentElement.clientHeight)
        y = document.documentElement.clientHeight;
    else if (document.body)
        y = document.body.clientHeight;
    return y;
}


function paralax(cursorX, cursorY) {
    var pxInEM = 16;    
    var elements = document.PushOut;
    
    for(var i = 0; i < elements.length; i++)
    {   
        var diraction = -1;
        if (elements[i].isShadow)
            diraction = 1;
            
        elements[i].positionX = (elements[i].startPositionX - (diraction * ((elements[i].startPositionX - cursorX) / 60))) / pxInEM;
        elements[i].positionY = (elements[i].startPositionY + (diraction * ((elements[i].startPositionY - cursorY) / 40))) / pxInEM;
        
        elements[i].style.marginLeft = -elements[i].positionX + 'em';
        elements[i].style.top  = elements[i].positionY + 'em';   
    }    
     
}


function resize() {    
    var elements = document.PushOut;
    
    for(var i = 0; i < elements.length - 1; i++)
    {         
        elements[i].style.left = '50%';
    }   
    
    console.log('RESIZE');
}


function mouseMove(evt) {
    if (!document.animate)
    {
        evt = (evt || event);   

        document.cursorX = evt.clientX;
        document.cursorY = evt.clientY;

        console.log('MOUSEMOVE');

        paralax(evt.clientX, evt.clientY);    
    }
}



function handleOrientation(evt) {
    window.alpha = parseInt(event.alpha);   
    window.beta = parseInt(event.beta);   
    window.gamma = parseInt(event.gamma);   
}

   
function deviceMotion(event) {

    if(!device.desktop())
    {
    var accX = parseInt(event.accelerationIncludingGravity.x * 10);
    var accY = parseInt(event.accelerationIncludingGravity.y * 10);
    var accZ = parseInt(event.accelerationIncludingGravity.z * 10);
    var alpha = Math.sin(window.alpha * Math.PI / 180);
    var beta = window.beta;
    var gamma = window.gamma;
    var position = '';
    var X = 0;
    var Y = 0;
    
    var halfWidth = windowWidth() / 2;
    var halfHeight = windowHeight() / 2;
    
    if(gamma > -90 && gamma < 90 && device.landscape())
    { 
       position = 'bottom';
       X = (windowWidth() * accY / 100);
       Y = -(windowHeight() * accX / 100);
    }
       
    if(beta > -90 && beta < 90 && device.portrait())
    {
        X = (windowWidth() * accX / 100);
        Y = -(windowHeight() * accY / 100);
        position = 'bottom';
       
    }
    
     if(beta <= -45 || beta >= 45)
    {
        X += alpha * 1000;
       position = 'side';
    }
        
    paralax(X, Y);
    }
}


function click(event) { 
    var like = document.getElementById('facebook-like');
    if(event.target == like)
        facebookLike();
    else
        facebookHide();    
}

function facebookLike() {
    var like = document.getElementById('facebook-like').style.visibility = "visible";  
}


function facebookHide() {
    var like = document.getElementById('facebook-like').style.visibility = "hidden";  
}