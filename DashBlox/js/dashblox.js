"use strict"

const runtime = chrome.runtime;
const manifest = runtime.getManifest();

const developerMode = (manifest.short_name === "DashBlox_dev");
const betaMode = (manifest.short_name === "DashBlox_beta");

const storage = chrome.storage.local;

const serviceWorker = !self.window;

const updateLog = `
Update 2.1.0:
- Added a new setting for a grouped home page.
- Added a new setting to block Roblox alerts.
- Added a new setting to pin games.
- Added a new setting for the most recent catalog items.
- Added a new setting for DashBlox updates.
- Added a new setting for original navigation icons.
- Added a new setting to get the classic home page back. (Experimental)
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

class DashBloxSettings {
    constructor () {
        this.loadedSettings = null;
        
        this.defaultSettings = {
            general: {
                dashbloxUpdates: true,
                simpleTimeFormat: true,
                popularTabTop: false,
                blockAlert: false
            },

            games: {
                pinningGames: true
            },
        
            catalog: {
                recentCategory: true
            },
        
            assets: {
                assetStats: true,
                ownersList: true
            },
        
            profile: {
                profileStatus: undefined, // Removed.
                lastOnline: true,
                easyStatistics: false
            },
        
            theme: {
                oldRobuxIcons: false,
                oldTopBarText: false,
                groupedHomePage: false,
                profileHomePage: false, // Experimental, the removal of this feature itself it worrying.
                changeBackToGames: false, // Experimental, lots of pages that can be broken by a simple roblox update.
                oldNavigationIcons: false,
        
                smallChatTab: false,
                fancyScrollBar: false
            },
            
            currentSubDomain: "www.roblox.com",
            otherExtensionWarning: undefined, // Unused.
            setupComplete: false
        };

        this.init();
    }

    async init () {
        const storageSettings = (await dashblox.storage.get("settings")).settings;

        if (!storageSettings) {
            this.loadedSettings = this.defaultSettings;
            dashblox.storage.save("settings", this.loadedSettings);
        } else {
            this.loadedSettings = storageSettings;
        }

        this.defaultSettings = undefined;
    }

    get (rawLocation) {
        if (!rawLocation instanceof String) return;

        const location = rawLocation.split(".");
        
        let previousCategory = null;
        let currentCategory = this.loadedSettings;

        let successful = false;

        for (const data of location) {
            previousCategory = currentCategory;
            currentCategory = currentCategory?.[data];
        }

        for (const key of Object.keys(previousCategory)) {
            if (key == location[location.length - 1]) {
                successful = true;
            }
        }

        if (!successful) return;

        return currentCategory;
    }

    set (rawLocation, value) {
        // if (!rawLocation instanceof String) return;
        // if (!value) return;

        // const location = rawLocation.split(".");
        
        // let currentCategory = this.loadedSettings;

        // for (const index in location) {
        //     const data = location[index];

        //     currentCategory = currentCategory?.[data];

        //     if (currentCategory == null) {
        //         if (index == (location.length - 1)) {
        //             break;
        //         }

        //         currentCategory = {};
        //     }
        // }

        // currentCategory = value;

        // dashblox.storage.save("settings", this.loadedSettings);
        if (value == null) {
            value = setting;
            this.loadedSettings[category] = value;
            dashblox.storage.save("settings", this.loadedSettings);
        } else {
            this.loadedSettings[category][setting] = value;
            dashblox.storage.save("settings", this.loadedSettings);
        }
    }
}

const settings = new DashBloxSettings();

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
    
    try { // Reminder: Check chrome for better practice in the future.
        self.importScripts("background/browseraction.js");
    } catch (error) {
        console.error(error);
    }
}