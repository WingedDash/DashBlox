"use strict"

pages.universal = async () => {
    $.watch("body", (body) => {
        body.addClass('dashblox');
    })

    if (settings.get("theme", "oldTopBarText")) {
        $.watch(".navbar-fixed-top.rbx-header", () => {
            $(".font-header-2.nav-menu-title.text-header:contains('Discover')")[0].text = "Games";
            $(".font-header-2.nav-menu-title.text-header:contains('Avatar Shop')")[0].text = "Catalog";
        })
        
        $.watch(".btn-growth-md.btn-secondary-md", (selector) => {
            selector[0].text = "Upgrades";
        })
    }

    if (settings.get("theme", "oldRobuxIcons")) {
        $.watch(".icon-robux-28x28.roblox-popover-close", (selector) => {
            selector.removeClass("icon-robux-28x28").addClass("icon-nav-robux");
        })
    }

    $.watch("head", () => {
        if (settings.get("theme", "oldRobuxIcons")) {
            injectCSS("css/robux.css");
        }
    
        if (settings.get("theme", "fancyScrollBar")) {
            injectCSS("css/fancyscrollbar.css");
        }
    
        if (settings.get("theme", "smallChatTab")) {
            injectCSS("css/chat.css");
        }
    })

    if (developerMode) {
        console.log(settings.loadedSettings);
    }
}