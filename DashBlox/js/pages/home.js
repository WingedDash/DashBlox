"use strict"

pages.home = (settings) => {
    if (settings.theme.changeBackToGames) {
        $.watch(".font-header-1", () => {
            $("#place-list > .game-home-page-container > .game-home-page-carousel-title > .font-header-1:Contains('Continue')")[0].innerText = "Continue Playing";
            $("#place-list > .game-home-page-container > .game-home-page-carousel-title > .font-header-1:Contains('Friends Visiting')")[0].innerText = "Friends Playing";
        })
    }
}