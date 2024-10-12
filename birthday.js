// Testing variable to enable or disable birthday mode
const testBirthdayMode = true; // Set to true to test birthday effects

// Check if today is the user's birthday or if test mode is enabled
function isBirthday() {
    const today = new Date();
    const birthdayMonth = 12; // December
    const birthdayDate = 29; // 29th
    return testBirthdayMode || (today.getMonth() + 1 === birthdayMonth && today.getDate() === birthdayDate);
}

// Create and show the birthday message if it's the user's birthday
if (isBirthday()) {
    // Check if the message already exists
    if (!document.getElementById('birthday-message')) {
        const birthdayMessage = document.createElement('div');
        birthdayMessage.id = 'birthday-message';
        birthdayMessage.innerHTML = "It's my birthday!";
        document.body.appendChild(birthdayMessage);

        // Start confetti
        createConfetti(); // Start confetti animation
    }
}

// Confetti creation logic
function createConfetti() {
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
    const particleCount = 150; // Reduced number of confetti particles for mobile

    class ConfettiParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 5; // Size of confetti
            this.speedY = Math.random() * 3 + 1; // Falling speed
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        }

        update() {
            this.y += this.speedY;
            if (this.y > canvas.height) {
                this.y = 0; // Reset to top if off screen
                this.x = Math.random() * canvas.width; // Random x position
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.size, this.size);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initConfetti() {
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particlesArray.push(new ConfettiParticle(x, y));
        }
    }

    function handleConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of particlesArray) {
            particle.update();
            particle.draw();
        }
    }

    function animateConfetti() {
        handleConfetti();
        requestAnimationFrame(animateConfetti);
    }

    initConfetti();
    animateConfetti();

    // Resize canvas when window is resized
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* Birthday message styling */
#birthday-message {
    font-family: 'SUSE', sans-serif; /* Use your site's font */
    font-size: 2rem; /* Adjust size as needed */
    color: #ffffff; /* White text */
    text-align: center; /* Center the message */
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6); /* Glowing effect */
    position: absolute; /* Use absolute positioning */
    top: calc(2rem + 5em); /* Adjust this value to position below the Hi message */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%); /* Adjust to truly center it */
    z-index: 1000; /* Ensure it's on top of other elements */
    animation: flicker 1s infinite; /* Add flickering effect */
}

/* Flicker effect */
@keyframes flicker {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5; /* Adjust flicker intensity */
    }
    100% {
        opacity: 1;
    }
}