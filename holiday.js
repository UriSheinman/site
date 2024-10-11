// Function to check if today is a Jewish holiday (or the day before)
function getJewishHoliday() {
    const today = new Date();
    console.log('Today:', today); // Log today's date

    const hebrewYear = new Hebcal.HDate(today).getFullYear();
    const jewishHolidays = new Hebcal.HebrewCalendar({
        year: hebrewYear,
        isHebrewYear: true,
        diaspora: false,  // Set to true for diaspora holidays
        major: true,      // We want major Jewish holidays
    });

    const holidays = jewishHolidays.holidays();
    console.log('Holidays for this year:', holidays); // Log holidays for the year

    for (const holidayObj of holidays) {
        const holidayDate = holidayObj.greg();
        let dayBefore = new Date(holidayDate);
        dayBefore.setDate(holidayDate.getDate() - 1); // Set the date to the day before

        console.log('Day before:', dayBefore); // Log the day before the holiday

        if (today >= dayBefore && today <= holidayDate) {
            console.log('Holiday detected:', holidayObj.desc);
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
        console.log('Holiday applied:', holiday); // Log applied holiday
    } else {
        holidayStylesheet.setAttribute('href', '');  // Default no holiday styling
        console.log('No holiday detected');
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', applyHolidayChanges);