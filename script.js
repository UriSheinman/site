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

// Function to handle the first click or tap, revealing the first clue
function revealClue1() {
    const clue1 = document.getElementById('clue1');
    const h2 = document.getElementById('catch-me');
    if (clue1.classList.contains('hidden')) {
        clue1.classList.remove('hidden');
        clue1.style.visibility = 'visible';
        clue1.style.opacity = 1;
        h2.classList.add('clicked'); // Start shaking animation
    }
}

// Function to handle the second interaction
function revealClue2() {
    const clue2 = document.getElementById('clue2');
    if (!hasClicked) {
        clue2.classList.remove('hidden'); // Reveal the second clue
        hasClicked = true;
    } else {
        alert("You Can't Catch Me Now..."); // Final "catch me" message
    }
}

// Attach event listeners for both desktop and mobile
document.querySelector('header').addEventListener('click', redirectToUriSheinman);
document.querySelector('main h2').addEventListener('click', revealClue1);
document.querySelector('main h2').addEventListener('touchstart', revealClue1); // Mobile-friendly event
document.getElementById('clue1').addEventListener('click', revealClue2); // Step 2 trigger
document.getElementById('clue1').addEventListener('touchstart', revealClue2); // Mobile-friendly event for Step 2
