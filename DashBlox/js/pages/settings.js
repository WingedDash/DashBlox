"use strict"

pages.settings = () => {
    $.watch(".content", (content) => {
        content.empty();

        $("title")[0].text = "Settings - DashBlox";
        jQuery("link[rel='icon']").attr("href", chrome.extension.getURL("icons/logo/logo256.png"));
    })
}