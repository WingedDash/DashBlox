"use strict"

pages.profile = async (userId) => {
    let authUser = await util.getAuthUser();
        
    $.watch("#userStatusText", () => {
        $("#container-main > div.content > div.profile-container.ng-scope > div > div.section.profile-header > div > div.profile-header-top > div.header-caption > div.ng-scope > div").removeClass("ng-hide");

        if (authUser.userId === userId) {
            if ($("#popover-content > ul > li:nth-child(5)").length > 0) {
                $("#popover-content > ul > li:nth-child(5)").removeClass("ng-hide");
            }
        }
    })

    $.watch(".profile-game.ng-scope.section", () => {
        $(".profile-game.ng-scope.section > .container-header > h3:Contains('Experiences')")[0].innerText = "Games";
    })

    if (userId == 531629183) {
        $.watch(".text-lead:contains('2/26/2018')", () => {
            $(".text-lead:contains('2/26/2018')")[0].innerText = "8/8/2014";
        })

        $.watch(".border.asset-thumb-container.icon-badge-homestead", () => {
            $(".list-item.asset-item:Contains('Homestead')").before(`
            <li class="list-item asset-item">
                <a class="" title="The creator of DashBlox!">
                    <span class="border asset-thumb-container icon-badge-creator" title="Creator"></span>
                    <span class="font-header-2 text-overflow item-name">Creator</span>
                </a>
            </li>`)
        })
    }
}