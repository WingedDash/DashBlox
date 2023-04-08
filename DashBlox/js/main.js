"use strict"

const runtime = chrome.runtime;
const manifest = runtime.getManifest();

const developerMode = (manifest.short_name === "DashBlox_dev");
const betaMode = (manifest.short_name === "DashBlox_beta");

const allowConsoleErrors = (developerMode || betaMode);

const storage = chrome.storage.local;

const serviceWorker = !self.window;

const pages = {};

/*
const dashblox = {
    get: (url, data) => {
        let message = {url: url, data: data || {}, request: "get"};

        return new Promise((resolve, reject) => {
            runtime.sendMessage(message, (response) => {
                if (response) resolve(response);
                reject({message: "A error occurred while fetching your request."});
            })
        })
    },

    post: (url, data) => {
        let message = {url: url, data: data, request: "post"};

        return new Promise((resolve, reject) => {
            runtime.sendMessage(message, (response) => {
                if (response) resolve(response);
                reject({message: "A error occurred while posting your request."});
            })
        })
    },

    fetch: (data) => {
        let message = {data: data, request: "fetch"};

        return new Promise((resolve, reject) => {
            runtime.sendMessage(message, (response) => {
                if (response) resolve(response);
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
*/

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
        console.warn(error);
    }

    console.log(`DashBlox v${manifest.version} ${(!developerMode && !betaMode) ? "Stable" : (developerMode && !betaMode) ? "Development" : "Beta"} build has successfully loaded!`);
}

if (!serviceWorker) {
}