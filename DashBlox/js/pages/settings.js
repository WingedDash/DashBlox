"use strict"

const categories = [
    {
        name: "Information",
        contents: [] // Will be added manually.
    },
    {
        name: "General",
        contents: [
            {
                header: "DashBlox",
                content: [
                    {
                        name: "DashBlox Update Notifications",
                        description: "Get notified when DashBlox has a new major update, allowing you to explore new settings and features when they're available.",

                        setting: "general.dashbloxUpdates",

                        button: true,
                        isDisabled: false
                    }
                ]
            },
            {
                header: "Catalog",
                content: [
                    {
                        name: "Time Format (Beta)",
                        description: "When this setting is enabled, it will revert back to the old time format. (MM/DD/YYYY)",
                        
                        setting: "general.simpleTimeFormat",

                        button: true,
                        isDisabled: false
                    }
                ]
            },
            {
                header: "Roblox",
                content: [
                    {
                        name: "Block Roblox Alerts",
                        description: "Removes the alert from the top of pages when Roblox sends a alert.",

                        setting: "general.blockAlert",

                        button: true,
                        isDisabled: false
                    }
                ]
            }
        ]
    },
    {
        name: "Games",
        contents: [
            {
                header: "Discovery Page",
                content: [
                    {
                        name: "Revert Popular Tab Changes",
                        description: "Changes the position of the popular tab to the top of the games page.",

                        setting: "general.popularTabTop",

                        button: true,
                        isDisabled: false
                    }
                ]
            },
            {
                header: "Games Page",
                content: [
                    {
                        name: "Pinning Games (Coming Soon)",
                        description: "Allows you to pin games to your home page.",

                        setting: "games.pinningGames",

                        button: true,
                        isDisabled: true
                    },
                    {
                        name: "Revert Experiences Back To Games",
                        description: `Reverts the "experiences" update back to "games".`,

                        setting: "theme.changeBackToGames",

                        button: true,
                        isDisabled: false,
                        IsExperimental: true
                    }
                ]
            }
        ]
    },
    {
        name: "Catalog",
        contents: [
            {
                header: "Assets",
                content: [
                    {
                        name: "Item Statistics",
                        description: "Shows you more information about an item on the catalog.",

                        setting: "assets.assetStats",

                        button: true,
                        isDisabled: false
                    },
                    {
                        name: "Owners List (Coming Soon)",
                        description: "View the owners of an item on the catalog that is something you created, or is a limited.",

                        setting: "assets.ownersList",

                        button: true,
                        isDisabled: true
                    }
                ]
            },
            {
                header: "Catalog",
                content: [
                    {
                        name: "Most Recent Items",
                        description: "This adds a new category that lets you quickly see the most recent items on the catalog.",

                        setting: "catalog.recentCategory",

                        button: true,
                        isDisabled: false
                    }
                ]
            }
        ]
    },
    {
        name: "Profiles",
        contents: [
            {
                header: "Information",
                content: [
                    {
                        name: "Last Online",
                        description: "This lets you view the last time a user was online on their profile.",

                        setting: "profile.lastOnline",

                        button: true,
                        isDisabled: false
                    }
                ]
            },
            {
                header: "Aesthetic",
                content: [
                    {
                        name: "Change Profile Statistics Location",
                        description: "Changes the position of user statistics on a user's profile to be more viewable.",

                        setting: "profile.easyStatistics",

                        button: true,
                        isDisabled: false
                    }
                ]
            }
        ]
    },
    {
        name: "Themes",
        contents: [
            {
                header: "Home",
                content: [
                    {
                        name: "Grouped Home Page",
                        description: "Groups together continue playing, friends playing, and favorites and the rest get grouped into recommended.",

                        setting: "theme.groupedHomePage",

                        button: true,
                        isDisabled: false
                    },
                    {
                        name: "Classic Home Page",
                        description: "Replaces the home page header with your profile picture and name.",

                        setting: "theme.profileHomePage",

                        button: true,
                        isDisabled: false,
                        IsExperimental: true
                    }
                ]
            },
            {
                header: "Aesthetic",
                content: [
                    {
                        name: "Original Topbar Text",
                        description: `Replaces the top bar text with "games" and "catalog".`,

                        setting: "theme.oldTopBarText",

                        button: true,
                        isDisabled: false
                    },
                    {
                        name: "Original Robux Icons",
                        description: "Replaces the new Robux icon with the older one.",
                        
                        setting: "theme.oldRobuxIcons",

                        button: true,
                        isDisabled: false
                    },
                    {
                        name: "Original Navigation Icons",
                        description: "Replaces the new navigation icons with the older ones.",
                        
                        setting: "theme.oldNavigationIcons",

                        button: true,
                        isDisabled: false
                    },
                    {
                        name: "Improved Scrollbar",
                        description: `Changes the scrollbar to be more modern and work with the Roblox theme.`,

                        setting: "theme.fancyScrollBar",

                        button: true,
                        isDisabled: false
                    },
                    {
                        name: "Small Chat Tab",
                        description: `Changes the chat tab to a smaller size.`,
                        
                        setting: "theme.smallChatTab",

                        button: true,
                        isDisabled: false,
                        IsExperimental: true
                    }
                ]
            }
        ]
    }
]

function waitForSelector (selector, callback) {
    const element = document.querySelector(selector);

    if (!element) {
        setTimeout(() => {
            waitForSelector(selector, callback);
        })
    }

    callback(element);
}

pages.settings = () => {
    waitForSelector(".content", (documentContent) => {
        if (!documentContent) return; // Product of the annoying selector function.

        document.title = "Settings - DashBlox";
        documentContent.innerHTML = "";

        document.querySelector("link[rel='icon']").setAttribute("href", chrome.runtime.getURL("resources/icons/logo/256/glow.png"));
    });
}