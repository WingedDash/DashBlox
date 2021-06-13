"use strict"

const pageInfo = {
    assets: {
        uniqueIds: true,
        paths: ["catalog", "bundles", "library", "game-pass", "badges"]
    },

    gamelist: {
        uniqueIds: false,
        paths: ["games", "games#"]
    },

    games: {
        uniqueIds: true,
        paths: ["games"]
    },

    profile: {
        uniqueIds: true,
        paths: ["users"]
    },

    settings: {
        uniqueIds: false,
        paths: ["dashblox?tab=settings"]
    }
}

const pages = {};

const currentUrl = location.href;

const urlDetails = {
    paths: currentUrl.split("/"),
    args: []
}

const currentPageInfo = {
    path: urlDetails.paths[3],
    uniqueId: urlDetails.paths[4]
}

function checkPath(page, requiredPath) {
    for (let path in page.paths) {
        if (page.paths[path] === requiredPath) {
            return path
        }
    }
}

const injectPages = () => {
    for (let page in pages) {
        if (pageInfo[page] && checkPath(pageInfo[page], currentPageInfo.path)) {
            if (pageInfo[page].uniqueIds && !Number(currentPageInfo.uniqueId)) {
                continue;
            } else if (pageInfo[page].uniqueIds && Number(currentPageInfo.uniqueId)) {
                pages[page](Number(currentPageInfo.uniqueId));
                break;
            } else if (!pageInfo[page].uniqueIds && !Number(currentPageInfo.uniqueId)) {
                pages[page]();
                break;
            }
        }
    }
}