"use strict"

pages.profile = async (userId) => {
    if (settings.get("profile.lastOnline")) {
        try {
            const onlineStats = await dashblox.get(`https://api.roblox.com/users/${Number(userId)}/onlinestatus`);

            if (!onlineStats) return;

            const lastOnline = onlineStats.LastOnline;
            const presenceType = onlineStats.PresenceType;

            const profileStatsContainer = await $.watch(".profile-stats-container");
            profileStatsContainer.classList.add("last-online-stat");

            // $($(".profile-stats-container > .profile-stat")[0]).after(`<li class="profile-stat"><p class="text-label">Last Online</p><p class="text-lead">${presenceType === 0 ? util.timeFormat(lastOnline) : "Currently Online"}</p></li>`);
        } catch (error) {
            if (allowConsoleErrors) {
                console.log(error);
            }
        }
    }

    if (settings.get("profile.easyStatistics")) {
        (await $.watch(".section .profile-statistics > .container-header")).remove();
        // (await $.watch("#profile-current-wearing-avatar")).appendChild(document.querySelector("#profile-statistics-container"))
    }

    if (settings.get("profile.changeBackToGames")) {
        $.watch(".profile-game.ng-scope.section", () => {
            $(".profile-game.ng-scope.section > .container-header > h3:Contains('Experiences')")[0].innerText = "Games";
        })
    }
    return
    try {
        const groupMembership = await dashblox.get(`https://groups.roblox.com/v1/users/${Number(userId)}/groups/roles`);

        if (!groupMembership) return;

        for (const member of groupMembership.data) {
            if (member.group.id !== 15157542) continue;

            switch (member.role.name) {
                case "Member": {
                    if (developerMode) console.log("This person is cool, they're a DashBlox Member.");

                    break;
                }

                case "Beta Tester": {
                    $.watch("#roblox-badges-container > .section-content > .hlist.badge-list > .list-item.asset-item", (selector) => {
                        $(selector[0]).before(`<li class="list-item asset-item"> <a href="https://www.roblox.com/groups/15157542/DashBlox" title="This badge is awarded to the beta testers of DashBlox!"> <span class="border asset-thumb-container icon-badge-dashblox-beta-tester" title="DashBlox Beta Tester"></span> <span class="font-header-2 text-overflow item-name">DashBlox Tester</span> </a> </li>`);
                    });

                    break;
                }

                case "Owner": {
                    $.watch("#roblox-badges-container > .section-content > .hlist.badge-list > .list-item.asset-item", (selector) => {
                        $(selector[0]).before(`<li class="list-item asset-item"> <a href="https://www.roblox.com/dashblox/settings" title="This badge is awarded to the developers of DashBlox!"> <span class="border asset-thumb-container icon-badge-dashblox-creator" title="DashBlox Developer"></span> <span class="font-header-2 text-overflow item-name">DashBlox</span> </a> </li>`);
                    });

                    break;
                }
            }

        }
    } catch (error) {
        if (allowConsoleErrors) {
            console.log(error);
        }
    }

    switch (Number(userId)) {
        case 1: {
            $.watch(".container-header", () => {
                $(".container-header > .collection-btns").append(`<a href="https://${documentLocation.hostname}/catalog?Category=1&CreatorName=Roblox&salesTypeFilter=1&SortType=3&IncludeNotForSale" class="btn-min-width btn-secondary-xs btn-more inventory-link see-all-link-icon ng-binding">Recent Items</a>`);
            });

            break;
        }

        case 531629183: {
            const headerStatus = [
                "Hello World!",
                "Welcome to my profile!",
                "Profile statuses? Nope, it's just a fun easter egg.",
                "If you scroll out far enough, you'll see the end of the universe.",
                "Check out my cool badges. 😎",
                "Roblox is a platform, not a metaverse, prove me wrong."
            ];

            $.watch(".text-lead:contains('2/26/2018')", (selector) => {
                selector[0].innerText = "8/8/2014";
            });

            $.watch(".header-caption > .header-names", (selector) => {
                selector.after(`<div class="header-user-status"> <span class="text">"${headerStatus[Math.floor(Math.random() * headerStatus.length)]}"</span> </div>`);
            })

            break;
        }
    }
}