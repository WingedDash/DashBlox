"use strict"

pages.catalog = () => {
    $.watch(".heading.ng-scope", () => {
        $("#main-view > .search-bars > .heading.ng-scope > a")[0].text = "Catalog";
    })
}