import Page from "./page.ts";

class ProfilePhysicianPage extends Page {

    async getPhysicianProfile(): Promise<string> {
        const physicianFullName = await browser.$('class="text-wrap header__content--title"');
        return await physicianFullName.getText();
    }

    async getPhysicianAddress(firstName: string, lastName: string): Promise<string> {
        const address = await browser.$(`//cd-list-entry-headline//*[contains(text(), '${firstName} ${lastName}')]/ancestor::app-search-result-card//cd-list-entry-text`);
        return (await address.getText()).trim();
    }

    async currentDay(): Promise<string> {
        const currentDay = await browser.$('[class="text-day-hour__item current-date first ng-star-inserted"]');
        return await currentDay.getText();
    }

    async openingHours(today: string): Promise<string | undefined> {
        switch (today) {
            case "Di.":
            case "Mi.":
            case "Do.":
            case "Fr.":
                return "08:00 Uhr - 12:00 Uhr and 14:00 Uhr - 18:00 Uhr";
            case "Mo.":
                return "08:00 Uhr and 14:00 Uhr";
        }
        const physicianopeningHours = await browser.$('class="text-day-hour__item current-date first ng-star-inserted"');
        return await physicianopeningHours.getText();
    }

    async startingEndingTimeMorning(): Promise<string> {
        const startEndTimeMorning = await browser.$('class="text-day-hour__item current-date first ng-star-inserted"');
        return await startEndTimeMorning.getText();
    }

    async startingEndingTimeAfernoon(): Promise<string> {
        const startTimeAfernoon = await browser.$('[class="text-day-hour__item current-date ng-star-inserted"]');
        return await startTimeAfernoon.getText();
    }

}

export default new ProfilePhysicianPage();
