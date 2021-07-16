"use strict"

pages.home = () => {
    $.watch(".container-header.games-filter-changer", () => {
        $(".container-header.games-filter-changer > h3:Contains('Continue')")[0].innerText = "Continue Playing";
        $(".container-header.games-filter-changer > h3:Contains('Friends Visiting')")[0].innerText = "Friends Playing";
    })
}