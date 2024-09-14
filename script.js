// Function to get the current year plus one
function updateYear() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear + 1;
}

// Update year on page load
document.addEventListener('DOMContentLoaded', updateYear);

// Easter Egg Hunt Functionality
let hasClicked = false;

// Function to redirect to urisheinman.com when the header is clicked
function redirectToUriSheinman() {
    window.location.href = 'https://urisheinman.com';
}

// Function to reveal the first clue when the main content is clicked or touched
function revealClue1() {
    const clue1 = document.getElementById('clue1');
    if (clue1.classList.contains('hidden')) {
        clue1.classList.remove('hidden');
        clue1.style.visibility = 'visible';
        clue1.style.opacity = 1;
    }
}

// Function to add 'catch me' effect and reveal the second clue
function catchMeEffect() {
    const h2 = document.getElementById('catch-me');
    const clue2 = document.getElementById('clue2');
    if (!hasClicked) {
        h2.classList.add('clicked'); // Start animation on first click
        clue2.classList.remove('hidden'); // Reveal the second clue
        hasClicked = true;
    } else {
        alert("You Can't Catch Me Now..."); // Final "catch me" message
    }
}

// Attach event listeners for both desktop and mobile (click/touch)
document.querySelector('header').addEventListener('click', redirectToUriSheinman);
document.querySelector('main h2').addEventListener('click', catchMeEffect);
document.querySelector('main h2').addEventListener('touchstart', revealClue1); // Mobile-friendly event
