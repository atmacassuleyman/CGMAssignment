/**
 * Waits for an element to be displayed within a specified timeout.
 * @param elem The WebdriverIO element to wait for.
 * @param timeOut The maximum time to wait in milliseconds (default is 5000ms).
 */
async function waitForElement(elem: WebdriverIO.Element, timeOut = 5000) {
    await elem.waitForDisplayed({timeout: timeOut});
}

/**
 * Waits for an element to disappear or not be displayed within a specified timeout.
 * @param elem The WebdriverIO element to wait for its disappearance.
 * @param timeOut The maximum time to wait in milliseconds (default is 5000ms).
 */
async function waitToDisappear(elem: WebdriverIO.Element, timeOut = 5000) {
    await waitForElement(elem);
    await elem.waitForDisplayed({timeout: timeOut, reverse: true});
}

/**
 * Performs a left click on an element after waiting for it to be displayed.
 * @param elem The WebdriverIO element to click on.
 * @param timeOut The maximum time to wait for the element to be displayed (default is 5000ms).
 */
async function leftClick(elem: WebdriverIO.Element, timeOut = 5000) {
    await waitForElement(elem, timeOut);
    await elem.click();
}

/**
 * Returns the current day of the week as a string.
 * No parameters are needed for this function.
 */
function getCurrentDay(): string {
    const date = new Date();
    const dayIndex = date.getDay();
    let day: string
    switch(dayIndex) {
        case 0: day = 'Sunday'; break;
        case 1: day = 'Monday'; break;
        case 2: day = 'Tuesday'; break;
        case 3: day = 'Wednesday'; break;
        case 4: day = 'Thursday'; break;
        case 5: day = 'Friday'; break;
        default: day = 'Saturday';
    }
    return day;
}

export {
    waitForElement,
    waitToDisappear,
    leftClick,
    getCurrentDay
}
