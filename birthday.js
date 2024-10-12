// Toggle variable for testing
const isBirthday = true; // Set to true to enable birthday mode; false for regular mode.

const birthdayMessage = document.getElementById('birthday-message');

// Function to check if today is the user's birthday
function isTodayBirthday() {
    const today = new Date();
    return today.getMonth() === 11 && today.getDate() === 29; // December 29
}

// Show birthday message and confetti if it's the user's birthday
function handleBirthdayEffect() {
    if (isBirthday || isTodayBirthday()) {
        birthdayMessage.style.display = 'block'; // Show birthday message
        createConfetti(); // Start confetti effect
    }
}

// Function to create confetti
function createConfetti() {
    // Stop existing particles if necessary
    stopParticles();

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1'; // Ensure confetti is above other elements
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const confettiCount = 200;
    const particles = [];

    class ConfettiParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 10 + 5; // Random size for confetti
            this.speedX = Math.random() * 4 - 2; // Random horizontal speed
            this.speedY = Math.random() * 5 + 2; // Random vertical speed
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Reset particle position if it goes off-screen
            if (this.y > canvas.height) {
                this.x = Math.random() * canvas.width;
                this.y = -10; // Start from above the canvas
                this.speedY = Math.random() * 5 + 2; // Reset speed
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.size, this.size); // Square shape
            ctx.closePath();
            ctx.fill();
        }
    }

    // Initialize confetti particles
    for (let i = 0; i < confettiCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new ConfettiParticle(x, y));
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();

    // Resize canvas when window is resized
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Function to stop any existing particle effect
function stopParticles() {
    const existingCanvas = document.querySelector('canvas');
    if (existingCanvas) {
        existingCanvas.remove(); // Remove existing canvas for particles
    }
}

// Call function to handle birthday effect
handleBirthdayEffect();