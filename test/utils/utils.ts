async function waitForElement(elem: WebdriverIO.Element, timeOut = 5000) {
    await elem.waitForDisplayed({timeout: timeOut});
}

async function waitToDisappear(elem: WebdriverIO.Element, timeOut = 5000) {
    await waitForElement(elem);
    await elem.waitForDisplayed({timeout: timeOut, reverse: true});
}

async function leftClick(elem: WebdriverIO.Element, timeOut = 5000) {
    await waitForElement(elem, timeOut);
    await elem.click();
}

export {
    waitForElement,
    waitToDisappear,
    leftClick
}