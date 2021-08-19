"use strict"

function getBadgeRarity(rarity) {
    switch (true) {
        case rarity <= 1:
            return "Impossible";
        case rarity > 1 && rarity <= 5:
            return "Insane";
        case rarity > 5 && rarity <= 10:
            return "Extreme";
        case rarity > 10 && rarity <= 20:
            return "Hard";
        case rarity > 20 && rarity <= 30:
            return "Challenging";
        case rarity > 30 && rarity <= 50:
            return "Moderate";
        case rarity > 50 && rarity <= 80:
            return "Easy";
        case rarity > 80 && rarity <= 90:
            return "Cake Walk";
        case rarity > 90 && rarity <= 100:
            return "Freebie";
        default:
            return "Unknown";
    }
}

pages.assets = async (assetId, settings) => {
    let assetPage = currentPageInfo.path;

    if (settings.assets.assetStats) {
        switch (assetPage) {
            case "badges": {
                let badge = await dashblox.get(`https://badges.roblox.com/v1/badges/${assetId}`);
    
                if (badge) {
                    let winRate = (badge.statistics.winRatePercentage * 100).toFixed(1);
        
                    $.watch(".clearfix.toggle-target.item-field-container", (description) => {
                        $(".clearfix.item-field-container:contains('Updated')").remove();
        
                        description.before(`<div class="clearfix item-field-container item-created"><div class="text-label field-label">Created</div><span class="field-content ">${util.timeFormat(badge.created)}</span></div>`);
                        description.before(`<div class="clearfix item-field-container item-updated"><div class="text-label field-label">Updated</div><span class="field-content ">${util.timeFormat(badge.updated)}</span></div>`);
                        description.before(`<div class="clearfix item-field-container item-rarity"><div class="text-label field-label">Rarity</div><span class="field-content ">${getBadgeRarity(Number(winRate))} (${winRate}%)</span></div>`);
                        description.before(`<div class="clearfix item-field-container item-recent"><div class="text-label field-label">Won Recent</div><span class="field-content ">${badge.statistics.pastDayAwardedCount.toLocaleString()}</span></div>`);
                        description.before(`<div class="clearfix item-field-container item-every"><div class="text-label field-label">Won Ever</div><span class="field-content ">${badge.statistics.awardedCount.toLocaleString()}</span></div>`);
                        description.before(`<div class="clearfix item-field-container item-avalibility"><div class="text-label field-label">Availability</div><span class="field-content ">${badge.enabled ? "Obtainable" : "Unobtainable"}</span></div>`);
                    })
                }
        
                if (developerMode) {
                    console.log(badge);
                }

                break;
            }

            case "bundles": { // This part might be a little bit wrong, but I haven't found an api that gives you updated/created information.
                let assetDetails = await dashblox.get(`https://catalog.roblox.com/v1/bundles/${assetId}/details`);
            
                if (assetDetails) {
                    try {
                        let asset = null;
        
                        for (let index in assetDetails.items) {
                            let item = assetDetails.items[index];
        
                            if (item.type === "Asset") {
                                asset = await dashblox.get(`https://api.roblox.com/marketplace/productinfo`, {assetId: item.id});
                                break;
                            }
                        }
        
                        if (asset) {
                            $.watch(".clearfix.toggle-target.item-field-container", (description) => {
                                description.before(`<div class="clearfix item-field-container item-created"><div class="text-label field-label">Created</div><span class="field-content ">${util.timeFormat(asset.Created)}</span></div>`);
                                description.before(`<div class="clearfix item-field-container item-updated"><div class="text-label field-label">Updated</div><span class="field-content ">${util.timeFormat(asset.Updated)}</span></div>`);
                            })
                        }
        
                        if (developerMode) {
                            console.log(asset);
                        }
                    } catch (msg) {
                        if (developerMode) {
                            console.log(msg);
                        }
                    }
                }

                break;
            }

            default: {
                let asset = assetPage == "game-pass" ? await dashblox.get(`https://api.roblox.com/marketplace/game-pass-product-info`, {gamepassId: assetId}) : await dashblox.get(`https://api.roblox.com/marketplace/productinfo`, {assetId: assetId});
        
                if (asset) {
                    let authUser = await util.getAuthUser();
                    let creatorId = asset.Creator.Id;
        
                    if (asset.Creator.CreatorType === "Group") {
                        try {
                            let groupMembership = await dashblox.get(`https://groups.roblox.com/v1/groups/${asset.Creator.CreatorTargetId}/membership`);
        
                            if (groupMembership) {
                                if (groupMembership.permissions.groupEconomyPermissions.manageGroupGames) {
                                    creatorId = authUser.userId;
                                }
                            }
                        } catch (message) {
                            if (developerMode) {
                                console.log(message);
                            }
                        }
                    }
        
                    $.watch(".clearfix.toggle-target.item-field-container", (description) => {
                        if (creatorId > 1) {
                            $(".clearfix.item-field-container:contains('Updated')").remove();
                        }
        
                        description.before(`<div class="clearfix item-field-container item-created"><div class="text-label field-label">Created</div><span class="field-content ">${util.timeFormat(asset.Created)}</span></div>`);
                        description.before(`<div class="clearfix item-field-container item-updated"><div class="text-label field-label">Updated</div><span class="field-content ">${util.timeFormat(asset.Updated)}</span></div>`);
        
                        if (creatorId === authUser.userId) {
                            description.before(`<div class="clearfix item-field-container item-sales"><div class="text-label field-label">Sales</div><span class="field-content ">${asset.Sales.toLocaleString()}</span></div>`);
                        }
                    })
                }
        
                if (developerMode) {
                    console.log(asset);
                }

                break;
            }
        }
    }

    // $.watch("#item-container", () => {
    //     let deleteItemButton = $("#delete-item");

    //     if (deleteItemButton.length >= 1) {
    //         deleteItemButton.removeAttr("id");
    //         deleteItemButton.attr("id", "delete-item-warning");

    //         let warningDisplayed = false;

    //         $("#item-context-menu").click(() => {
    //             $("#delete-item-warning").click(() => {
    //                 if (!warningDisplayed) {
    //                     try {
    //                         warningDisplayed = true;

    //                         $("#rbx-body").append(`<div id="delete-item-warning-displayed" role="dialog"><div class="modal-backdrop in"></div><div role="dialog" tabindex="-1" class="in modal" style="display: block;"><div class="modal-window modal-dialog"><div class="modal-content" role="document"><div class="modal-header"><h4 class="modal-title">Delete ${$(".border-bottom.item-name-container > h2")[0].innerText || "Item"}?</h4></div><div class="modal-body"><p class="description">Are you sure that you want to delete this item from your inventory?
        
    //                         You will NOT recieve a refund if you do this.</p></div><div class="modal-footer"><div class="loading"></div><div class="modal-buttons"><button type="button" class="modal-button btn-primary-md btn-min-width" id="delete-item">Confirm</button><button type="button" class="modal-button btn-control-md btn-min-width" id="cancel-delete-item">Cancel</button></div></div></div></div></div></div>`);

    //                         $("#delete-item").click(() => {
    //                             dashblox.ajax({
    //                                 url: "https://www.roblox.com/asset/delete-from-inventory",
                                
    //                                 type: "POST",
    //                                 dataType: "application/json",
                                
    //                                 crossDomain: true,
                                
    //                                 data: {assetId: Number(assetId)},

    //                                 success: (response) => {
    //                                     warningDisplayed = false;

    //                                     $("#delete-item-warning-displayed").remove();
    
    //                                     window.location.reload();
    //                                 },

    //                                 error: (error) => {
    //                                     warningDisplayed = false;

    //                                     $("#delete-item-warning-displayed").remove();

    //                                     if (developerMode) {
    //                                         console.log(error);
    //                                     }
    //                                 }
    //                             })
    //                         })

    //                         $("#cancel-delete-item").click(() => {
    //                             warningDisplayed = false;
    //                             $("#delete-item-warning-displayed").remove();
    //                         })
    //                     } catch (error) {
    //                         if (developerMode) {
    //                             console.log(error);
    //                         }
    //                     }
    //                 }
    //             })
    //         })
    //     }
    // })
}