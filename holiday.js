// Function to check if today is a Jewish holiday (or the day before)
function getJewishHoliday() {
    const today = new Date();
    const hebrewYear = new Hebcal.HDate(today).getFullYear();

    // Hebcal object for the current year
    const jewishHolidays = new Hebcal.HebrewCalendar({
        year: hebrewYear,
        isHebrewYear: true,
        diaspora: false,  // Set to true for diaspora holidays
        major: true,      // We want major Jewish holidays
    });

    const holidays = jewishHolidays.holidays();

    for (const holidayObj of holidays) {
        const holidayDate = holidayObj.greg();
        let dayBefore = new Date(holidayDate);
        dayBefore.setDate(holidayDate.getDate() - 1); // Set the date to the day before

        if (today >= dayBefore && today <= holidayDate) {
            return holidayObj.desc;
        }
    }
    return null;
}

// Function to apply holiday-specific color changes
function applyHolidayChanges() {
    const holiday = getJewishHoliday();
    const holidayStylesheet = document.getElementById('holiday-stylesheet');

    if (holiday) {
        document.querySelector('main h2').textContent = `Happy ${holiday}!`;
        holidayStylesheet.setAttribute('href', `${holiday.toLowerCase().replace(/\s/g, '-')}.css`);
    } else {
        holidayStylesheet.setAttribute('href', '');  // Default no holiday styling
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', applyHolidayChanges);