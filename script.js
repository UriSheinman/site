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

// Attach event listeners to the elements
document.querySelector('header').addEventListener('click', redirectToUriSheinman);

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
    const allSpans = document.querySelectorAll('header span, main span');
    
    function flickerLetter() {
        // Pick a random letter to flicker
        const randomIndex = Math.floor(Math.random() * allSpans.length);
        const flickerCount = Math.floor(Math.random() * 2) + 1; // Flicker either 1 or 2 characters
        
        for (let i = 0; i < flickerCount; i++) {
            let indexToFlicker = randomIndex + (Math.random() < 0.5 ? -1 : 1); // Choose neighboring character
            if (indexToFlicker >= 0 && indexToFlicker < allSpans.length) {
                allSpans[indexToFlicker].classList.add('flicker');
                // Remove flicker class after a short time
                setTimeout(() => {
                    allSpans[indexToFlicker].classList.remove('flicker');
                }, Math.random() * 4000 + 1000); // Flicker duration between 1 to 5 seconds
            }
        }

        // Set a random delay for the next flicker
        const delay = Math.random() * 4000 + 1000;
        setTimeout(flickerLetter, delay);
    }

    // Start the first flicker
    flickerLetter();
}
