// Test mode to preview the birthday theme
const testBirthdayMode = true;  // Set to true to test birthday mode

// Update the year in the footer
function updateYear() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear + 1;
}

// Check if today is the birthday (or if test mode is on)
function isBirthday() {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), 11, 29); // December 29
    return testBirthdayMode || (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate());
}

// Apply birthday theme
function applyBirthdayTheme() {
    document.body.style.backgroundColor = "#4B0082"; // Bordeaux red background
    document.querySelector('header h1').style.color = "gold"; // Gold header
    document.querySelector('main h2').style.color = "blue"; // Blue "Hi"
    document.querySelector('footer p').style.color = "purple"; // Purple footer text

    const birthdayMessage = document.getElementById("birthday-message");
    birthdayMessage.textContent = "It's my birthday!";
    birthdayMessage.style.color = "gold";
    birthdayMessage.style.fontSize = "2rem";
    
    createConfetti(); // Replace particles with confetti effect
}

// Normal particle system for non-birthday days
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
    let particlesArray = [];
    const particleCount = 100;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() * 0.5) - 0.25;
            this.speedY = (Math.random() * 0.5) - 0.25;
            this.alpha = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particlesArray.push(new Particle(x, y));
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
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

// Confetti system for the birthday
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
    let confettiArray = [];
    const confettiCount = 200;

    class Confetti {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.color = color;
            this.speedX = (Math.random() * 2 - 1);
            this.speedY = (Math.random() * 3 + 1);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y > canvas.height) {
                this.y = 0 - this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    function initConfetti() {
        confettiArray = [];
        const colors = ["blue", "purple", "gold", "#800020"]; // Bordeaux red
        for (let i = 0; i < confettiCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = colors[Math.floor(Math.random() * colors.length)];
            confettiArray.push(new Confetti(x, y, color));
        }
    }

    function handleConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < confettiArray.length; i++) {
            confettiArray[i].update();
            confettiArray[i].draw();
        }
    }

    function animateConfetti() {
        handleConfetti();
        requestAnimationFrame(animateConfetti);
    }

    initConfetti();
    animateConfetti();

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initConfetti();
    });
}

// Update year on page load
document.addEventListener('DOMContentLoaded', function () {
    updateYear();
    if (isBirthday()) {
        applyBirthdayTheme();
    } else {
        createParticles(); // Default particle effect
    }
});

// Function to redirect to a URL when header is clicked
function redirectToUriSheinman() {
    window.location.href = 'https://urisheinman.com';
}

// Attach event listeners
document.querySelector('header').addEventListener('click', redirectToUriSheinman);

// Function to wrap each character in a span
function wrapCharactersWithSpan(element) {
    const text = element.textContent;
    const wrappedText = text.split('').map(char => char === ' ' ? ' ' : `<span>${char}</span>`).join('');
    element.innerHTML = wrappedText;
}

// Apply wrapping to header and main content only
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');
    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);
    startFlickeringEffect();
});

// Flicker effect with maximum 2 characters at a time and random neighboring flicker
function startFlickeringEffect() {
    const allSpans = document.querySelectorAll('header span, main span');
    let activeFlickers = [];

    function flickerLetter() {
        if (activeFlickers.length >= 2) {
            const spanToReset = activeFlickers.shift();
            spanToReset.classList.remove('flicker');
        }

        let randomIndex = Math.floor(Math.random() * allSpans.length);
        let randomSpan = allSpans[randomIndex];

        if (!randomSpan.classList.contains('flicker')) {
            randomSpan.classList.add('flicker');
            activeFlickers.push(randomSpan);
        }

        if (Math.random() < 0.2) {
            const neighborIndex = (randomIndex + 1) % allSpans.length;
            const neighborSpan = allSpans[neighborIndex];
            if (!neighborSpan.classList.contains('flicker')) {
                neighborSpan.classList.add('flicker');
                activeFlickers.push(neighborSpan);
            }
        }

        const delay = Math.random() * 3000 + 500;
        setTimeout(flickerLetter, delay);
    }

    flickerLetter();
}