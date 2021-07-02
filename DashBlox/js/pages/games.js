"use strict"

pages.games = (gameId) => {
    $.watch(".text-label.text-overflow.font-caption-header:contains('Active')", () => {
        $(".text-label.text-overflow.font-caption-header:contains('Active')")[0].innerText = "Playing";
    })

    $.watch(".text-label.text-overflow.font-caption-header:contains('Server Size')", () => {
        $(".text-label.text-overflow.font-caption-header:contains('Server Size')")[0].innerText = "Max Players";
    })

    $.watch("#rbx-game-passes", () => {
        $("#rbx-game-passes > .container-header > h3")[0].innerText = "Game Passes";
    })
}