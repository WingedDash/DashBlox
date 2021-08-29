"use strict"

const runtime = chrome.runtime;
const manifest = runtime.getManifest();

const developerMode = (manifest.short_name === "DashBlox_dev");

const backgroundPage = !!(chrome && chrome.extension && chrome.extension.getBackgroundPage);

const storage = chrome.storage.local;

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
            simpleTimeFormat: true
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
    
            smallChatTab: false,
            fancyScrollBar: false
        },
        
        setupComplete: false
    },

    loadedSettings: null,

    get(category, setting) {
        if (!setting) {return this.loadedSettings[category]};
        return this.loadedSettings[category][setting];
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
                        if (oldSettings[categoryName] && !oldSettings[categoryName][settingName]) {
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