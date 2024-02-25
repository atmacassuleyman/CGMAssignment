import { peterWunderlich } from "../constants/physician.constant";
import clickdocHomePage from "../pageobjects/clickdocHome.page.ts";
import clickdocSearchPage from "../pageobjects/clickdocSearch.page.ts";
import Page from "../pageobjects/page.ts";
import physicianProfilePage from "../pageobjects/physicianProfile.page.ts";
import { leftClick, waitForElement } from "../utils/utils.ts";

describe('Insert the search term in the Subject area, Name of the doctor, Practiceand City, PLZ or District input field and click Finden Button', () => {

    const page = new Page();

    before(async () => {
        await page.open();
        await clickdocHomePage.acceptCookies();
        await clickdocHomePage.searchPhysician(peterWunderlich);
    });

    describe('Search page result validations', () => {
        
        it('Should validate "Peter Wunderlich" physician view was displayed as first in the list of results.', async () => {
            const firstPhysicianText = await clickdocSearchPage.physicianCards[0].getText();
            expect(firstPhysicianText).toBe(`${peterWunderlich.name} ${peterWunderlich.lastName}`);
        });

        it('Should validate physician name and address', async () => {
            expect(await clickdocSearchPage.getPhysicianAddress(peterWunderlich.name, peterWunderlich.lastName).getText()).toBe(peterWunderlich.address);
        });

        it('Should validate that he is online bookable for the month of Feburary 2024', async () => {
            expect(await clickdocSearchPage.getPhysicianAvailableSlot(peterWunderlich.name, peterWunderlich.lastName).getText()).toContain('Feb. 2024');
        });

        it('Should validate the color of Find buttons in the page', async () => {
            const expectedFindButtonColor = 'rgba(251,186,0,1)';
            expect(await clickdocSearchPage.getFindButtonBackgroundColor()).toBe(expectedFindButtonColor);
        });

        it('Should validate the color of Appointment booking buttons in the page', async () => {
            const expectedAppointmentButtonColor = 'rgba(0,116,188,1)';
            expect(await clickdocSearchPage.getAppointmentButtonBackgroundColor(peterWunderlich.name, peterWunderlich.lastName)).toBe(expectedAppointmentButtonColor);
        });
    });

    describe('Physician profile view validations', () => {

        before(async () => {
            await leftClick(await clickdocSearchPage.getPhysicianCard(peterWunderlich.name, peterWunderlich.lastName));
            await waitForElement(await physicianProfilePage.physicianPageTitle);
        });

        it('Should validate physician name and address', async () => {
           expect(await physicianProfilePage.physicianPageTitle.getText()).toBe(`${peterWunderlich.name} ${peterWunderlich.lastName}`);
           expect((await (await physicianProfilePage.physicianAddress).getText()).trim()).toBe(peterWunderlich.address);
        });

        it('Should validate the current day opening hours from contact section', async () => {
            expect(await physicianProfilePage.validateOpeningHours()).toBe(true);
        });

        it('Should validate the current day is shown in bold', async () => {
            expect((await physicianProfilePage.currentDayAbbreviation.getCSSProperty('font-weight')).value).toBe(900);
        })
    });
});