"use strict"

const settings = {
    
}

pages.settings = () => {
    $.watch(".content", () => {
        $(".content").empty();

        $("title")[0].text = "Settings - DashBlox";
    })
}