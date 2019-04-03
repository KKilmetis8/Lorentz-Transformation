
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
context1.moveTo(0,0);
context1.lineTo(500,500);
context1.moveTo(0,500);
context1.lineTo(500,0);
context1.strokeStyle ="black";
context1.stroke();
context1.font= "18px Times New Roman";
context1.fillText("t",240,15);
context1.fillText("x",470,265);
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
context2.strokeStyle = "black";
context2.stroke();
context2.font= "18px Times New Roman";
context2.fillText("t'",240,15);
context2.fillText("x'",470,265);

//The velocity buttons
var current_velocity=0.01;
var step = 0.01, Ntoys = 10000, color = '#000000';
veldisp();
var colorArray =[
'#000000',//Black, 0      
'#8BAFFF', //Light  blue, 1
'#536EFF', //Medium blue, 2
'#2C37FF', //Blue, 3
'#2A377F', //Hard Blue, 4    
'#FF886D', //Light Red, 5
'#F2483F', //Medium Red, 6
'#FF5B35', //Red, 7
'#7F251A', //Hard red, 8
'#FF9000', //Orange, 9 use this for current point
'#BD90E1', //Violet, 10 for v=0 or not :p
];

//+ button
var buttonplus = document.getElementById("plus"); // 1. get the button
buttonplus.addEventListener("click",function() { // 2. Add event handler
current_velocity=current_velocity+step;
veldisp();
//u>0 colours
	if (current_velocity<0.75){
		color=colorArray[4];
	}
	if (current_velocity<0.75 && current_velocity>0.5){
		color=colorArray[3];
	}
	if (current_velocity<0.5 && current_velocity>0.25){
		color=colorArray[2];
	}
	if (current_velocity<0.25 && current_velocity>0){
		color=colorArray[1];
	}
	//u<0 colours
	if (current_velocity<-0.75){
		color=colorArray[8];
	}
	if (current_velocity>-0.75 && current_velocity<-0.5){
		color=colorArray[7];
	}
	if (current_velocity>-0.5 && current_velocity<-0.25){
		color=colorArray[6];
	}
	if (current_velocity>-0.25 && current_velocity<0){
		color=colorArray[5];
	}
	lorentz.x=xlor(perm.x,gamma(current_velocity),current_velocity,perm.y);  
	lorentz.y=tlor(perm.x,gamma(current_velocity),current_velocity,perm.y);
	lorentz.x=lorentz.x+250;
	lorentz.y=250+lorentz.y;
	draw2(lorentz.x,lorentz.y,color); 
	console.log("v="+current_velocity);
});

//- button
var buttonminus = document.getElementById("minus");
buttonminus.addEventListener("click", function() { 
current_velocity=current_velocity-step;
veldisp();
//u>0 colours
	if (current_velocity<0.75){
		color=colorArray[4];
	}
	if (current_velocity<0.75 && current_velocity>0.5){
		color=colorArray[3];
	}
	if (current_velocity<0.5 && current_velocity>0.25){
		color=colorArray[2];
	}
	if (current_velocity<0.25 && current_velocity>0){
		color=colorArray[1];
	}

	//u<0 colours
	if (current_velocity<-0.75){
		color=colorArray[8];
	}
	if (current_velocity>-0.75 && current_velocity<-0.5){
		color=colorArray[7];
	}
	if (current_velocity>-0.5 && current_velocity<-0.25){
		color=colorArray[6];
	}
	if (current_velocity>-0.25 && current_velocity<0){
		color=colorArray[5];
	}
	lorentz.x=xlor(perm.x,gamma(current_velocity),current_velocity,perm.y);  
	lorentz.y=tlor(perm.x,gamma(current_velocity),current_velocity,perm.y);
lorentz.x=lorentz.x+250;
lorentz.y=250+lorentz.y;
draw2(lorentz.x,lorentz.y,color);
console.log("v="+current_velocity);  
});

// Auto button
var buttonauto = document.getElementById("auto");
buttonauto.addEventListener ("click", function() { 
	current_velocity=-1+1/Ntoys;
for (var i=0; i <2*Ntoys; i++) {
	current_velocity+=1/Ntoys;

	//u>0 colours
	if (current_velocity<0.75){
		color=colorArray[4];
	}
	if (current_velocity<0.75 && current_velocity>0.5){
		color=colorArray[3];
	}
	if (current_velocity<0.5 && current_velocity>0.25){
		color=colorArray[2];
	}
	if (current_velocity<0.25 && current_velocity>0){
		color=colorArray[1];
	}

	//u<0 colours
	if (current_velocity<-0.75){
		color=colorArray[8];
	}
	if (current_velocity>-0.75 && current_velocity<-0.5){
		color=colorArray[7];
	}
	if (current_velocity>-0.5 && current_velocity<-0.25){
		color=colorArray[6];
	}
	if (current_velocity>-0.25 && current_velocity<0){
		color=colorArray[5];
	}

	lorentz.x=xlor(mouse.x,gamma(current_velocity),current_velocity,mouse.y);  
	lorentz.y=tlor(mouse.x,gamma(current_velocity),current_velocity,mouse.y);
	lorentz.x=lorentz.x+250;
	lorentz.y=250+lorentz.y;
	draw2(lorentz.x,lorentz.y,color);
	}
	current_velocity=0.01;
});

//Velocity Display
function veldisp(){
document.getElementById('velocitydisplay').innerHTML=("v="+Math.round(current_velocity*100)/100);
}

//Clean Button
var buttonclean=document.getElementById("clean"); 
buttonclean.addEventListener("click", function(){
	
	context1.clearRect(0,0,canvas1.width,canvas1.height); //clean
	context2.clearRect(0,0,canvas2.width,canvas2.height);
	//redraw canvas1
	context1.moveTo(250,500);
	context1.lineTo(250,0);
	context1.moveTo(500,250);
	context1.lineTo(0,250);
	context1.moveTo(0,0);
	context1.lineTo(500,500);
	context1.moveTo(0,500);
	context1.lineTo(500,0);
	context1.strokeStyle ="black";
	context1.stroke();
	context1.fillText("t",240,15);
	context1.fillText("x",470,265);
	//redraw canvas2
	context2.moveTo(250,500);
	context2.lineTo(250,0);
	context2.moveTo(500,250);
	context2.lineTo(0,250);
	context2.strokeStyle = "black";
	context2.stroke();
	context2.font= "18px Times New Roman";
	context2.fillStyle='black';
	context2.fillText("t'",240,15);
	context2.fillText("x'",470,265);

}) 

var mouse = {      //Clicking position structure
	x:undefined,
	y:undefined
}

var lorentz ={		//Output structure. 
	x:undefined,
	y:undefined
}
	//Painting
function draw1(x,y) {
	this.x=x;
	this.y=y;
	context1.beginPath();
	context1.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
	context1.fillStyle = "black";
	context1.fill();
	}

function draw2(x,y,color) {
	this.x=x;
	this.y=y;
	this.color=color;
	context2.beginPath();
	context2.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
	context2.fillStyle = this.color;
	context2.fill();
	}

var perm={
	x:undefined,
	y:undefined
}
function getperm(x,y){;
	x=x-250;
	y=y-250;
	perm.x=x;
	perm.y=y;
}
window.addEventListener('click',  //Listens for clicks and
	function()				     //Gives me the coordinates
	{

	mouse.x= event.pageX-10;
	mouse.y= event.pageY-175;
	console.log("x:"+mouse.x+"y:"+mouse.y);
	if(mouse.x<500){
	draw1(mouse.x,mouse.y);
	getperm(mouse.x,mouse.y);
	mouse.x=mouse.x-250;    //Makes for x 0->-250, 250->0, 500->250	
	mouse.y=mouse.y-250;
	lorentz.x=xlor(mouse.x,gamma(0.01),0.01,mouse.y);
	lorentz.y=tlor(mouse.x,gamma(0.01),0.01,mouse.y);
	
	lorentz.x=lorentz.x+250;
	lorentz.y=250+lorentz.y;
	
	console.log("x:"+lorentz.x+"y:"+lorentz.y);
	draw2(lorentz.x,lorentz.y,colorArray[9]);
	
	
}})

//	lorentz.x=xlor(perm.x,gamma(current_velocity),current_velocity,perm.y);  
//	lorentz.y=tlor(perm.x,gamma(current_velocity),current_velocity,perm.y);