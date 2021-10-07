"use strict"

pages.discover = () => {
    $.watch(".container-header.games-filter-changer:Contains('Popular Worldwide')", (selector) => {
        var popularTab = $(selector.parent().parent()[0]);
        
        $(".container-header.games-filter-changer:Contains('Popular Worldwide') > h3")[0].innerText = "Popular";
        $(".container-header.games-filter-changer:Contains('Popular') > h3")[0].innerText = "Popular Near You";
        
        popularTab.insertBefore($($(".games-list-container.is-windows")[0]));
    })
}