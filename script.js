const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

resize();

window.addEventListener("resize", resize);

function resize(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

const particles = [];
const total = 2200;

function heart(t){

    const x = 16*Math.pow(Math.sin(t),3);

    const y =
    13*Math.cos(t)
    -5*Math.cos(2*t)
    -2*Math.cos(3*t)
    -Math.cos(4*t);

    return {x,y};
}

class Particle{

    constructor(){

        const t=Math.random()*Math.PI*2;

        const h=heart(t);

        this.tx=h.x*22;
        this.ty=-h.y*22;

        this.x=(Math.random()-0.5)*canvas.width;
        this.y=(Math.random()-0.5)*canvas.height;

        this.size=Math.random()*4+2;

        this.speed=Math.random()*0.03+0.02;

        this.alpha=Math.random();

    }

    update(){

        this.x += (canvas.width/2+this.tx-this.x)*this.speed;
        this.y += (canvas.height/2+this.ty-this.y)*this.speed;

        this.alpha+=0.05;

    }

    draw(){

        ctx.save();

        ctx.translate(this.x,this.y);

        ctx.scale(this.size/10,this.size/10);

        ctx.fillStyle=`rgba(255,120,180,0.8)`;

        ctx.shadowBlur=15;
        ctx.shadowColor="#ff69b4";

        drawHeart();

        ctx.restore();

    }

}

function drawHeart(){

    ctx.beginPath();

    ctx.moveTo(0,-3);

    ctx.bezierCurveTo(4,-8,10,-4,10,2);

    ctx.bezierCurveTo(10,8,0,14,0,18);

    ctx.bezierCurveTo(0,14,-10,8,-10,2);

    ctx.bezierCurveTo(-10,-4,-4,-8,0,-3);

    ctx.fill();

}

for(let i=0;i<total;i++){

    particles.push(new Particle());

}

function animate(){

    ctx.fillStyle="rgba(0,0,0,0.18)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);

}

animate();

const names = [
    "Thảo Ly ❤️",
    // "I Love You",
    "Happy Birthday",
    // "My Love"
];

let n = 0;
let c = 0;

const typing = document.getElementById("typing");

function run(){

    if(c < names[n].length){

        typing.innerHTML += names[n][c];

        c++;

        setTimeout(run,100);

    }else{

        setTimeout(erase,2000);

    }

}

function erase(){

    if(c>0){

        typing.innerHTML = names[n].substring(0,c-1);

        c--;

        setTimeout(erase,100);

    }else{

        n=(n+1)%names.length;

        setTimeout(run,500);

    }

}

run();

let player;
let videoId = "h-ionyfFf1c";

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: videoId,
            modestbranding: 1
        }
    });
}