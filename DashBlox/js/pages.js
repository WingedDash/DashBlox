"use strict"

const pageInfo = {
    assets: {
        hasIds: true,
        paths: ["catalog", "bundles", "library", "game-pass", "badges"]
    },

    avatar: {
        paths: ["my/avatar"]
    },

    catalog: {
        paths: ["catalog"]
    },

    discover: {
        paths: ["discover"]
    },

    games: {
        hasIds: true,
        paths: ["games"],
        css: ["css/pages/games.css"]
    },

    groups: {
        hasIds: true,
        paths: ["groups"]
    },

    home: {
        paths: ["home"],
        css: ["css/pages/home.css"]
    },

    profile: {
        hasIds: true,
        paths: ["users"],
        css: ["css/pages/profile.css"]
    },

    settings: {
        paths: ["dashblox/settings"]
    },

    viewdeleted: {
        paths: ["dashblox/viewdeleted"],
        css: ["css/pages/viewdeleted.css"]
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
    args: {}
}

async function injectPage(page, id) {
    pages[page](id);
}

function checkPath(currentPage) {
    if (currentPage) {
        // for (const page of currentPage.paths) {
        //     const paths = page.split("/");

        //     for (const path of paths) {
        //         console.log(path)
        //     }


        // }

        // return true;
        
        let success = false;

        currentPage.paths.forEach((page) => {
            if (page == currentPageInfo.path) {
                if (!currentPage.subPaths) {
                    success = true;
                    return;
                } else {
                    if (currentPage.subPaths) {
                        currentPage.subPaths.forEach((subPath) => {
                            if (typeof(urlDetails.uniqueId) == "string") {
                                if (subPath == urlDetails.uniqueId.split("?")[0].split("#")[0]) {
                                    success = true;
                                    return;
                                }
                            }
                        })
                    }
                }
            }
        })

        return success;
    }
}

function injectPages() {
    for (const name in pages) {
        const page = pageInfo[name];

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
    for (const name in pageInfo) {
        const page = pageInfo[name];

        if (page.hasOwnProperty("css") && checkPath(page)) {
            for (let path in page.css) {
                injectCSS(page.css[path]);
            }
        }
    }
}

function injectCSS(css) {
    $("head").append(`<link rel="stylesheet" href="${chrome.runtime.getURL(css)}">`);
}

let generateArgs = () => {
    if (typeof(currentUrlPaths[currentUrlPaths.length - 1]) == "string") {
        let rawArgs = currentUrlPaths[currentUrlPaths.length - 1].split("?");
        
        if (rawArgs[1]) {rawArgs = rawArgs[1].split("&")};

        for (let index in rawArgs) {
            let args = rawArgs[index].split("=");
            
            currentPageInfo.args[args[0]] = (args[1] || args[0]);
        }
    }
}

generateArgs();