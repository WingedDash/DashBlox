"use strict"

pages.discover = () => {
    $.watch(".container-header.games-filter-changer", () => {
        var popular = $($(".container-header.games-filter-changer:Contains('Popular')").parent().parent()[0])
        // Because the popular tab should always be at the top \\
        popular.insertBefore($($(".games-list-container.is-windows")[0]))
    })
}