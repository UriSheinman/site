// Toggle birthday mode (set to true to test the effect)
const isBirthday = true; // Change this to true to simulate birthday mode

let regularParticlesActive = true; // Flag to control regular particles

function checkBirthday() {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), 11, 29); // December 29
    return today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate();
}

function updateForBirthday() {
    const birthdayMessage = document.getElementById('birthday-message'); // Get the existing birthday message element
    birthdayMessage.textContent = "It's my birthday!";
    birthdayMessage.style.display = "block"; // Make it visible
    createConfetti(); // Call to create confetti effect
    regularParticlesActive = false; // Disable regular particles
}

function createConfetti() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1'; // Place canvas above other content
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particlesArray = [];
    const particleCount = 100; // Number of particles

    class ConfettiParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 10 + 5; // Random size
            this.speedX = (Math.random() * 3) - 1.5; // Random horizontal speed
            this.speedY = Math.random() * 3 + 2; // Fall speed
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        }

        update() {
            this.y += this.speedY; // Move downwards
            this.x += this.speedX; // Move horizontally
            // Reset particle position if it goes off-screen
            if (this.y > canvas.height) {
                this.y = 0; // Reset to the top
                this.x = Math.random() * canvas.width; // Random horizontal position
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size); // Draw square particle
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particlesArray.push(new ConfettiParticle(x, y));
        }
    }

    function handleParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
    }

    function animateParticles() {
        handleParticles();
        requestAnimationFrame(animateParticles); // Loop animation
    }

    initParticles();
    animateParticles();
}

// Execute the birthday check on page load
document.addEventListener('DOMContentLoaded', function () {
    if (isBirthday || checkBirthday()) {
        updateForBirthday();
    } else {
        // Start regular particles if not birthday
        if (regularParticlesActive) {
            createRegularParticles(); // Call your regular particle function here if it exists
        }
    }
});