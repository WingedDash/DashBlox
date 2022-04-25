"use strict"

pages.universal = async () => {
    $.watch("body", (body) => {
        body.addClass('dashblox');
    })

    if (settings.get("theme", "oldTopBarText")) {
        $.watch(".navbar-fixed-top.rbx-header", () => {
            $(".font-header-2.nav-menu-title.text-header:contains('Discover')")[0].innerText = "Games";
            $(".font-header-2.nav-menu-title.text-header:contains('Avatar Shop')")[0].innerText = "Catalog";
        })
        
        $.watch(".btn-growth-md.btn-secondary-md", (selector) => {
            selector[0].text = "Upgrades";
        })
    }

    $.watch("head", () => {
        if (settings.get("theme", "oldRobuxIcons")) {
            injectCSS("css/robux.css");
        }
    
        if (settings.get("theme", "fancyScrollBar")) {
            injectCSS("css/scrollbar.css");
        }
    
        if (settings.get("theme", "smallChatTab")) {
            injectCSS("css/chat.css");
        }
    })
    
    if (!settings.get("setupComplete")) {
        $.watch("body", (body) => {
            let blackBarrier = $(`<div style="background-color: rgb(0, 0, 0); opacity: 0.8; height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 1041;" id="" class=""></div>`).appendTo(body);
            let setupNotification = $(`
            <div class="dashblox-setup-notification">
                <div class="section-content">
                    <img src="${chrome.runtime.getURL("/resources/icons/logo/256/normal.png")}" class="dashblox-icon">
                <h3>Thank you for installing DashBlox!</h3>
                <pre class="text">DashBlox has a lot of features that aren't enabled by default, and if you want to customize the way DashBlox modifies Roblox, you can customize it in DashBlox settings.

Don't worry if you don't want to customize settings right now, you can always do it later by pressing the gear icon in the top right and selecting 'DashBlox".</pre>
                <div class="settings-confirmation">
                    <a href="https://${currentUrlPaths[2]}/dashblox/settings" id="confirm-btn" class="btn-primary-md">Customize Settings</a>
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

    $.watch("#settings-icon", (settingsIcon) => {
        settingsIcon.click(() => {
            $.watch("#settings-popover-menu", (popover) => {
                if (!$(".dashblox-rbx-menu-item").length > 0) {
                    popover.prepend(`<li><a class="rbx-menu-item dashblox-rbx-menu-item" href="https://${currentUrlPaths[2]}/dashblox/settings">DashBlox</a></li>`)
                }
            })
        })
    })

    if (settings.get("general", "blockAlert")) {
        $.watch(".alert-container", (alert) => {
            alert.attr("style", "display: none;");
        })
    }

    if (settings.get("currentSubDomain") != currentUrlPaths[2]) { // Why did Roblox make this more complicated than it should be?
        settings.set("currentSubDomain", currentUrlPaths[2]);
    }

    if (developerMode) {
        console.log(settings.loadedSettings);
    }
}