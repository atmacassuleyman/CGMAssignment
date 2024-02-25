import { leftClick, waitForElement } from "../utils/utils";
import Page from "./page.ts";

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
}

export default new ClickdocHomePage();