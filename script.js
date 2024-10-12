// Check if it's the user's birthday or if birthdayTestMode is enabled
const birthdayTestMode = true;  // Set this to 'false' when not testing

// Function to check if it's the user's birthday
function isBirthday() {
    const today = new Date();
    return (today.getMonth() === 11 && today.getDate() === 29) || birthdayTestMode;
}

// Update the year in the footer
function updateYear() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear + 1;
}

// Function to apply birthday styles
function applyBirthdayStyles() {
    if (isBirthday()) {
        document.body.classList.add('birthday-mode');
        document.querySelector('header h1').style.color = 'royalblue'; // Royal blue header
        const mainHeading = document.querySelector('main h2');
        mainHeading.textContent = "Hi :)";
        mainHeading.style.color = '#4b0082'; // Indigo for the "Hi :)"
        mainHeading.style.textShadow = '0 0 10px rgba(75, 0, 130, 0.8), 0 0 20px rgba(75, 0, 130, 0.6)';  // Indigo glow

        const birthdayText = document.createElement('span');
        birthdayText.textContent = "It's my birthday!";
        birthdayText.style.color = 'gold';  // Gold color for birthday text
        birthdayText.style.display = 'block';  // Display as a block element to be below the "Hi :)"
        birthdayText.classList.add('birthday-text');  // Add the class for flicker effect
        mainHeading.appendChild(birthdayText);

        startFlickeringEffect();  // Restart flickering effect including birthday text
        createConfettiParticles();  // Turn particles into confetti
    } else {
        startFlickeringEffect();  // Regular flickering
        createParticles();  // Regular particles
    }
}

// Apply wrapping and styles
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');
    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);
    applyBirthdayStyles();
    updateYear();
});

// Flickering function
function startFlickeringEffect() {
    const allSpans = document.querySelectorAll('header span, main span, footer span');
    let activeFlickers = [];

    function flickerLetter() {
        // Limit active flickers to two characters across the site
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

        // Apply neighboring flicker logic with 20% chance
        if (Math.random() < 0.2) {
            const neighborIndex = (randomIndex + 1) % allSpans.length;
            const neighborSpan = allSpans[neighborIndex];
            if (!neighborSpan.classList.contains('flicker')) {
                neighborSpan.classList.add('flicker');
                activeFlickers.push(neighborSpan);
            }
        }

        const delay = Math.random() * 3000 + 500;  // Random delay between 0.5 to 3.5 seconds
        setTimeout(flickerLetter, delay);
    }

    flickerLetter();
}

// Function for colorful confetti particles
function createConfettiParticles() {
    // Same logic as createParticles() but modify particle color and shape for confetti
}

// Function for regular particles
function createParticles() {
    // Your existing particle code here
}