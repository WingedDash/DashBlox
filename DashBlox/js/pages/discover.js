"use strict"

pages.discover = (settings) => {
    $.watch(".container-header.games-filter-changer", () => {
        var popularTab = $($(".container-header.games-filter-changer:Contains('Popular')").parent().parent()[0])

        popularTab.insertBefore($($(".games-list-container.is-windows")[0]))
    })
}