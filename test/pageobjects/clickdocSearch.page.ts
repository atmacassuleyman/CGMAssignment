import { browser } from '@wdio/globals';
import { waitToDisappear } from "../utils/utils";
import Page from "./page.ts";

class SearchPage extends Page {

    get physicianCards() {
        return browser.$$('[data-automation="list-entry-headline"] .content');
    }

    get skeletonCard() {
        return browser.$('app-skeleton-card-details');
    }

    get findButton() {
        return browser.$('#search-button');
    }

    getAppointmentButton(firstName: string, lastName: string) {
        return this.getPhysicianCard(firstName, lastName).$('//button');
    }

    getPhysicianAvailableSlot(firstName: string, lastName: string) {
        return this.getPhysicianCard(firstName, lastName).$('//*[contains(@class,"available-slots__time")]');
    }

    getPhysicianAddress(firstName: string, lastName: string) {
        return this.getPhysicianCard(firstName, lastName).$('//cd-list-entry-text');
    }

    getPhysicianCard(firstName: string, lastName: string) {
        return browser.$(`//cd-list-entry-headline//*[contains(text(), '${firstName} ${lastName}')]/ancestor::app-search-result-card`);
    }

    async getAppointmentButtonBackgroundColor(firstName: string, lastName: string): Promise<string | undefined> {
        const appointmentButtonBgColor = await this.getAppointmentButton(firstName, lastName).$('cd-abstract-button').getCSSProperty('background-color');
        return appointmentButtonBgColor.parsed.rgba?.toLowerCase().replace(/\s/g, '');
    }

    async getFindButtonBackgroundColor(): Promise<string | undefined> {
        const colorProperty = await this.findButton.getCSSProperty('background-color');
        return colorProperty.parsed.rgba?.toLowerCase().replace(/\s/g, '');
    }

    async waitForPhysicianCardsLoading(timeOut?: number) {
        await waitToDisappear(await this.skeletonCard, timeOut);
    }

}

export default new SearchPage();


