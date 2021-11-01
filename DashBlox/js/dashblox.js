"use strict"

const runtime = chrome.runtime;
const manifest = runtime.getManifest();

const developerMode = (manifest.short_name === "DashBlox_dev");

const backgroundPage = !!(chrome && chrome.extension && chrome.extension.getBackgroundPage);

const storage = chrome.storage.local;

const updateLog = `
Update 2.0.1:
1). Fixed certain issues caused by other extensions.

Update 2.0.0:
1). DashBlox has been completely rewritten.
2). New time formats.
3). Better statistics for assets, now works for bundles, game passes, and badges.
4). Profile statuses have been readded.
5). View when a user was last online.
6). Old robux icons have gotten a huge upgrade, which makes robux icons around the whole platform have the old icons.
7). The old top bar now has "discovery" changed to "games".
8). You can change whether you want the site to say "experiences" or "games" now.
9). You can now have a better looking scrollbar.
10). Owners list is temporarily removed, it will be added back for certain assets later.
11). Overall speed improvements.

Version: ${manifest.version}
Updated: 10/15/2021
`

const dashblox = {
    get: (url, data) => {
        let message = {url: url, data: data, request: "get"};

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

    ajax: (data) => {
        let message = {data: data, request: "ajax"};

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

const settings = {
    defaultSettings: {
        general: {
            simpleTimeFormat: true,
            popularTabTop: false,
            blockAlert: false
        },
    
        catalog: {

        },
    
        assets: {
            assetStats: true,
            ownersList: true
        },
    
        profile: {
            profileStatus: true,
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
        
        otherExtensionWarning: false,
        setupComplete: false
    },

    loadedSettings: null,

    get(category, setting) {
        if (!setting) {return this.loadedSettings[category]};
        return this.loadedSettings[category][setting];
    },

    set(category, setting, value) {
        if (value == null || value == undefined) {
            value = setting;
            this.loadedSettings[category] = value;
            dashblox.storage.save("settings", this.loadedSettings);
            console.log("this")
        } else {
            this.loadedSettings[category][setting] = value;
            dashblox.storage.save("settings", this.loadedSettings);
        }
    },

    async load() {
        let oldSettings = (await dashblox.storage.get("settings")).settings;

        if (!oldSettings) {
            this.loadedSettings = this.defaultSettings;
            dashblox.storage.save("settings", this.loadedSettings);
        } else {
            Object.entries(this.defaultSettings).forEach(([categoryName, category]) => {
                if (typeof categoryName === "string" && category instanceof Object) {
                    Object.entries(category).forEach(([settingName, setting]) => {
                        if (oldSettings[categoryName] && !oldSettings[categoryName][settingName] === undefined) {
                            oldSettings[categoryName][settingName] = setting;
                        } else if (!oldSettings[categoryName]) {
                            oldSettings[categoryName] = category;
                        }
                    })
                } else if (typeof categoryName === "string" && !category instanceof Object) {
                    if (!oldSettings[categoryName]) {
                        oldSettings[categoryName] = category;
                    }
                }
            })

            this.loadedSettings = oldSettings;
            dashblox.storage.save("settings", this.loadedSettings);
        }
    }
}

if (backgroundPage) {
    runtime.onMessage.addListener((message, sender, sendMessage) => {
        switch (message.request) {
            case "get":
                $.get(message.url, message.data, sendMessage);
                break;
            case "post":
                $.post(message.url, message.data, sendMessage);
                break;
            case "ajax":
                $.ajax(message.data, sendMessage);
                break;
        }
    
        return true;
    })

    runtime.onUpdateAvailable.addListener((details) => {
        runtime.reload();
    })
}

settings.load();