import { browser } from '@wdio/globals'
import Page from "./page.ts";
import { getCurrentDay } from '../utils/utils.ts';

class ProfilePhysicianPage extends Page {

    get physicianPageTitle() {
        return browser.$('h1.header__content--title');
    }

    get morningOpeningHours() {
        return browser.$('.text-day-hour__item.current-date.first');
    }

    get afternoonOpeningHours() {
        return browser.$('.text-day-hour__item.current-date:nth-of-type(2)');
    }

    get physicianAddress() {
        return browser.$('[data-web-test=address-link]');
    }

    get currentDayAbbreviation() {
        return browser.$('div.text-day__item--text.current-date');
    }

    async getPhysicianProfile(): Promise<string> {
        const physicianFullName = await browser.$('class="text-wrap header__content--title"');
        return await physicianFullName.getText();
    }

    async validateOpeningHours(): Promise<boolean> {
        const currentDay = getCurrentDay();
        if (currentDay === 'Monday' || currentDay === 'Tuesday' || currentDay === 'Thursday' || currentDay === 'Friday') {
            return await this.morningOpeningHours.getText() === '08:00 Uhr - 12:00 Uhr' && await this.afternoonOpeningHours.getText() === '14:00 Uhr - 18:00 Uhr';
        } else if (currentDay === 'Wednesday') {
            return await this.morningOpeningHours.getText() === '08:00 Uhr - 14:00 Uhr';
        } else {
            return false;
        }
    }

}

export default new ProfilePhysicianPage();
