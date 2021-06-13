"use strict"

pages.settings = () => {
    $.watch(".content", () => {
        $(".content").empty();
    })
}