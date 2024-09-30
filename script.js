// Function to get the current year plus one
function updateYear() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear + 1;
}

// Update year on page load
document.addEventListener('DOMContentLoaded', updateYear);

// Function to redirect to urisheinman.com when the header is clicked
function redirectToUriSheinman() {
    window.location.href = 'https://urisheinman.com';
}

// Function to handle the click on the main content
let clickCount = 0; // Counter to track clicks

function handleClick() {
    clickCount++;
    
    // Brightness effect on the text
    const mainText = document.querySelector('main h2');
    const headerText = document.querySelector('header h1');
    const footerText = document.querySelector('footer p');

    // Create a brightening effect
    let brightness = 1;
    const brightenInterval = setInterval(() => {
        brightness += 0.05; // Increase brightness
        mainText.style.filter = `brightness(${brightness})`;
        headerText.style.filter = `brightness(${brightness})`;
        footerText.style.filter = `brightness(${brightness})`;

        // Flash effect
        if (brightness >= 3) {
            clearInterval(brightenInterval);
            const flashInterval = setInterval(() => {
                const currentOpacity = parseFloat(mainText.style.opacity) || 1;
                const newOpacity = currentOpacity === 1 ? 0 : 1;
                mainText.style.opacity = newOpacity;
                headerText.style.opacity = newOpacity;
                footerText.style.opacity = newOpacity;

                // Stop flashing after 1 second
                if (newOpacity === 1) {
                    clearInterval(flashInterval);
                    turnOffText();
                }
            }, 100); // Flash every 100ms
        }
    }, 100); // Brighten every 100ms
}

// Function to turn off all text except smiley
function turnOffText() {
    const mainText = document.querySelector('main h2');
    const headerText = document.querySelector('header h1');
    const footerText = document.querySelector('footer p');

    // Set opacity to 0 for all text
    mainText.style.opacity = 0;
    headerText.style.opacity = 0;
    footerText.style.opacity = 0;

    // Ensure the smiley still flickers
    startFlickeringEffect();
}

// Attach event listeners to the elements
document.querySelector('header').addEventListener('click', redirectToUriSheinman);
document.querySelector('main h2').addEventListener('click', handleClick);


// Function to wrap each character in a span, but exclude the footer
function wrapCharactersWithSpan(element) {
    const text = element.textContent;
    const wrappedText = text.split('').map(char => `<span>${char}</span>`).join('');
    element.innerHTML = wrappedText;
}

// Apply the wrapping to header and main content only (no footer)
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');

    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);

    // Start the random flickering effect
    startFlickeringEffect();
});

// Function to randomly flicker one letter at a time (excluding footer)
function startFlickeringEffect() {
    // Get all spans from header and main only
    const allSpans = document.querySelectorAll('header span, main span');
    let currentFlicker = null;

    function flickerLetter() {
        // Clear the previous flickering letter if it exists
        if (currentFlicker) {
            currentFlicker.classList.remove('flicker');
        }

        // Choose a random index for flickering
        const randomIndex = Math.floor(Math.random() * allSpans.length);
        currentFlicker = allSpans[randomIndex];
        
        // Add the flicker class
        currentFlicker.classList.add('flicker');

        // Randomly determine if adjacent characters should flicker
        if (randomIndex > 0) {
            const adjacentLeft = allSpans[randomIndex - 1];
            if (Math.random() < 0.5) { // 50% chance to flicker adjacent left character
                adjacentLeft.classList.add('flicker');
                setTimeout(() => adjacentLeft.classList.remove('flicker'), 200); // Flicker duration
            }
        }
        if (randomIndex < allSpans.length - 1) {
            const adjacentRight = allSpans[randomIndex + 1];
            if (Math.random() < 0.5) { // 50% chance to flicker adjacent right character
                adjacentRight.classList.add('flicker');
                setTimeout(() => adjacentRight.classList.remove('flicker'), 200); // Flicker duration
            }
        }

        // Set a random delay for the next flicker (between 1 to 5 seconds)
        const delay = Math.random() * 4000 + 1000;
        setTimeout(flickerLetter, delay);
    }

    // Start the first flicker
    flickerLetter();
}
