"use strict"

pages.settings = () => {
    $.watch(".content", (content) => {
        content.empty();

        $("title")[0].text = "Settings - DashBlox";
    })
}