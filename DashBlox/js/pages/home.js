"use strict"

pages.home = () => {
    if (settings.get("theme", "groupedHomePage")) {
        $.watch(".game-home-page-carousel-title:Contains('Favorites')", (favorites) => {
            let favoritesTab = favorites.next();

            $.watch(".game-home-page-carousel-title:Contains('Friend Activity')", (friendsPlaying) => {
                console.log(friendsPlaying);

                favoritesTab.insertAfter(friendsPlaying.next());
                favorites.insertAfter(friendsPlaying.next());
    
                favoritesTab.after(`<h1 style="text-align: center;">Recommended</h1>`);
            })
        })
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