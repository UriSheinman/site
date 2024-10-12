document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');
    const birthdayText = document.createElement('p');
    const body = document.body;
    let isBirthday = false; // Change to true to test birthday mode

    // Set the birthday text style
    birthdayText.textContent = "It's my birthday!";
    birthdayText.classList.add('flicker-birthday');
    birthdayText.style.color = "gold";
    birthdayText.style.fontSize = '5vw';
    birthdayText.style.marginTop = '20px';

    // Append the birthday text under the main heading only in birthday mode
    if (isBirthday) {
        mainHeading.appendChild(birthdayText);
    }

    // Set styles based on whether it is birthday or not
    if (isBirthday) {
        body.style.backgroundColor = '#800020'; // Burgundy background
        header.style.color = 'royalblue'; // Royal blue header
        mainHeading.style.color = 'indigo'; // Indigo for Hi
        birthdayText.style.color = 'gold'; // Gold for birthday text
        createConfetti(); // Call the confetti function for birthday mode
    } else {
        body.style.backgroundColor = '#000000'; // Default black background
        header.style.color = '#ffffff'; // White header text
        mainHeading.style.color = '#ffffff'; // White for Hi
    }

    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);
    if (isBirthday) wrapCharactersWithSpan(birthdayText);

    startFlickeringEffect();

    // Function to wrap characters
    function wrapCharactersWithSpan(element) {
        const text = element.textContent;
        const wrappedText = text.split('').map(char => char === ' ' ? ' ' : `<span>${char}</span>`).join('');
        element.innerHTML = wrappedText;
    }

    // Flicker effect logic
    function startFlickeringEffect() {
        const allSpans = document.querySelectorAll('header span, main span, p span');
        let activeFlickers = [];

        function flickerLetter() {
            // Limit the number of flickering characters to 2 at any time
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

            // Random neighboring flicker
            if (Math.random() < 0.2) { // 20% chance of neighboring flicker
                const neighborIndex = (randomIndex + 1) % allSpans.length;
                const neighborSpan = allSpans[neighborIndex];
                if (!neighborSpan.classList.contains('flicker')) {
                    neighborSpan.classList.add('flicker');
                    activeFlickers.push(neighborSpan);
                }
            }

            const delay = Math.random() * 3000 + 500; // Random delay between 0.5 to 3.5 seconds
            setTimeout(flickerLetter, delay);
        }

        flickerLetter();
    }

    // Function to create confetti particles
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
        let particlesArray = [];
        const particleCount = 100;

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() * 0.5) - 0.25;
                this.speedY = (Math.random() * 0.5) - 0.25;
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Reset particle position if it goes off-screen
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
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
});