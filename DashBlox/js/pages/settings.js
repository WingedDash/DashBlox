"use strict"

let categories = [
    {
        name: "Information",
        content: [
            {
                header: "Update Log",
                preText: updateLog,
                sectionHtml: `<div class="section-content"><span class="text-description">You can read the entire <a class="text-link" target="_blank" href="https://github.com/WingedDash/DashBlox/blob/master/Update%20log.md">Update Log</a> on the github page for DashBlox.</span></div>`
            },
            {
                header: "DashBlox's Social Media",
                sectionHtml: `<div class="section-content"><a class="icon-social-media-discord" target="_blank" href="https://discord.gg/D2wqedQpTx" style="background-position: -6.5px -8px;"></a><a class="icon-social-media-discord" target="_blank" href="https://www.roblox.com/groups/15157542/DashBlox" style="background-position: -6.5px -455px;"></a></div>`
            },
            {
                header: "Developer's Social Media",
                sectionHtml: `<div class="section-content"><a class="icon-social-media-discord" target="_blank" href="https://twitter.com/WingedDash" style="background-position: -6.5px -134px;"></a><a class="icon-social-media-discord" target="_blank" href="https://github.com/WingedDash" style="background-position: -6.5px -327px;"></a><a class="icon-social-media-discord" target="_blank" href="https://www.roblox.com/users/531629183/profile" style="background-position: -6.5px -455px;"></a></div>`
            },
            {
                header: "Experimental Features",
                icon: "icon-warning",
                text: `Experimental features are features that are still being worked on, they could have multiple bugs or glitches associated with them.`
            },
            {
                header: "Multiple Extensions",
                text: `Having multiple extensions enabled can cause problems with DashBlox, make sure that you have properly configured all of your settings in all of your extensions so that it doesn't cause any problems with DashBlox.`
            },
            {
                header: "Report A Bug",
                sectionHtml: `</div><div class="section-content"><span class="text-description">Did you find a bug and want to report it? You can report it <a class="text-link" target="_blank" href="https://github.com/WingedDash/DashBlox/issues">here</a>.</span>`
            },
            {
                header: "Privacy Policy",
                sectionHtml: `</div><div class="section-content"><span class="text-description">You can read the <a class="text-link" target="_blank" href="https://github.com/WingedDash/DashBlox/blob/master/Privacy%20Policy.md">Privacy Policy</a> to see how your data is being used and more.</span>`
            }
        ]
    },
    {
        name: "General",
        content: [
            {
                header: "DashBlox",
                options: [
                    {
                        header: "DashBlox Update Notifications (Coming Soon)",
                        text: "Get notified when DashBlox has a new major update, allowing you to explore new settings and features when they're available.",

                        toggleable: true,
                        disabled: true,
                        setting: "general.dashbloxUpdates"
                    }
                ]
            },
            {
                header: "Catalog",
                options: [
                    {
                        header: "Time Format",
                        text: "Changes whether to revert back to the old time format.",

                        toggleable: true,
                        disabled: false,
                        setting: "general.simpleTimeFormat"
                    }
                ]
            },
            {
                header: "Roblox",
                options: [
                    {
                        header: "Block Roblox Alerts",
                        text: "Removes the alert from the top of pages when Roblox sends a alert.",

                        toggleable: true,
                        disabled: false,
                        setting: "general.blockAlert"
                    }
                ]
            }
        ]
    },
    {
        name: "Games",
        content: [
            {
                header: "Discovery Page",
                options: [
                    {
                        header: "Revert Popular Tab Changes",
                        text: "Changes the position of the popular tab to the top of the games page.",

                        toggleable: true,
                        disabled: false,
                        setting: "general.popularTabTop"
                    }
                ]
            },
            {
                header: "Games Page",
                options: [
                    {
                        header: "Pinning Games (Coming Soon)",
                        text: "Allows you to pin games to your home page.",

                        toggleable: true,
                        disabled: true,
                        setting: "games.pinningGames"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Revert Experiences Back To Games",
                        text: `Reverts the "experiences" update back to "games".`,

                        toggleable: true,
                        disabled: false,
                        experimental: true,
                        setting: "theme.changeBackToGames"
                    }
                ]
            },
        ]
    },
    {
        name: "Catalog",
        content: [
            {
                header: "Assets",
                options: [
                    {
                        header: "Item Statistics",
                        text: "Shows you more information about an item on the catalog.",

                        toggleable: true,
                        disabled: false,
                        setting: "assets.assetStats"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Owners List (Coming Soon)",
                        text: "View the owners of an item on the catalog that is something you created, or is a limited.",

                        toggleable: true,
                        disabled: true,
                        setting: "assets.ownersList"
                    }
                ]
            },
            {
                header: "Catalog",
                options: [
                    {
                        header: "Most Recent Items",
                        text: "This adds a new category that lets you quickly see the most recent items on the catalog.",

                        toggleable: true,
                        disabled: false,
                        setting: "catalog.recentCategory"
                    }
                ]
            }
        ]
    },
    {
        name: "Profiles",
        content: [
            {
                header: "Information",
            },
            {
                options: [
                    {
                        header: "Last Online",
                        text: "This lets you view the last time a user was online on their profile.",

                        toggleable: true,
                        disabled: false,
                        setting: "profile.lastOnline"
                    }
                ]
            },
            {
                header: "Aesthetic",
                options: [
                    {
                        header: "Change Profile Statistics Location",
                        text: "Changes the position of user statistics on a user's profile to be more viewable.",

                        toggleable: true,
                        disabled: false,
                        setting: "profile.easyStatistics"
                    }
                ]
            }
        ]
    },
    {
        name: "Themes",
        content: [
            {
                header: "Home",
                options: [
                    {
                        header: "Grouped Home Page",
                        text: "Groups together continue playing, friends playing, and favorites and the rest get grouped into recommended.",

                        toggleable: true,
                        disabled: false,
                        setting: "theme.groupedHomePage"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Classic Home Page",
                        text: "Replaces the home page header with your profile picture and name.",

                        toggleable: true,
                        disabled: false,
                        experimental: true,
                        setting: "theme.profileHomePage"
                    }
                ]
            },
            {
                header: "Aesthetic",
                options: [
                    {
                        header: "Original Topbar Text",
                        text: `Replaces the top bar text with "games" and "catalog".`,

                        toggleable: true,
                        disabled: false,
                        setting: "theme.oldTopBarText"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Original Robux Icons",
                        text: "Replaces the new Robux icon with the older one.",

                        toggleable: true,
                        disabled: false,
                        setting: "theme.oldRobuxIcons"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Original Navigation Icons",
                        text: "Replaces the new navigation icons with the older ones.",

                        toggleable: true,
                        disabled: false,
                        setting: "theme.oldNavigationIcons"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Better Scrollbar",
                        text: `Changes the scrollbar to be more modern and work with the Roblox theme.`,

                        toggleable: true,
                        disabled: false,
                        setting: "theme.fancyScrollBar"
                    }
                ]
            },
            {
                options: [
                    {
                        header: "Small Chat Tab",
                        text: `Changes the chat tab to a smaller size.`,

                        toggleable: true,
                        disabled: false,
                        experimental: true,
                        setting: "theme.smallChatTab"
                    }
                ]
            }
        ]
    }
]

pages.settings = () => {
    var settingsCooldown = false;
    var selectedCategory = "";

    function getCategory(name) {
        for (let index in categories) {
            let category = categories[index];

            if (String(category.name).toLowerCase() == String(name).toLowerCase()) {
                return category;
            }
        }
        throw new Error(`Could not find category under the name ${name}`);
    }

    function getSetting(setting) {
        let settingCategories = setting.split(".");

        return [settings.get(settingCategories[0], settingCategories[1]), settingCategories];
    }

    function loadCategory(name) {
        if (!settingsCooldown && name != selectedCategory) {
            settingsCooldown = true;

            let category = getCategory(name);

            let previousCategoryElement = $(`.category-${String(selectedCategory).toLowerCase()}`);
            let categoryElement = $(`.category-${String(category.name).toLowerCase()}`);

            previousCategoryElement.removeClass("active");
            categoryElement.addClass("active");

            $(".dashblox-settings-content").empty();

            category.content.forEach((categroyContent) => {
                let section = $(`<div class="section"></div>`).appendTo(".dashblox-settings-content");

                if (categroyContent.header) {
                    let header = $(`<div class="container-header"><h3>${categroyContent.header}</h3></div>`).appendTo(section);

                    if (categroyContent.icon) {
                        header.children(`h3`).append(` <span class="${categroyContent.icon}"></span>`);
                    }
                }

                if (categroyContent.preText) {
                    section.append(`</div><div class="section-content"><pre class="text-description">${categroyContent.preText}</pre>`);
                }

                if (categroyContent.text) {
                    section.append(`</div><div class="section-content"><span class="text-description">${categroyContent.text}</span>`);
                }

                if (categroyContent.options) {
                    let sectionContent = $(`</div><div class="section-content"></div>`).appendTo(section);

                    categroyContent.options.forEach((option, index) => {
                        if (option.header && option.text) {
                            let header = $(`<span class="text-lead">${option.header}</span>`).appendTo(sectionContent);
                            sectionContent.append(`<div class="rbx-divider"></div>`);
                            sectionContent.append(`<span class="text-description">${option.text}</span>`);

                            if (option.experimental) {
                                header.append(` <span class="icon-warning"></span><span class="text-error">(Experimental)</span>`);
                            }
                        } else {
                            if (option.header) {
                                let header = $(`<span class="text-lead">${option.header}</span>`).appendTo(sectionContent);

                                if (option.experimental) {
                                    if (option.experimental) {
                                        header.append(` <span class="icon-warning"></span><span class="text-error">(Experimental)</span>`);
                                    }
                                }
                            }

                            if (option.text) {
                                sectionContent.append(`<span class="text-description">${option.text}</span>`);
                            }
                        }

                        if (option.sectionHtml && option.header && !option.text) {
                            sectionContent.append(`<div class="rbx-divider"></div>`);
                        }

                        if (option.sectionHtml) {
                            sectionContent.append(option.sectionHtml);
                        }

                        if (option.toggleable) {
                            let getSettingOptions = getSetting(option.setting);
                            let setting = getSettingOptions[0];

                            let toggle = $(`<button id="btn-toggle" class="btn-toggle ${option.disabled ? "disabled" : setting ? "on" : ""}"><span class="toggle-flip"></span><span id="toggle-on" class="toggle-on"></span><span id="toggle-off" class="toggle-off"></span></button>`).prependTo(sectionContent);

                            let toggleCoolDown = false;

                            toggle.click(() => {
                                let getSettingOptions = getSetting(option.setting);
                                let setting = getSettingOptions[0];
                                let categories = getSettingOptions[1];

                                if (!toggleCoolDown) {
                                    toggleCoolDown = true;

                                    if (!option.disabled) {
                                        if (setting) {
                                            settings.set(categories[0], categories[1], false);
                                            toggle.removeClass("on");
                                        } else {
                                            settings.set(categories[0], categories[1], true);
                                            toggle.addClass("on");
                                        }
                                    }

                                    toggleCoolDown = false;
                                }
                            })
                        }
                    })
                }

                if (categroyContent.sectionHtml) {
                    section.append(categroyContent.sectionHtml);
                }
            })

            selectedCategory = name;
            settingsCooldown = false;
        }
    }

    $.watch("head", () => {
        injectCSS("css/pages/settings.css");
    })

    $.watch(".content", (content) => {
        content.empty();

        $("title")[0].text = "Settings - DashBlox";
        jQuery("link[rel='icon']").attr("href", chrome.runtime.getURL("resources/icons/logo/256/glow.png"));

        content.append(`
        <div id="dashblox-settings">
            <h1>DashBlox Settings</h1>
            
            <div class="menu-vertical-container">
                <ul id="vertical-menu" class="menu-vertical submenus">
                </ul>
            </div>
        <div class="dashblox-settings-content">
        </div>
        </div>`);

        categories.forEach((category) => {
            $("#vertical-menu.menu-vertical.submenus").append(`
            <li class="menu-option category-${String(category.name).toLowerCase()}">
                <a class="menu-option-content">
                    <span class="menu-text">${category.name}</span>
                </a>
            </li>`);
            
            $(`.category-${String(category.name).toLowerCase()}`).click(()=> {
                loadCategory(category.name);
            });
        })

        loadCategory("Information");

        $.watch(".request-error-page-content", (selector) => {
            selector.remove(); // This is already patched in 2.2.0, I don't feel like doing anything with it for this build.
        });
    })
}