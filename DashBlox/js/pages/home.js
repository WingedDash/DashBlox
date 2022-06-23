"use strict"

pages.home = async () => {
    if (settings.get("theme", "groupedHomePage")) {
        $.watch(".game-home-page-carousel-title:Contains('Favorites')", (favorites) => {
            let favoritesTab = favorites.next();

            $.watch(".game-home-page-carousel-title:Contains('Friend Activity')", (friendsPlaying) => {
                favoritesTab.insertAfter(friendsPlaying.next());
                favorites.insertAfter(friendsPlaying.next());
    
                favoritesTab.after(`<div class="rbx-divider"></div>`);
                favoritesTab.after(`<h1 style="text-align: center;">Recommended</h1>`);
            })
        })
    }

    if (settings.get("theme", "profileHomePage")) {
        const authUser = await util.getAuthUser();

        if (authUser.userId > 0) {
            const avatarHeadshot = await dashblox.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot`, {userIds: authUser.userId, size: "352x352", format: "Png", isCircular: false});

            if (!avatarHeadshot) return;

            $.watch("#HomeContainer .section .col-xs-12.container-header h1", (selector) => {
                selector.before(`<div class="dashblox-home-avatar">
                    <a class="avatar avatar-headshot-lg card-plain profile-avatar-image" href="https://${currentUrlPaths[2]}/users/${authUser.userId}/profile">
                        <span class="avatar-card-link avatar-image-link">
                            <thumbnail-2d class="avatar-card-image profile-avatar-thumb ng-scope ng-isolate-scope"><span class="thumbnail-2d-container"> <img class="ng-scope ng-isolate-scope" src="${avatarHeadshot.data[0].imageUrl}" draggable="false">  </span> </thumbnail-2d>
                        </span>
                    </a>
                
                    <h1>${authUser.displayName || "???"}</h1>
                </div>`)

                selector.remove();
            })
        }
    }

    if (settings.get("theme", "changeBackToGames")) {
        $.watch(".font-header-1", () => {
            try {
                $("#place-list > .game-home-page-container > .game-home-page-carousel-title > .font-header-1:Contains('Continue')")[0].innerText = "Continue Playing";
                $("#place-list > .game-home-page-container > .game-home-page-carousel-title > .font-header-1:Contains('Friend Activity')")[0].innerText = "Friends Playing";
            } catch (error) {
            }
        })
    }
}