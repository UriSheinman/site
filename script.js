// Function to get the current year plus one
function updateYear() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear + 1;
}

// Update year on page load
document.addEventListener('DOMContentLoaded', function() {
    updateYear();
    
    // Attach event listeners to the header element
    document.querySelector('header').addEventListener('click', redirectToUriSheinman);

    // Wrap characters in spans for flickering effect
    const header = document.querySelector('header h1');
    const mainHeading = document.querySelector('main h2');

    wrapCharactersWithSpan(header);
    wrapCharactersWithSpan(mainHeading);

    // Start the random flickering effect on page load
    startFlickeringEffect();
});

// Function to redirect to urisheinman.com when the header is clicked
function redirectToUriSheinman() {
    window.location.href = 'https://urisheinman.com';
}

// Function to wrap each character in a span
function wrapCharactersWithSpan(element) {
    const text = element.textContent;
    const wrappedText = text.split('').map(char => `<span>${char}</span>`).join('');
    element.innerHTML = wrappedText;
}

// Function to randomly flicker one letter at a time (excluding footer)
function startFlickeringEffect() {
    // Get all spans from header and main only
    const allSpans = document.querySelectorAll('header span, main span');
    let currentFlicker;

    function flickerLetter() {
        // Clear the previous flickering letter if it exists
        if (currentFlicker) {
            currentFlicker.classList.remove('flicker');
        }

        // Pick a random letter to flicker
        const randomIndex = Math.floor(Math.random() * allSpans.length);
        currentFlicker = allSpans[randomIndex];
        currentFlicker.classList.add('flicker');

        // Set a random delay for the next flicker (between 1 to 5 seconds)
        const delay = Math.random() * 4000 + 1000; // Between 1s and 5s
        setTimeout(flickerLetter, delay);
    }

    // Start the first flicker
    flickerLetter();
}
