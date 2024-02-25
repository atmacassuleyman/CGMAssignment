import { peterWunderlich } from "../constants/physician.constant";
import clickdocHomePage from "../pageobjects/clickdocHome.page.ts";
import clickdocSearchPage from "../pageobjects/clickdocSearch.page.ts";
import Page from "../pageobjects/page.ts";
import { leftClick } from "../utils/utils";

describe('Insert the search term in the Subject area, Name of the doctor, Practiceand City, PLZ or District input field and click Finden Button', async () => {

    const page = new Page();

    before(async () => {
        await page.open();
        await clickdocHomePage.acceptCookies();
        await clickdocHomePage.enterSearchName(peterWunderlich.name, peterWunderlich.lastname);
        await clickdocHomePage.enterSearchLocation('Testhausen');
        await leftClick(await clickdocHomePage.findButton);
        await clickdocSearchPage.waitForPhysicianCardsLoading();
    });

    it('Should validate "Peter Wunderlich" physician view was displayed as first in the list of results.', async () => {
        const firstPhysicianText = await clickdocSearchPage.physicianCards[0].getText();
        expect(firstPhysicianText).toBe(`${peterWunderlich.name} ${peterWunderlich.lastname}`);
    });

    it('Should validate physician name and address', async () => {
        expect(await clickdocSearchPage.getPhysicianAddress(peterWunderlich.name, peterWunderlich.lastname).getText()).toBe(peterWunderlich.address);
    });

    it('Should validate that he is online bookable for the month of Feburary 2024', async () => {
        expect(await clickdocSearchPage.getPhysicianAvailableSlot(peterWunderlich.name, peterWunderlich.lastname).getText()).toContain('Feb. 2024');
    });

    it('Should validate the color of Find buttons in the page', async () => {
        const expectedFindButtonColor = 'rgba(251,186,0,1)';
        expect(await clickdocSearchPage.getFindButtonBackgroundColor()).toBe(expectedFindButtonColor);
    });

    it('Should validate the color of Appointment booking buttons in the page', async () => {
        const expectedAppointmentButtonColor = 'rgba(0,116,188,1)';
        expect(await clickdocSearchPage.getAppointmentButtonBackgroundColor(peterWunderlich.name, peterWunderlich.lastname)).toBe(expectedAppointmentButtonColor);
    });

});