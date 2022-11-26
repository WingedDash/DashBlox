"use strict"

pages.default = async () => {
    const head = document.head || document.documentElement;

    $.watch("body", (body) => {
        body.addClass('dashblox');
    })

    $.watch("#navigation-container", (selector) => {
        selector.addClass('dashblox');
    })

    if (settings.get("theme.oldTopBarText")) {
        $.watch(".navbar-fixed-top.rbx-header", () => {
            $(".font-header-2.nav-menu-title.text-header:contains('Discover')")[0].innerText = "Games";
            $(".font-header-2.nav-menu-title.text-header:contains('Avatar Shop')")[0].innerText = "Catalog";
        })
        
        $.watch(".btn-growth-md.btn-secondary-md", (selector) => {
            selector[0].text = "Upgrades";
        })
    }

    if (settings.get("theme.oldRobuxIcons")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = runtime.getURL("css/robux.css");

        head.appendChild(link);
    }

    if (settings.get("theme.oldNavigationIcons")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = runtime.getURL("css/navigationIcons.css");

        head.appendChild(link);
    }

    if (settings.get("theme.fancyScrollBar")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = runtime.getURL("css/scrollbar.css");

        head.appendChild(link);
    }

    if (settings.get("theme.smallChatTab")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = runtime.getURL("css/chat.css");

        head.appendChild(link);
    }
    
    if (!settings.get("setupComplete")) {
        $.watch("body", (body) => {
            let blackBarrier = $(`<div style="background-color: rgb(0, 0, 0); opacity: 0.8; height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 1041;" id="" class=""></div>`).appendTo(body);
            let setupNotification = $(`
            <div class="dashblox-setup-notification">
                <div class="section-content">
                    <span class="dashblox-icon"></span>
                <h3>Thank you for installing DashBlox!</h3>
                <pre class="text">DashBlox has a lot of features that aren't enabled by default, and if you want to customize the way DashBlox modifies Roblox, you can customize it in DashBlox settings.\n\nIf you don't want to customize settings right now, you can always do it later by pressing the gear icon in the top right and selecting 'DashBlox".</pre>
                <div class="settings-confirmation">
                    <a href="https://${documentLocation.hostname}/dashblox/settings" id="confirm-btn" class="btn-primary-md">Customize Settings</a>
                    <a id="decline-btn" class="btn-control-md">Use Default Settings</a>
                </div>
            </div>`).prependTo(body);

            $(".settings-confirmation #confirm-btn").click(() => {
                settings.set("setupComplete", true);
                $(".settings-confirmation #confirm-btn").unbind("click");
            })

            $(".settings-confirmation #decline-btn").click(() => {
                settings.set("setupComplete", true);
                blackBarrier.remove();
                setupNotification.remove();
                $(".settings-confirmation #decline-btn").unbind("click");
            })
        })
    }

    $.watch("#navbar-settings button", (settingsIcon) => {
        settingsIcon.click(() => {
            $.watch("#settings-popover-menu", (popover) => {
                if (!$(".dashblox-rbx-menu-item").length > 0) {
                    popover.prepend(`<li><a class="rbx-menu-item dashblox-rbx-menu-item" href="https://${documentLocation.hostname}/dashblox/settings">DashBlox</a></li>`)
                }
            })
        })
    })

    if (settings.get("general.blockAlert")) {
        $.watch(".alert-container", (alert) => {
            alert.attr("style", "display: none;");
        })
    }

    if (settings.get("currentSubDomain") != documentLocation.hostname) { // Why did Roblox make this more complicated than it should be?
        settings.set("currentSubDomain", documentLocation.hostname);
    }

    if (developerMode) {
        console.log(settings.loadedSettings);
    }
}