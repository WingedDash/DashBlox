"use strict"

pages.games = (gameId) => {
    if (settings.get("theme.changeBackToGames")) {
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

    if (settings.get("games.pinningGames")) {
        $.watch(".game-calls-to-action", (selector) => {
            selector.prepend(`<div class="game-extra-context"> <button class="rbx-menu-item btn-generic-more-sm"> <span class="game-pin-icon"></span> </button> </div>`);

            if ($("#game-context-menu").length >= 1) {
                $(".game-extra-context").css("right", "35px");
            } 
        })
    }

    if (developerMode) {
        try {
            $.watch("#game-detail-meta-data", () => {
                const universeId = document.querySelector("#game-detail-meta-data").dataset.universeId;
    
                console.log(`UniverseId: ${universeId || "Unknown"}`);
    
                dashblox.get(`https://develop.roblox.com/v1/universes/${universeId}/places`, {sortOrder: "Asc", limit: 100}).then((response) => {
                    console.log("Places associated with this game:");
                    console.log(response?.data || "Unknown");
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}