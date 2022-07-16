"use strict"

pages.groups = async (groupId) => {
    if (settings.get("theme.changeBackToGames")) {
        $.watch(".section.ng-scope > .container-header > .ng-binding:Contains('Experiences')", (selector) => {
            selector[0].innerText = "Games";
        })
    }
}