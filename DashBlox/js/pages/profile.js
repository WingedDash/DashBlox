"use strict"

pages.profile = async (userId, settings) => {
    let authUser = await util.getAuthUser();

    if (settings.profile.profileStatus) {
        $.watch(".header-caption", async () => {
            try {
                let userStatus = await $.get(`https://users.roblox.com/v1/users/${userId}/status`);
    
                if (userStatus.status) {
                    $(".header-caption > .header-names").after(`<div class="header-user-status"> <span class="text">"${userStatus.status}"</span> </div>`)
                }
        
                if (authUser.userId === userId) {
                    let updateStatus = $("#popover-content > ul > li:nth-child(5)");
    
                    if (updateStatus.length > 0) {
                        updateStatus.removeClass("ng-hide");
                        
                        $("#popover-content > ul > li:nth-child(5) > a").attr("href", "https://www.roblox.com/feeds/");
                    }
                }
            } catch (err) {
                if (developerMode) {
                    console.log(err);
                }
            }
        })
    }

    if (settings.theme.changeBackToGames) {
        $.watch(".profile-game.ng-scope.section", () => {
            $(".profile-game.ng-scope.section > .container-header > h3:Contains('Experiences')")[0].innerText = "Games";
        })
    }

    switch (userId) {
        case 1: {
            $.watch(".container-header", () => {
                $(".container-header > .collection-btns").append(`<a href="https://www.roblox.com/catalog?Category=1&amp;CreatorID=1&amp;SortType=3&amp;IncludeNotForSale" class="btn-min-width btn-secondary-xs btn-more inventory-link see-all-link-icon ng-binding">Recent Items</a>`);
            })

            break;
        }

        case 531629183: {
            $.watch(".text-lead:contains('2/26/2018')", () => {
                $(".text-lead:contains('2/26/2018')")[0].innerText = "8/8/2014";
            })
    
            $.watch(".border.asset-thumb-container.icon-badge-homestead", () => {
                $(".list-item.asset-item:Contains('Homestead')").before(`<li class="list-item asset-item"> <a href="https://chrome.google.com/webstore/detail/dashblox/ogffnhpicoghhpcbememhijlbdejchjb" title="The creator of DashBlox!"> <span class="border asset-thumb-container icon-badge-creator" title="Creator"></span> <span class="font-header-2 text-overflow item-name">Creator</span> </a> </li>`)
            })

            break;
        }
    }
}