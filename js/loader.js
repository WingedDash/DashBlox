"use strict"

const documentLocation = document.location;
const pathName = documentLocation.pathname;

const blockedList = ["/user-sponsorship", "/userads"];

const pageList = {
    default: {
        css: ["css/default.css"],
        matches: ["^"]
    }
    // assets: {
    //     matches: ["/catalog/(\\d+)", "/bundles/(\\d+)", "/library/(\\d+)", "/game-pass/(\\d+)", "/badges/(\\d+)"]
    // },
    // avatar: {
    //     matches: ["/my/avatar"]
    // },
    // catalog: {
    //     matches: ["/catalog"]
    // },
    // discover: {
    //     matches: ["/discover"]
    // },
    // games: {
    //     css: ["css/pages/games.css"],
    //     matches: ["/games/(\\d+)"]
    // },
    // groups: {
    //     matches: ["/groups/(\\d+)"]
    // },
    // home: {
    //     css: ["css/pages/home.css"],
    //     matches: ["/home"]
    // },
    // profile: {
    //     css: ["css/pages/profile.css"],
    //     matches: ["/users/(\\d+)/profile"]
    // },
    // settings: {
    //     css: ["css/pages/settings.css"],
    //     matches: ["/dashblox/settings"]
    // }
}

const isBlockedPage = () => {
    for (const page of blockedList) {
        if (pathName.match(page)) {
            return true;
        }
    }
}

if (!isBlockedPage()) {
    for (const name in pageList) {
        const page = pageList[name];

        try {
            for (const query of page.matches) {
                const matches = pathName.match(query);
    
                if (matches) {
                    if (page.css) {
                        $.observe(document.head, (head) => {
                            for (const css of page.css) {
                                const link = document.createElement("link");
                                link.rel = "stylesheet";
                                link.type = "text/css";
                                link.href = runtime.getURL(css);

                                head.appendChild(link);
                            }
                        })
                    }

                    pages?.[name](matches[1]);
                }
            }
        } catch (error) {
            console.log(pathName)
            console.warn(error);
        }
    }
}