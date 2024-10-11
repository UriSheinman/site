// Function to get the current Jewish holiday using Hebcal's JSON API
function getJewishHoliday() {
    const today = new Date();
    const hebcalUrl = `https://www.hebcal.com/converter?cfg=json&gy=${today.getFullYear()}&gm=${today.getMonth() + 1}&gd=${today.getDate()}&g2h=1`;

    // Fetch the Jewish holiday data from Hebcal API
    fetch(hebcalUrl)
        .then(response => response.json())
        .then(data => {
            // Find the current holiday (if any) from the response
            const holiday = data.items.find(item => item.category === 'holiday');
            if (holiday) {
                console.log('Holiday detected:', holiday.title);
                applyHolidayChanges(holiday.title); // Apply holiday decorations
            } else {
                console.log('No Jewish holiday today');
                resetHolidayChanges(); // Reset to default state if no holiday
            }
        })
        .catch(error => console.error('Error fetching holiday data:', error));
}

// Function to apply holiday changes based on the detected holiday
function applyHolidayChanges(holidayTitle) {
    // Determine the holiday and apply corresponding changes
    const holidayData = getHolidayData(holidayTitle);

    if (holidayData) {
        document.body.style.backgroundColor = holidayData.bgColor;
        document.querySelector('header h1').style.color = holidayData.textColor;
        document.querySelector('main h2').style.color = holidayData.textColor;
        // Add any other decorations or styles here as needed
        console.log(`Applied changes for: ${holidayTitle}`);
    }
}

// Function to get the decorations and colors based on the holiday title
function getHolidayData(holidayTitle) {
    const holidayMap = {
        "Rosh Hashanah": { bgColor: "#A4D3B8", textColor: "#FF5733" },
        "Yom Kippur": { bgColor: "#C0C0C0", textColor: "#4B0082" },
        "Sukkot": { bgColor: "#FFD700", textColor: "#006400" },
        "Chanukah": { bgColor: "#4B0082", textColor: "#FFD700" },
        "Purim": { bgColor: "#FF69B4", textColor: "#FFFFFF" },
        "Passover": { bgColor: "#90EE90", textColor: "#FF6347" },
        "Shavuot": { bgColor: "#FFFACD", textColor: "#8B0000" }
        // Add more holidays as needed
    };

    return holidayMap[holidayTitle] || null; // Default to null if holiday not in the map
}

// Function to reset to default state when no holiday is detected
function resetHolidayChanges() {
    document.body.style.backgroundColor = "#000000"; // Default background color (black)
    document.querySelector('header h1').style.color = "#FFFFFF"; // Default text color (white)
    document.querySelector('main h2').style.color = "#FFFFFF"; // Default text color (white)
    console.log('Reset to default styling (no holiday).');
}

// Apply holiday changes when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    getJewishHoliday(); // Fetch the current holiday and apply changes
});