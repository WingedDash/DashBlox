"use strict"

pages.avatar = () => {
    $.watch(".redraw-avatar .text-link", (selector) => {
        selector.after(`<a class="text-link" ng-click="openAdvancedAccessories()"  style="margin-right:10px">Advanced</a>`)
    })
}