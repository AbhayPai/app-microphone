export default function DetectBrowser() {
    let detectBrowser = {
        isNotChrome: false,
        isIOSChrome: false,
        isDesktopChrome: false,
    };

    // please note,
    // that IE11 now returns undefined again for window.chrome
    // and new Opera 30 outputs true for window.chrome
    // but needs to check if window.opr is not undefined
    // and new IE Edge outputs to true now for window.chrome
    // and if not iOS Chrome check
    // so use the below updated condition
    let isChromium = window.chrome;
    let winNav = window.navigator;
    let vendorName = winNav.vendor;
    let isOpera = typeof window.opr !== "undefined";
    let isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    let isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
        detectBrowser.isIOSChrome = true;
    } else if(
        isChromium !== null &&
        typeof isChromium !== "undefined" &&
        vendorName === "Google Inc." &&
        isOpera === false &&
        isIEedge === false
    ) {
        detectBrowser.isDesktopChrome = true;
    } else {
        detectBrowser.isNotChrome = true;
    }

    return {
        detectBrowser
    };
}
