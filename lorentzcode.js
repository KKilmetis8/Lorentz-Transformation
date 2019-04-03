
function xlor(x,gamma,v,t) {  //position calculation
return gamma*(x-v*t);
}
	
function tlor(x,gamma,v,t){  //time calculation
return gamma*(t-v*x);
}

function gamma(v){        //γ calculation
return 1/Math.sqrt(1-v*v);
}

var canvas1= document.getElementById('mycanvas1');
console.log(canvas1);
canvas1.width = 500;  //graph1. This will be the x-t graph
canvas1.height = 500;
var context1 = canvas1.getContext('2d');
context1.moveTo(250,500);
context1.lineTo(250,0);
context1.moveTo(500,250);
context1.lineTo(0,250);
context1.strokeStyle ="black";
context1.stroke();
//vale x,x' kai t,t' stous akswnes mporw na to kanw me poly fudge tropo sthn html

var canvas2= document.getElementById('mycanvas2');
console.log(canvas2);
var context2 = canvas2.getContext('2d');
canvas2.width = 500;  //graph2 this will be the x'-t' graph
canvas2.height= 500;
context2.moveTo(250,500);
context2.lineTo(250,0);
context2.moveTo(500,250);
context2.lineTo(0,250);
context2.strokeStyle ="black";
context2.stroke();

//The velocity buttons
var current_velocity=0.01,step=0.01,Ntoys=10000;

//+ button
var buttonplus = document.getElementById("plus"); // 1. get the button
buttonplus.addEventListener ("click", function() { // 3. Add event handler
current_velocity+=step;
lorentz.x=xlor(mouse.x,gamma(current_velocity),current_velocity,mouse.y);
lorentz.y=tlor(mouse.x,gamma(current_velocity),current_velocity,mouse.y);
draw2(lorentz.x,lorentz.y,0);  
});

//- button
var buttonminus = document.getElementById("minus");
buttonminus.addEventListener ("click", function() { 
current_velocity-=step;
lorentz.x=xlor(mouse.x,gamma(current_velocity),current_velocity,mouse.y);
lorentz.y=tlor(mouse.x,gamma(current_velocity),current_velocity,mouse.y);
draw2(lorentz.x,lorentz.y,0);  
});

// Auto button
var buttonauto = document.getElementById("auto");
buttonauto.addEventListener ("click", function() { 
	current_velocity=-1+1/Ntoys;
for (var i=0; i <2*Ntoys; i++) {
	current_velocity+=1/Ntoys;
	lorentz.x=xlor(mouse.x,gamma(current_velocity),current_velocity,mouse.y);  //add if for colours!
	lorentz.y=tlor(mouse.x,gamma(current_velocity),current_velocity,mouse.y);
	lorentz.x=lorentz.x+250;
		lorentz.y=250+lorentz.y
	draw2(lorentz.x,lorentz.y,0);  
}});  

var colorArray =[
'#000000',//Black
'#BDD3DE', //Light  blue
'#FFFFFF', //Medium blue
'#BDD3DE', //Blue,
'#FF9000', //Hard Blue,    
'#FFFFFF', //Light Red,
'#BDD3DE', //Medium Red,
'#FF9000', //Red, 
'#FFFFFF', //Hard red,
'#FF9000', //Orange, use this for current point
];

var color=0;
//u>0 colours
if (current_velocity<0.75)
	color=colorArray[1];
if (current_velocity<0.75 && current_velocity>0.5)
	color=2;//add color arrays
if (current_velocity<0.5 && current_velocity>0.25)
	color=3;
if (current_velocity<0.25 && current_velocity>0)
	color=4;
//u<0 colours
if (current_velocity<-0.75)
	color=5;
if (current_velocity>-0.75 && current_velocity<-0.5)
	color=6;
if (current_velocity>-0.5 && current_velocity<-0.25)
	color=7;
if (current_velocity>-0.25 && current_velocity<0)
	color=8;

var mouse = {      //Clicking position structure
	x:undefined,
	y:undefined
}

var lorentz ={		//Output structure. Idk if I actually need this or if it is needlessly complicated
	x:undefined,
	y:undefined
}
	//Painting
function draw1(x,y) {
	this.x=x;
	this.y=y;
	this.color=color;
	context1.beginPath();
	context1.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
	context1.fillStyle = "black"
	context1.fill();
	}

function draw2(x,y,color) {
	this.x=x;
	this.y=y;
	this.color=color;
	context2.beginPath();
	context2.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
	context2.fillStyle = colorArray[this.color];
	context2.fill();
	}


window.addEventListener('click',  //Listens for clicks and
	function(event)				  //Gives me the coordinates
	{							  
	mouse.x= event.pageX-10;
	mouse.y= event.pageY-175;
	console.log("x:"+mouse.x+"y:"+mouse.y);
	draw1(mouse.x,mouse.y);
		mouse.x=mouse.x-250;    //Makes for x 0->-250, 250->0, 500->250	
		mouse.y=250-mouse.y;
	
		lorentz.x=xlor(mouse.x,gamma(0.01),0.01,mouse.y);
		lorentz.y=tlor(mouse.x,gamma(0.01),0.01,mouse.y);
		// console.log("x:"+lorentz.x+"y:"+lorentz.y);
		lorentz.x=lorentz.x+250;
		lorentz.y=250+lorentz.y
		draw2(lorentz.x,lorentz.y,colorArray[2]);
	})

