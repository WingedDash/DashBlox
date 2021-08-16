"use strict"

const pageInfo = {
    assets: {
        hasIds: true,
        paths: ["catalog", "bundles", "library", "game-pass", "badges"]
    },

    avatar: {
        paths: ["my"],
        subPaths: ["avatar"]
    },

    catalog: {
        paths: ["catalog"]
    },

    discover: {
        paths: ["discover"]
    },

    games: {
        hasIds: true,
        paths: ["games"]
    },

    groups: {
        hasIds: true,
        paths: ["groups"]
    },

    home: {
        paths: ["home"]
    },

    profile: {
        hasIds: true,
        paths: ["users"],
        css: ["css/pages/profile.css"]
    },

    settings: {
        paths: ["dashblox"],
        subPaths: ["settings"]
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

async function injectPage(page, id) {
    let settings = (await dashblox.storage.get("settings")).settings;

    if (id) {
        pages[page](id, settings);
    } else {
        pages[page](settings);
    }
}

function checkPath(page) {
    if (page) {
        for (let path in page.paths) {
            if (page.paths[path] == currentPageInfo.path) {
                if (!page.subPaths) {
                    return true;
                } else {
                    for (let subPath in page.subPaths) {
                        if (page.subPaths[subPath] == urlDetails.uniqueId) {
                            urlDetails.uniqueId = currentUrlPaths[5];
                            return true;
                        }
                    }
                }
            }
        }
    }
}

function injectPages() {
    for (let name in pages) {
        let page = pageInfo[name];

        if (checkPath(page)) {
            if (page.hasIds && Number(urlDetails.uniqueId)) {
                injectPage(name, Number(urlDetails.uniqueId));
            } else if (!page.hasIds && !Number(urlDetails.uniqueId)) {
                injectPage(name);
            }
        }
    }
}

function injectCSSPages() {
    for (let name in pageInfo) {
        let page = pageInfo[name];

        if (page.hasOwnProperty("css") && checkPath(page)) {
            for (let path in page.css) {
                injectCSS(page.css[path]);
            }
        }
    }
}

function injectCSS(css) { // Need to find a way to get rid of the "$.watch"'s.
    $("head").append(`<link rel="stylesheet" href="${chrome.extension.getURL(css)}">`);
}