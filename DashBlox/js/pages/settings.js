"use strict"

let settings = {
    general: {
        simpleTimeFormat: true
    },

    catalog: {

    },

    assets: {
        assetStats: true,
        ownersList: true
    },

    profile: {
        profileStatus: true
    },

    theme: {
        oldRobuxIcons: false,
        oldTopBarText: false,
        changeBackToGames: false,

        fancyScrollBar: false
    },
    
    setupComplete: false
}

async function loadSettings() {
    let createSettings = (oldSettings, settingsLocation) => {
        for (let setting in oldSettings) {
            if (typeof(oldSettings[setting]) == 'object') {
                if (settingsLocation) {
                    createSettings(oldSettings[setting], settingsLocation[setting]);
                } else {
                    createSettings(oldSettings[setting], settings[setting]);
                }
            } else {
                if (settingsLocation) {
                    settingsLocation[setting] = oldSettings[setting];
                } else {
                    settings[setting] = oldSettings[setting];
                }
            }
        }
    }

    let currentSettings = (await dashblox.storage.get("settings")).settings;

    if (currentSettings) {
        createSettings(currentSettings);
    }
    
    dashblox.storage.save("settings", settings);
}

loadSettings();

pages.settings = () => {
    $.watch(".content", () => {
        $(".content").empty();

        $("title")[0].text = "Settings - DashBlox";
    })
}