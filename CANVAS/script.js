const particlesArray =[];
let hue =0; 


//GETTING THE CANVAS
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

//console.log(ctx);
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

//DRAWING A RECTANGLE
/* window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height= window.innerHeight;
    ctx.fillStyle = 'white';
    ctx.fillRect(10,10,50,50);
}) */

ctx.fillStyle = 'white';
ctx.fillRect(10,10,50,50);
//DRAWING A CIRCLE


const mouse ={
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x= event.x;
    mouse.y= event.y;
    

    for(let i=0; i<10; i++){
        particlesArray.push(new Particle());
    }
    
});

canvas.addEventListener('mousemove', function(event){
    mouse.x= event.x;
    mouse.y= event.y;

    for(let i=0; i<10; i++){
        particlesArray.push(new Particle());
    }
    
});


/* function drawCircle(){
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,50,0, Math.PI*2);
    ctx.fill();

} */

class Particle{
    constructor(){
        this.x= mouse.x;
        this.y= mouse.y;

       /*  this.x= Math.random()*canvas.width;
        this.y= Math.random()*canvas.height; */


        this.size= Math.random()*15+1;
        this.speedX= Math.random()*3-1.5;
        this.speedY= Math.random()*3-1.5;
        this.color = 'hsl('+hue+',100%, 50%)';
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size >0.2) this.size-=0.1;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0, Math.PI*2);
        ctx.fill();
    }
}
/* 
function init(){
    for(let i=0; i<1000; i++){
        particlesArray.push(new Particle());
    }
} */


function animate(){
    ctx.clearRect(0,0 ,canvas.width, canvas.height);
    //draw();
   /*  ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0,0, canvas.width, canvas.height); */

    handleParticles();
    requestAnimationFrame(animate);
    hue+=5;
}
// init();


function handleParticles(){
    for(let i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();

            for(let j=i; j<particlesArray.length ;j++){
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;

                const distance = Math.sqrt(dx*dx + dy*dy);
                if(distance <100){
                    ctx.beginPath();
                    ctx.strokeStyle= particlesArray[i].color;
                    ctx.lineWidth= particlesArray[i].size/5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }

            if(particlesArray[i].size <= 0.3){
                particlesArray.splice(i,1);
                i--;
               // console.log(particlesArray.length)
            }
    }
}


animate();



/* ctx.fillStyle = 'red';
ctx.strokeStyle='red';
ctx.lineWidth=5;
ctx.beginPath();
ctx.arc(100,100,50,0, Math.PI*2);
ctx.fill();
ctx.stroke(); */

