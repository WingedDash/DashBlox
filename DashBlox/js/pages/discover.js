"use strict"

pages.discover = () => {
    return
    if (settings.get("general.popularTabTop")) {
        $.watch(".container-header.games-filter-changer:Contains('Popular Worldwide')", (selector) => {
            var popularTab = $(selector.parent()[0]);
            
            $(".container-header.games-filter-changer:Contains('Popular Worldwide') > h2 > a")[0].innerText = "Popular";
            $(".container-header.games-filter-changer:Contains('Popular') > h2 > a")[0].innerText = "Popular Near You";

            console.log(popularTab)
            
            popularTab.insertBefore($($(".games-list-container.is-windows")[0]));
        })
    }

    if (settings.get("theme.changeBackToGames")) {
        $.watch(".games-list-header h1", (selector) => {
            selector[0].innerText = "Games"
        })
    }
}