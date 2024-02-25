import { browser } from '@wdio/globals'
import { leftClick, waitForElement } from "../utils/utils";
import Page from "./page.ts";
import { Physician } from '../constants/physician.constant.ts';
import clickdocSearchPage from './clickdocSearch.page.ts';

class ClickdocHomePage extends Page {
    get pageHeader() {
        return browser.$('h1.header-title');
    }
    get searchNameTextBox() {
        return browser.$('input[placeholder*="Fachbereich"]');
    }
    get searchLocationTextBox() {
        return browser.$('input[placeholder*="PLZ oder Stadtteil"]');
    }
    get findButton() {
        return browser.$('#search-button');
    }

    get acceptAllButton() {
        return browser.$('.agree-consent--all');
    }
    async acceptCookies(): Promise<void> {
        await waitForElement(await this.acceptAllButton);
        if(await this.acceptAllButton.isDisplayed()) {
            await leftClick(await this.acceptAllButton);
        }
    }

    async enterSearchName(name: string, lastName: string) {
        await this.searchNameTextBox.setValue(`${name} ${lastName}`);
    }
    async enterSearchLocation(location: string) {
        await this.searchLocationTextBox.setValue(location);
    }

    async searchPhysician(physician: Physician) {
        await this.enterSearchName(physician.name, physician.lastName);
        await this.enterSearchLocation('Testhausen');
        await leftClick(await this.findButton);
        await clickdocSearchPage.waitForPhysicianCardsLoading();
    }
}

export default new ClickdocHomePage();