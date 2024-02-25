describe('Opening Hours Validation', () => {
    it('should validate current day opening hours', async () => {
      await browser.url('https://demo.clickdoc.de/cd-de/');
  
      const days = ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.'];
      const currentDay = new Date().getDay();
      const currentDayName = days[currentDay];
  
      // Assuming you have a way to select the opening hours based on the day of the week
      // This will vary greatly depending on the website's structure
      const openingHoursSelector = `CSS_SELECTOR_FOR_${currentDayName.toUpperCase()}_OPENING_HOURS`;
      const openingHoursText = await $(openingHoursSelector).getText();
  
      // Example of expected format: "09:00 Uhr, 12:00 Uhr, 14:00 Uhr, 18:00 Uhr"
      // You need to replace EXPECTED_TIMES with the actual expected times for the current day
    });
  });
  