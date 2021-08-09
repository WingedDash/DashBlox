"use strict"

const pageInfo = {
    assets: {
        uniqueIds: true,
        paths: ["catalog", "bundles", "library", "game-pass", "badges"]
    },

    catalog: {
        uniqueIds: false,
        paths: ["catalog"]
    },

    discover: {
        uniqueIds: false,
        paths: ["discover"]
    },

    games: {
        uniqueIds: true,
        paths: ["games"]
    },

    groups: {
        uniqueIds: true,
        paths: ["groups"]
    },

    home: {
        uniqueIds: false,
        paths: ["home"]
    },

    profile: {
        uniqueIds: true,
        paths: ["users"]
    },

    settings: {
        uniqueIds: false,
        paths: ["dashblox"]
    }
}

const pages = {};

const currentUrl = location.href;

const currentUrlPaths = currentUrl.split("/");

const urlDetails = {
    pathDetails: currentUrlPaths[3],
    uniqueId: currentUrlPaths[4],
}

const currentPageInfo = {
    path: urlDetails.pathDetails.split("?")[0].split("#")[0],
    args: []
}

function checkPath(page, requiredPath) {
    for (let path in page.paths) {
        if (page.paths[path] === requiredPath) {
            return path
        }
    }
}

function injectPages() {
    for (let page in pages) {
        if (pageInfo[page] && checkPath(pageInfo[page], currentPageInfo.path)) {
            if (pageInfo[page].uniqueIds && !Number(urlDetails.uniqueId)) {
                continue;
            } else if (pageInfo[page].uniqueIds && Number(urlDetails.uniqueId)) {
                pages[page](Number(urlDetails.uniqueId));
                break;
            } else if (!pageInfo[page].uniqueIds && !Number(urlDetails.uniqueId)) {
                pages[page]();
                break;
            }
        }
    }
}

function injectCSSPages() {
    
}

function injectPage(pageName) {
    pages[pageName](urlDetails.uniqueId);
}

function injectCSS(css) { // Need to find a way to get rid of the "$.watch"'s.
    $("head").append(`<link rel="stylesheet" href="${chrome.extension.getURL(css)}">`);
}