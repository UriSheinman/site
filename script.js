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
    const wrappedText = text.split('').map(char => char === ' ' ? '&nbsp;' : `<span>${char}</span>`).join(''); // Preserve spaces
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

// Function to randomly flicker letters (excluding footer)
function startFlickeringEffect() {
    const allSpans = document.querySelectorAll('header span, main span');
    let flickeringIndexes = []; // Track flickering indexes

    function flickerLetter() {
        // Remove flicker from previous letters if any
        flickeringIndexes.forEach(index => {
            allSpans[index].classList.remove('flicker');
        });

        // Ensure no more than two characters are flickering at the same time
        if (flickeringIndexes.length >= 2) {
            return; // Don't initiate more flickers
        }

        // Pick a random index to flicker
        let randomIndex = Math.floor(Math.random() * allSpans.length);
        
        // Ensure the chosen character is not a space and isn't flickering already
        while (flickeringIndexes.includes(randomIndex) || allSpans[randomIndex].textContent.trim() === '') {
            randomIndex = Math.floor(Math.random() * allSpans.length);
        }

        // Add flicker to the selected character
        flickeringIndexes.push(randomIndex);
        allSpans[randomIndex].classList.add('flicker');

        // Neighboring flickering logic
        let shouldFlickerNeighbor = Math.random() < 0.5; // 50% chance to flicker a neighbor
        if (shouldFlickerNeighbor) {
            let neighboringIndex;
            let direction = Math.random() < 0.5 ? -1 : 1; // Pick random direction (-1 for left, 1 for right)

            // Check bounds and valid neighboring character
            neighboringIndex = randomIndex + direction;
            if (neighboringIndex >= 0 && neighboringIndex < allSpans.length && allSpans[neighboringIndex].textContent.trim() !== '') {
                flickeringIndexes.push(neighboringIndex);
                allSpans[neighboringIndex].classList.add('flicker');

                // Remove the neighboring flicker after a slight delay to make it independent
                setTimeout(() => {
                    allSpans[neighboringIndex].classList.remove('flicker');
                    flickeringIndexes = flickeringIndexes.filter(index => index !== neighboringIndex);
                }, Math.random() * 200 + 100); // A slight random delay
            }
        }

        // Remove flicker after a random delay (1-5 seconds)
        const flickerDuration = Math.random() * 4000 + 1000;
        setTimeout(() => {
            allSpans[randomIndex].classList.remove('flicker');
            flickeringIndexes = flickeringIndexes.filter(index => index !== randomIndex);
        }, flickerDuration);

        // Continue flickering with a random delay (ensures continuous flickering)
        const nextFlickerDelay = Math.random() * 1000 + 500; // Between 0.5 and 1.5 seconds
        setTimeout(flickerLetter, nextFlickerDelay);
    }

    // Start the first flicker
    flickerLetter();
}
