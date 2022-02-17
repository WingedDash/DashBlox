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

pages.assets = async (assetId) => {
    let assetPage = currentPageInfo.path;

    if (settings.get("assets", "assetStats")) {
        switch (assetPage) {
            case "badges": {
                let badge = await dashblox.get(`https://badges.roblox.com/v1/badges/${assetId}`);

                if (!badge) {
                    return;
                }
    
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
        
                if (developerMode) {
                    console.log(badge);
                }

                break;
            }

            case "bundles": {
                let assetDetails = await dashblox.get(`https://catalog.roblox.com/v1/bundles/${assetId}/details`);

                if (!assetDetails) {
                    return;
                }
            
                let asset = null;
    
                for (let index in assetDetails.items) {
                    let item = assetDetails.items[index];

                    if (item.type === "Asset") {
                        asset = await dashblox.get(`https://api.roblox.com/marketplace/productinfo`, {assetId: item.id});
                        break;
                    }
                }

                if (!asset) {
                    return;
                }

                $.watch(".clearfix.toggle-target.item-field-container", (description) => {
                    description.before(`<div class="clearfix item-field-container item-created"><div class="text-label field-label">Created</div><span class="field-content ">${util.timeFormat(asset.Created)}</span></div>`);
                    description.before(`<div class="clearfix item-field-container item-updated"><div class="text-label field-label">Updated</div><span class="field-content ">${util.timeFormat(asset.Updated)}</span></div>`);
                })

                if (developerMode) {
                    console.log(asset);
                }

                break;
            }

            default: {
                let asset = assetPage == "game-pass" ? await dashblox.get(`https://api.roblox.com/marketplace/game-pass-product-info`, {gamepassId: assetId}) : await dashblox.get(`https://api.roblox.com/marketplace/productinfo`, {assetId: assetId});
        
                if (!asset) {
                    return;
                }

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
                            console.warn(message);
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
        
                if (developerMode) {
                    console.log(asset);
                }

                break;
            }
        }
    }

    $.watch("#item-container", () => {
        let deleteItemButton = $("#delete-item");

        if (deleteItemButton.length >= 1) {
            $.watch("#modal-confirmation > #modal-dialog > .modal-content > .modal-body > .modal-top-body > .modal-message", (warning) => {
                warning.after(`<br> <div class="modal-warning">You will NOT recieve a refund when deleting this item from your inventory. ⚠️</div>`);
            })
        }
    })
}