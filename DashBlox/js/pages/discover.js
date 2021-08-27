"use strict"

pages.discover = () => {
    $.watch(".container-header.games-filter-changer:Contains('Popular')", (selector) => {
        var popularTab = $(selector.parent().parent()[0])

        popularTab.insertBefore($($(".games-list-container.is-windows")[0]))
    })
}