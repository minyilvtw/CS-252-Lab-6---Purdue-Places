console.log('CS 252 Lab6 - HTML Test');

document.addEventListener("click", mouseClick);

var palette = document.getElementById('palette');
var context2 = palette.getContext('2d');

palette.width = 440;
palette.height = 400;


var color = ['rgb(0,0,0)'
					,'rgb(255,0,0)'
					,'rgb(0,255,0)'
					,'rgb(0,0,255)'];
var colorIndex = 0;

var x,y;

context.fillRect(50,50,200,200);

for(var i = 0; i < 4; i ++){
	context.fillStyle = color[i];
	context.fillRect(palette.width-40,i*40,40,40);
}

for(var i = 4; i < 20; i ++){
	context.fillStyle = 'rgba(0,0,0,0.5)';
	context.fillRect(palette.width-40,i*40,40,40);
}

context.fillStyle = color[0];

function mouseClick(event) {
	// minus margin to get click position
    x = event.clientX - 15;
    y = event.clientY - 15;
    //console.log("first:"+x+" "+y);
    y = Math.round((y*10)/10);
    if(x % 10 < 5){
    	x = Math.floor(x / 10) * 10;
    } else {
    	x = Math.ceil(x / 10) * 10;
    }
    if(y % 10 < 5){
    	y = Math.floor(y / 10) * 10;
    } else {
    	y = Math.ceil(y / 10) * 10;
    }
    //console.log("second:"+x+" "+y);
    if(x > 0 && x < palette.width - 40){
    	if(canPaint){
    		paint(x, y, color);
    		canPaint = false;
    	} else {
    		console.log("WAIT");
    	}
	} else {
		if(y < 160){
			pickColor(x,y,color);
		}
	}
}


function pickColor(x, y, color){
	var choice = Math.round((y/40)) -1 ;
	console.log("index"+ choice);
	context.fillStyle = color[choice];
}
