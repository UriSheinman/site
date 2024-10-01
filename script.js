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
    let currentFlicker = null;

    function flickerLetter() {
        // Clear the previous flickering letter
        if (currentFlicker) {
            currentFlicker.classList.remove('flicker');
        }

        // Pick a random letter to flicker
        const randomIndex = Math.floor(Math.random() * allSpans.length);
        currentFlicker = allSpans[randomIndex];
        currentFlicker.classList.add('flicker');

        // Set a random delay for the next flicker (between 1 to 5 seconds)
        const flickerDuration = Math.random() * 4000 + 1000; // Flicker duration between 1 to 5 seconds

        // Random chance to create a spark effect (occurs occasionally)
        const sparkChance = Math.random();
        if (sparkChance < 0.3) { // 30% chance to create a spark
            createSpark(currentFlicker);
        }

        setTimeout(flickerLetter, flickerDuration);
    }

    // Start the first flicker
    flickerLetter();
}

// Function to create a spark at the flickering letter's position
function createSpark(letter) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    
    // Get the position of the letter to place the spark
    const rect = letter.getBoundingClientRect();
    spark.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
    spark.style.top = `${rect.top + window.scrollY + rect.height}px`;

    document.body.appendChild(spark);

    // Remove spark from the DOM after the animation ends
    spark.addEventListener('animationend', () => {
        spark.remove();
    });
}
