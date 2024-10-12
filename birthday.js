// Toggle birthday mode (set to true to test the effect)
const isBirthday = false; // Change this to true to simulate birthday mode

function checkBirthday() {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), 11, 29); // December 29
    return today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate();
}

function updateForBirthday() {
    const main = document.querySelector('main');
    const birthdayMessage = document.createElement('p');
    birthdayMessage.classList.add('birthday-message');
    birthdayMessage.textContent = "It's my birthday!";
    main.appendChild(birthdayMessage);
    createConfetti(); // Call to create confetti effect
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
    const particleCount = 200;

    class ConfettiParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 5; // Increase size for better visibility
            this.speedX = (Math.random() * 5) - 2.5;
            this.speedY = Math.random() * 2 + 1; // Start moving upwards
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1; // Fade effect
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
            if (particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1); // Remove small particles
                i--;
            }
        }
    }

    function animateParticles() {
        handleParticles();
        if (particlesArray.length > 0) {
            requestAnimationFrame(animateParticles);
        } else {
            document.body.removeChild(canvas); // Remove canvas when done
        }
    }

    initParticles();
    animateParticles();
}

// Execute the birthday check on page load
document.addEventListener('DOMContentLoaded', function () {
    if (isBirthday || checkBirthday()) {
        updateForBirthday();
    }
});