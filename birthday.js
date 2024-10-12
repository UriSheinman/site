// Testing variable to enable or disable birthday mode
const testBirthdayMode = true; // Set to true to test birthday effects

// Check if today is the user's birthday or if test mode is enabled
function isBirthday() {
    const today = new Date();
    const birthdayMonth = 12; // December
    const birthdayDate = 29; // 29th
    return testBirthdayMode || (today.getMonth() + 1 === birthdayMonth && today.getDate() === birthdayDate);
}

// Show the birthday message and start confetti if it's the user's birthday
if (isBirthday()) {
    const birthdayMessage = document.createElement('p'); // Changed to 'p' to maintain consistency with other text
    birthdayMessage.id = 'birthday-message'; // Use the same ID for CSS styling
    birthdayMessage.innerHTML = "It's my birthday!"; // Message content
    const main = document.querySelector('main'); // Select the main element
    main.appendChild(birthdayMessage); // Append the message below the "Hi :)" message

    // Start confetti and disable particles
    createConfetti();
    particlesEnabled = false; // Ensure particles are turned off if confetti is active
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
    const particleCount = 300; // Number of confetti particles

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