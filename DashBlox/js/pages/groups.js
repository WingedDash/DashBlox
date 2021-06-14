"use strict"

pages.groups = async (groupId) => {
    $.watch(".ng-binding:Contains('Experiences')", () => {
        $(".section.ng-scope > .container-header > .ng-binding:Contains('Experiences')")[0].innerText = "Games";
    })
}