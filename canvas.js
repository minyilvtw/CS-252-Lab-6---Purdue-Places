console.log('CS 252 Lab6 - HTML Test');

document.addEventListener("click", mouseClick);

var canvas = document.querySelector('canvas');

canvas.width = 650; 	// 120 'px' + 10 'px' (pallette)
canvas.height = 400; 	// 80  'px'
var pixWidth = 120;
var pixHeight = 80;

var context = canvas.getContext('2d');
var currColor = 0;
var canPaint = true;
var color = ['rgb(0,0,0)' // Black
					,'rgb(255,0,0)' // Red
					,'rgb(0,255,0)' // Green
					,'rgb(0,0,255)' // Blue
 					,'rgb(128,0,0)' // Maroon?
 					,'rgb(255,255,255)']; // White

function initializeCanvas() {
	/* Filling in color pallete on right */
	for(var i = 0; i < 5; i ++){
		context.fillStyle = color[i];
		context.fillRect(canvas.width-40,i*40,40,40);
	}

	/* Filling in empty space on color pallette */
	for(var i = 5; i < 20; i ++){
		context.fillStyle = 'rgba(0,0,0,0.5)';
		context.fillRect(canvas.width-40,i*40,40,40);
	}

	context.fillStyle = color[0];

	setInterval(enablePaint, 3000);
}

function mouseClick(event) {

	/* Get mouse position */
	var pos = getMousePos(event);

    //console.log("second:"+x+" "+y);
    if ((pos.x > 0 && pos.y > 0) && (pos.x < canvas.width - 40 && pos.y < canvas.height)) {
	    
    	if (canPaint) {
    		setPixel(round(pos.x/5, 0), round(pos.y/5, 0), currColor);
    		canPaint = false;
			console.log("DRAW: (" + round(pos.x/5, 0) + ", " + round(pos.y/5, 0) + ")");
    	} else {
    		console.log("WAIT");
    	}
	    
	} else {
		if (pos.y < 160) {
			pickColor(pos.x, pos.y);
		}
	}
}

/* paint pixel given color (should be int) */
function paint(x, y, colorIndex){
	context.fillStyle = color[colorIndex];
	context.fillRect(x,y,10,10);
}

/* Get index from x, y */
function pickColor(x, y){
	currColor = Math.round((y/40)) - 1;
}

/* Colors the entire canvas using the 'canv' string */
function colorCanvas(canv){

	for (var i = 0; i < pixHeight; i++) {
		for (var j = 0; j < pixWidth; j++) {

			var index = (i * pixWidth) + j;
			paint(j * 5, i * 5, parseInt(canv[index]));

		}
	}
}

function enablePaint(){
	canPaint = true;
}

function getMousePos(event) {

	var rect = canvas.getBoundingClientRect();

	return {
      x: round(event.clientX - rect.left + 2, 0),
      y: round(event.clientY - rect.top - 3, 0)
    };
}

function round(value, decimals) {
  	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

initializeCanvas();

