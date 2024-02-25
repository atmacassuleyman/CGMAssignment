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

}

export default new ProfilePhysicianPage();
