var canvas = document.querySelector('canvas');
console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//fortwnw vivliothikes gia na kserei pws zwgrafizei
var context = canvas.getContext('2d');
/*
//zwgrafise tetragwno x,y,mhkos,ypsos
context.fillStyle = 'rgba(21,0,100,0.5)'; //xroma rgb kai alpha pairnei to xrwma toy amesws apo pano
context.fillRect(100,300,10,10);

//grammes
context.beginPath(); // molyvi panw/katw
context.moveTo(50,50);  //ksekina
context.lineTo(100,100); //katelhkse
context.lineTo(200,100);
context.strokeStyle = "pink"; //xromma
context.stroke();

//kampyles kai kykloi
// orismata arc x,y,aktina, startangle(rad), endangle(rad), drawcounterclockwise eiani boolean
context.beginPath();
context.arc(300,300, 30, 0, Math.PI * 2, false);
context.strokeStyle = 'blue';
context.stroke();

//polloi kykloi->for loop

for( var i=0; i<3;i++){
	var x = Math.random() * 3;
	context.beginPath();
	context.arc(300+i*x,300*x, 30, 0, Math.PI * 2, false);
	context.strokeStyle = 'blue';
	context.stroke();
}
*/

var mouse = {
	x:undefined,
	y:undefined
}

var maxRadius=40;

var colorArray =[
'#2B3A42',
'#3F5866',
'#BDD3DE',
'#F0F0DF',
'#FF9000',
];

window.addEventListener('mousemove',
	function(event)
	{
		mouse.x=event.x;
		mouse.y=event.y;
	})

window.addEventListener('resize',
	function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		init();
	})

function Circle(x,y,dx,dy,radius) { //ksekinaei me kefalaio gia na einai object
	this.x = x;
	this.y = y;
	this.dx= dx;
	this.dy= dy;
	this.radius= radius;
	this.minRadius= radius;

	this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
	this.draw = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fillStyle = this.color;
		context.fill();
		this.x+=this.dx;
		this.y+=this.dy;
	}

	this.update = function() {
		if (this.x+this.radius>innerWidth|| this.x-this.radius<0){ //bounce deksia aristera
		this.dx=-this.dx;
		}
		if (this.y+this.radius>innerHeight || this.y-this.radius<0){ //bounce panw katw
		this.dy=-this.dy;
		}

		//Interactivity
		if (mouse.x-this.x<50 && mouse.x-this.x>-50 
			&& mouse.y-this.y<50 && mouse.y-this.y>-50){
			if (this.radius<maxRadius)
				{this.radius+=1;}
		}
		else if (this.radius>this.minRadius){
			this.radius-=1;
		}
		this.draw();
	}
}

var circleArray=[];

function init(){

	circleArray=[];

	for (var i=0; i<500; i++){
	radius=Math.random()*3+1;
	var x=Math.random()*(innerWidth-radius*2)+radius;
	var y=Math.random()*(innerHeight-radius*2)+radius;
	var dx=2 * (Math.random()-0.49);
	var dy=2 * (Math.random()-0.49);
	circleArray.push(new Circle(x,y,dx,dy,radius));
	}}

function animate(){
	requestAnimationFrame(animate);
	context.clearRect(0,0,innerWidth,innerHeight);
	
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}
animate();
init();