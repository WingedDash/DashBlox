"use strict"

const runtime = chrome.runtime;
const manifest = runtime.getManifest();

const developerMode = (manifest.short_name === "DashBlox_dev");
const betaMode = (manifest.short_name === "DashBlox_beta");

const storage = chrome.storage.local;

const serviceWorker = !self.window;

const updateLog = `
Update 2.1.0:
- Owners list has been re-enabled.
- Added a new setting for a grouped home page.
- Added a new setting to block Roblox alerts.
- Added a new setting to pin games.
- Added a new setting for the most recent catalog items.
- Added the ability to view deleted users. (Experimental)
- Readded the setting to view owners list.
- Removed profile statuses. (Roblox patched it)
- Tweaked the settings page.
- Fixed bugs and improved page loading.
- Updated to Manifest Version 3.

Build: ${(!developerMode && !betaMode) ? "Stable" : (developerMode && !betaMode) ? "Development" : "Beta"}
Version: ${manifest.version}
Updated: MM/DD/YYYY
`

const dashblox = {
    get: (url, data) => {
        let message = {url: url, data: data || {}, request: "get"};

        return new Promise((resolve, reject) => {
            runtime.sendMessage(message, (response) => {
                if (response) {
                    resolve(response);
                }
                reject({message: "A error occurred while fetching your request."});
            })
        })
    },

    post: (url, data) => {
        let message = {url: url, data: data, request: "post"};

        return new Promise((resolve, reject) => {
            runtime.sendMessage(message, (response) => {
                if (response) {
                    resolve(response);
                }
                reject({message: "A error occurred while posting your request."});
            })
        })
    },

    fetch: (data) => {
        let message = {data: data, request: "fetch"};

        return new Promise((resolve, reject) => {
            runtime.sendMessage(message, (response) => {
                if (response) {
                    resolve(response);
                }
                reject({message: "A error occurred while pushing your request."});
            })
        })
    },

    storage: {
        get: (key) => {
            return new Promise((resolve, reject) => {
                storage.get(key, (data) => {
                    resolve(data);
                })
            })
        },

        save: (key, data) => {
            return new Promise((resolve, reject) => {
                storage.set({[key]: data}, (result) => {
                    resolve(result);
                })
            })
        }
    }
}

class SettingsClass {
    constructor () {
        this.loadedSettings = null;
        
        this.defaultSettings = {
            general: {
                simpleTimeFormat: true,
                popularTabTop: false,
                blockAlert: false
            },
        
            catalog: {
                recentCategory: true
            },
        
            assets: {
                assetStats: true,
                ownersList: true
            },
        
            profile: {
                profileStatus: undefined, // Disabled.
                lastOnline: true,
                easyStatistics: false
            },
        
            theme: {
                oldRobuxIcons: false,
                oldTopBarText: false,
                changeBackToGames: false,
                groupedHomePage: false,
        
                smallChatTab: false,
                fancyScrollBar: false
            },
            
            currentSubDomain: "www.roblox.com",
            otherExtensionWarning: undefined, // Unused.
            setupComplete: false
        };

        this.init();
    }

    async init () { // Rewrite?
        let storageSettings = (await dashblox.storage.get("settings")).settings;

        if (!storageSettings) {
            this.loadedSettings = this.defaultSettings;
            dashblox.storage.save("settings", this.loadedSettings);
        } else {
            Object.entries(this.defaultSettings).forEach(([categoryName, category]) => {
                if (typeof categoryName === "string" && category instanceof Object) {
                    Object.entries(category).forEach(([settingName, setting]) => {
                        if (storageSettings[categoryName] && !storageSettings[categoryName][settingName] === undefined) {
                            storageSettings[categoryName][settingName] = setting;
                        } else if (!storageSettings[categoryName]) {
                            storageSettings[categoryName] = category;
                        }
                    })
                } else if (typeof categoryName === "string" && !category instanceof Object) {
                    if (!storageSettings[categoryName]) {
                        storageSettings[categoryName] = category;
                    }
                }
            })

            this.loadedSettings = storageSettings;
            dashblox.storage.save("settings", this.loadedSettings);
        }

        this.defaultSettings = null; // Assuming this helps.
    }

    get (category, setting) {
        if (!setting) {return this.loadedSettings[category]};
        return this.loadedSettings[category][setting];
    }

    set (category, setting, value) {
        if (value == null || value == undefined) {
            value = setting;
            this.loadedSettings[category] = value;
            dashblox.storage.save("settings", this.loadedSettings);
        } else {
            this.loadedSettings[category][setting] = value;
            dashblox.storage.save("settings", this.loadedSettings);
        }
    }
}

const settings = new SettingsClass();

if (serviceWorker) {
    runtime.onMessage.addListener((message, sender, sendMessage) => {
        switch (message.request) {
            case "get":
                let dataString = Object.entries(message.data).map(([key, value]) => {
                    return `${key}=${value}`;
                }).join("&");

                fetch(`${message.url}${Object.keys(message.data).length > 0 ? "?" : ""}${dataString}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => {
                    response.json().then((data) => {
                        sendMessage(data);
                    })
                });

                break;
            case "post":
                fetch(message.url, {
                    method: "POST",
                    body: JSON.stringify(message.data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => {
                    response.json().then((data) => {
                        sendMessage(data);
                    })
                });

                break;
            case "fetch":
                fetch(message.data).then((response) => {
                    response.json().then((data) => {
                        sendMessage(data);
                    })
                });
                
                break;
        }
    
        return true;
    })
    
    runtime.onUpdateAvailable.addListener((details) => {
        runtime.reload();
    })
    
    try {
        self.importScripts("background/browseraction.js");
    } catch (error) {
        console.error(error);
    }
}