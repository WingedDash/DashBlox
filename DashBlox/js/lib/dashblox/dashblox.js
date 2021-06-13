"use strict"

const dashblox = {};

const runtime = chrome.runtime;
const manifest = runtime.getManifest();

const developerMode = (manifest.short_name === "DashBlox_dev");

const storage = chrome.storage.local;

dashblox.get = ((url, data) => {
    return new Promise((resolve, reject) => {
        let message = {
            url: url,
            data: data,
            request: "get"
        }

        runtime.sendMessage(message, (response) => {
            if (response) {
                resolve(response);
            }
            reject([{code: 0, message: "an error accoured getting your request."}]);
        })
    })
})

dashblox.post = ((url, data) => {
    return new Promise((resolve, reject) => {
        let message = {
            url: url,
            data: data,
            request: "post"
        }

        runtime.sendMessage(message, (response) => {
            if (response) {
                resolve(response);
            }
            reject([{code: 0, message: "an error accoured getting your request."}]);
        })
    })
})