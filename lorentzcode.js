
function xlor(x,gamma,v,t) {  //position calculation
return gamma*(x-v*t);
}
	
function tlor(x,gamma,v,t){  //time calculation
return gamma*(t-v*x);
}

function gamma(v){        //γ calculation
return 1/Math.sqrt(1-v*v);
}

var colorArray =[
'#BDD3DE', //Light blue, use this for past points
'#FF9000', //Orange, use this for current point
'#FFFFFF', //Add light and dark blues and reds later...
];

//The velocity buttons
var current_velocity,step=0.01,Ntoys=10000;
//+ button
var button = document.createElement("button"); // 1. Create the button
button.innerHTML = "+0.01";

var body = document.getElementsByTagName("body")[0]; // 2. Append somewhere
body.appendChild(button);

button.addEventListener ("click", function() { // 3. Add event handler
current_velocity-=step;  
});
//- button
var button = document.createElement("button");
button.innerHTML = "-0.01";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener ("click", function() { 
current_velocity-=step;
});
// Auto button
var button = document.createElement("button");
button.innerHTML = "Auto";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener ("click", function() { 
	current_velocity=-1+1/Ntoys;
for (var i=0; i <Ntoys; i++) {
	current_velocity+=1/Ntoys;
	//draw()
}});  


var canvas1= document.querySelector('canvas');
console.log(canvas1);
canvas1.width = 500;  //graph1. This will be the x-t graph
canvas1.height = 500;
var context1 = canvas1.getContext('2d');

var mouse = {      //Clicking position structure
	x:undefined,
	y:undefined
}

var lorentz ={		//Output structure. Idk if I actually need this or if it is needlessly complicated
	x:undefined,
	y:undefined
}
	//Painting
function draw(x,y) {
	this.x=x;
	this.y=y;
	context1.beginPath();
	context1.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
	context1.fillStyle = colorArray[1]; // Colour needs some if statements to make nice and gradient like
	context1.fill();
	}

window.addEventListener('click',  //Listens for clicks and
	function(event)				  //Gives me the coordinates
	{							  //Not 100% accurate
	mouse.x=event.pageX;
	mouse.y=event.pageY;

	console.log("x:"+mouse.x+"y:"+mouse.y);
	// Add an if statement that draws only if you're inside canvas 1
	lorentz.x=xlor(mouse.x,gamma(0.7),0.7,mouse.y);
	lorentz.y=tlor(mouse.x,gamma(0.7),0.7,mouse.y);

	console.log("x:"+lorentz.x+"y:"+lorentz.y);
	draw(lorentz.x,lorentz.y);
	})

