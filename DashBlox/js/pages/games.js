"use strict"

pages.games = (gameId) => {
    $.watch(".text-label.text-overflow.font-caption-header:contains('Active')", () => {
        $(".text-label.text-overflow.font-caption-header:contains('Active')")[0].innerText = "Playing";
    })
}