
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD3cGPVywJtRnm4vQMtwRM9DVQloAmyCso",
    authDomain: "boiler-canvas.firebaseapp.com",
    databaseURL: "https://boiler-canvas.firebaseio.com",
    projectId: "boiler-canvas",
    storageBucket: "boiler-canvas.appspot.com",
    messagingSenderId: "985213101820"
  };

  firebase.initializeApp(config);

  var x_max = 120;
  var y_max = 80;
  var map = null; // This is where pixel data is stored locally
	
  /* Gets the entire canvas data in string form */
  function getCanvas() {  

    firebase.database().ref('map/').once('value').then(function(snapshot) {
      map = snapshot.val().pixels;
      colorCanvas(map);
      //console.log(map);
    });

  }

  function getMap() {
  	return map;
  }

  /* Sets the entire canvas */
  function setCanvas(canv) {
	  
	  /* Set the canvas as the given string */
  	firebase.database().ref("map/").set({
		  pixels: canv
  	});

  }

  /* Sets a pixel of the canvas */
  function setPixel(x, y, val) {
	  
	  /* Get index of pixel to be changed */
    var index = (x_max * y) + x - 1;
	  
    /* Get current firebase map */
	  firebase.database().ref('map/').once('value').then(function(snapshot) {
      map = snapshot.val().pixels;

      //console.log("map["+index+"] used to be: "+ map[index]);

      //console.log("Setting to "+val+"...")

      /* Set index to new val */
      map = map.replaceAt(index, val.toString());

      //console.log("Now: map["+index+"] is: "+ map[index]);

      /* Update firebase */
      setCanvas(map);

      /* Update our canvas */
      colorCanvas(map);
    });

  }

  String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }
