"use strict"

const runtime = chrome.runtime;
const manifest = runtime.getManifest();

const developerMode = (manifest.short_name === "DashBlox_dev");

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
    }
}