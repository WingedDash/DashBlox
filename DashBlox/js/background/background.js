"use strict"

const runtime = chrome.runtime;
const manifest = runtime.getManifest();

const developerMode = (manifest.short_name === "DashBlox_dev");

const storage = chrome.storage.local;

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