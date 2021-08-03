"use strict"

const settings = {
    general: {

    },

    catalog: {

    },

    assets: {

    },

    theme: {

    },

    setupComplete: false
}

async function loadSettings() {
    function setSettings(setSetting) {
        for (let setting in setSetting) {
            if (typeof(setSetting[setting]) == 'object') {
                setSettings(setSetting[setting]);
            } else {
                settings[setting] = setSetting[setting]
            }
        }
    }

    let getSettings = await dashblox.storage.get("settings");
    let currentSettings = getSettings.settings;

    if (!currentSettings) {
        dashblox.storage.save("settings", settings);
    } else {
        setSettings(currentSettings);
    }
}

pages.settings = () => {
    $.watch(".content", () => {
        $(".content").empty();

        $("title")[0].text = "Settings - DashBlox";
    })
}

loadSettings();