


// Scroll animation
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      sec.classList.add('show');
    }
  });
});

// Network Particle Background
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 120;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 2;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for(let i=0;i<numberOfParticles;i++){
    particlesArray.push(new Particle());
  }
}

function connect() {
  for(let a=0;a<particlesArray.length;a++){
    for(let b=a;b<particlesArray.length;b++){
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = dx*dx + dy*dy;
      if(distance < 10000){
        ctx.strokeStyle = "rgba(0,255,255,0.15)";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update();p.draw();});
  connect();
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});


// ===== CLICK SOUND & LINK HANDLING =====
(function () {
  const clickSound = new Audio("click.mp3"); // adjust path if needed
  clickSound.volume = 0.6;

  document.addEventListener("click", function (e) {
    const el = e.target.closest("a, button");
    if (!el) return;

    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    // Handle link navigation
    if (el.tagName.toLowerCase() === "a") {
      const href = el.getAttribute("href");
      const target = el.getAttribute("target");

      // Skip tel: and hash links
      if (href && !href.startsWith("tel:") && !href.startsWith("#")) {
        e.preventDefault(); // stop immediate navigation

        setTimeout(() => {
          if (target === "_blank") {
            window.open(href, "_blank"); // open in new tab
          } else {
            window.location.href = href; // same tab
          }
        }, 120); // short delay for click sound
      }
    }
  });
})();