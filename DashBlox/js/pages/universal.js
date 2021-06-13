"use strict"

pages.universal = (id) => {
    $.watch(".navbar-fixed-top.rbx-header", () => {
        $(".font-header-2.nav-menu-title.text-header:contains('Discover')")[0].text = "Games";
        $(".font-header-2.nav-menu-title.text-header:contains('Avatar Shop')")[0].text = "Catalog";
    })
    
    $.watch(".btn-growth-md.btn-secondary-md", () => {
        $(".btn-growth-md.btn-secondary-md")[0].text = "Upgrades";
    })
    
    $.watch(".icon-robux-28x28.roblox-popover-close", () => {
        $(".icon-robux-28x28.roblox-popover-close").removeClass("icon-robux-28x28").addClass("icon-nav-robux");
    })

    $.watch("body", () => {
        $('body').addClass('dashblox');
    })

    if (developerMode) {
        /*
        $.watch(".content", () => {
            $("#Leaderboard-Abp").remove();
            $("#ProfilePageAdDiv1").remove();
            $("#ProfilePageAdDiv2").remove();
            $("#AdvertisingLeaderboard").remove();
            $(".Ads_WideSkyscraper").remove();
            $("#Skyscraper-Abp-Right").remove();
        }) 
        */
    }
}