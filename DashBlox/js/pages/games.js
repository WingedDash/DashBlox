"use strict"

pages.games = (gameId) => {
    if (settings.get("theme", "changeBackToGames")) {
        $.watch(".text-label.text-overflow.font-caption-header:contains('Active')", (selector) => {
            selector[0].innerText = "Playing";
        })

        $.watch(".text-label.text-overflow.font-caption-header:contains('Server Size')", (selector) => {
            selector[0].innerText = "Max Players";
        })

        $.watch("#rbx-game-passes > .container-header > h3", (selector) => {
            selector[0].innerText = "Game Passes";
        })
    }
}