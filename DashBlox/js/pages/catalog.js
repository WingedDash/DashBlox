"use strict"

pages.catalog = (settings) => {
    if (settings.theme.oldTopBarText) {
        $.watch(".heading.ng-scope", () => {
            $("#main-view > .search-bars > .heading.ng-scope > a")[0].text = "Catalog";
        })
    }

    $.watch(".font-header-2.text-subheader.panel.panel-default.ng-scope", (selector) => {
        $(selector[1]).after(`<li class="font-header-2 text-subheader panel panel-default ng-scope"> <a id="expandable-menu-category-1" class="small text menu-link text-link-secondary panel-heading"> <a class="small text menu-link text-link-secondary panel-heading" href="https://www.roblox.com/catalog?Category=1&amp;CreatorID=1&amp;SortType=3&amp;IncludeNotForSale">Most Recent Items</a> <span class="toggle-submenu ng-hide icon-minus"></span> </a> </li>`);
    })
}