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