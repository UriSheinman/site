// Update the year dynamically
function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Flickering effect for the page title
function flickerTitle() {
    const titleElement = document.title;
    const flickerCount = 5; // Number of flickers
    let currentFlicker = 0;

    const intervalId = setInterval(() => {
        document.title = currentFlicker % 2 === 0 ? 'Happy Birthday!' : titleElement;
        currentFlicker++;

        if (currentFlicker === flickerCount) {
            clearInterval(intervalId);
            document.title = titleElement; // Reset title after flickering
        }
    }, 500); // Flicker every 500 milliseconds
}

// Particle system for non-birthday days
function createParticles() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particlesArray = [];
    const particleCount = 100; // Number of particles

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1; // Particle size
            this.speedX = Math.random() * 5 - 2.5; // Random horizontal speed
            this.speedY = Math.random() * 5 - 2.5; // Random vertical speed
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Reset position if out of bounds
            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }

    function handleParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of particlesArray) {
            particle.update();
            particle.draw();
        }
    }

    function animateParticles() {
        handleParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Resize canvas when the window is resized
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Run functions
updateYear();
flickerTitle();
createParticles();