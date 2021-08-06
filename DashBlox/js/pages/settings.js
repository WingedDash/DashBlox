"use strict"

const settings = {
    general: {
        simpleTimeFormat: true
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
    function setSettings(setSetting, parentObject) {
        for (let setting in setSetting) {
            if (typeof(setSetting[setting]) == 'object') {
                setSettings(setSetting[setting], setting);
            } else {
                if (!parentObject) {
                    settings[setting] = setSetting[setting];
                } else {
                    settings[parentObject][setting] = setSetting[setting];
                }
            }
        }
    }

    let getSettings = await dashblox.storage.get("settings");
    let currentSettings = getSettings.settings;

    if (currentSettings) {
        setSettings(currentSettings);
    }

    dashblox.storage.save("settings", settings);
}

pages.settings = () => {
    $.watch(".content", () => {
        $(".content").empty();

        $("title")[0].text = "Settings - DashBlox";
    })
}

loadSettings();