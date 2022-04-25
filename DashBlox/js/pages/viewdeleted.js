"use strict"

pages.viewdeleted = () => { // This entire page is experimental, I plan on polishing this code a lot more.
    let args = currentPageInfo.args;
    let userId = Number(args.userid);

    $("title")[0].text = "View Deleted - DashBlox";
    jQuery("link[rel='icon']").attr("href", chrome.runtime.getURL("resources/icons/logo/256/glow.png"));

    if (args.userid) {
        $.watch(".content", async (content) => {
            content.empty();

            let userInformation = await dashblox.get(`https://users.roblox.com/v1/users/${userId}`);

            if (!userInformation.isBanned) {
                content.append(`<h1 style="text-align: center;">Deleted profile could not be found.</h1>`);
                return;
            }

            let friends = await dashblox.get(`https://friends.roblox.com/v1/users/${userId}/friends/count`);
            let followers = await dashblox.get(`https://friends.roblox.com/v1/users/${userId}/followers/count`);
            let followings = await dashblox.get(`https://friends.roblox.com/v1/users/${userId}/followings/count`);

            let userThumbnails = await dashblox.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot`, {format: "Png", isCircular: true, size: "150x150", userIds: userId});

            if (userThumbnails.data && typeof friends.count === "number" && typeof followers.count === "number" && typeof followings.count === "number") {
                let userThumbnail = userThumbnails.data[0].imageUrl;

                content.append(`
                <div class="profile-container">
                    <div>
                        <div class="section profile-header">
                            <div class="section-content profile-header-content ng-scope">
                                <div class="profile-header-top">
                                    
                                    <span class="avatar-card-link avatar-image-link"> 
                                        <thumbnail-2d class="avatar-card-image profile-avatar-thumb ng-scope ng-isolate-scope">
                                            <span thumbnail-type="AvatarHeadshot" class="thumbnail-2d-container"> 
                                                <img class="ng-scope ng-isolate-scope" src="${userThumbnail}">  
                                            </span> 
                                        </thumbnail-2d>
                                    </span>

                                    <div class="header-caption">
                                    <div class="header-names">
                                        <div class="header-title">
                                            <h2 class="profile-name text-overflow">${userInformation.name}</h2>
                                            <h3 class="profile-name text-overflow">${userInformation.name}</h3></div>
                                        <div class="profile-display-name font-caption-body text text-overflow">@${userInformation.displayName}</div>
                                    </div>
                                    <div class="header-details">
                                        <ul class="details-info">
                                            <li>
                                                <div class="text-label font-caption-header ng-binding">Friends</div>
                                                <a class="text-name" href="https://${currentUrlPaths[2]}/users/${userId}/friends#!/friends"> <span class="font-header-2 ng-binding">${friends.count.toLocaleString()}</span> </a>
                                            </li>
                                            <li>
                                                <div class="text-label font-caption-header ng-binding">Followers</div>
                                                <a class="text-name" href="https://${currentUrlPaths[2]}/users/${userId}/friends#!/followers"> <span class="font-header-2 ng-binding">${followers.count.toLocaleString()}</span> </a>
                                            </li>
                                            <li>
                                                <div class="text-label font-caption-header ng-binding">Following</div>
                                                <a class="text-name" href="https://${currentUrlPaths[2]}/users/${userId}/friends#!/following"> <span class="font-header-2 ng-binding">${followings.count.toLocaleString()}</span> </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
    
                                </div>
                            </div>
                        </div>

                        <div class="section profile-about ng-scope">
                            <div class="container-header"><h3>About</h3></div>
                            
                            <div class="section-content remove-panel">
                                <div class="profile-about-content toggle-target">
                                    <pre id="profile-about-text" class="text profile-about-text">                    
                                        <span class="profile-about-content-text linkify">${userInformation.description}</span>
                                    </pre>
                                </div>
                            </div>

                            <div class="rbx-divider"></div>
                        </div>
                    </div>
                </div>`)

                $(".profile-about").after(`
                    <div class="section-content remove-panel people-list">

                    <h3 class="ng-binding">Friends <span class="friends-count ng-binding">(${friends.count})</span> </h3>

                    <ul class="hlist deleted-friends-list">
                    
                    </ul> <span class="spinner spinner-default"></span> 
                </div>
                `)

                let friendsList = await dashblox.get(`https://friends.roblox.com/v1/users/${userId}/friends?userSort=Alphabetical`);

                let friendsIds = [];
    
                if (friendsList.data) {
                    friendsList.data.forEach((friendData, index) => {
                        if (index < 9) {
                            friendsIds.push(friendData.id);
                        }
                    })
                }

                let friendThumbnails = await dashblox.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot`, {format: "Png", isCircular: false, size: "150x150", userIds: friendsIds.join(",")});

                let friendThumbnailIds = {};
    
                if (friendThumbnails.data) {
                    friendThumbnails.data.forEach((thumbnailData) => {
                        friendThumbnailIds[thumbnailData.targetId] = thumbnailData.imageUrl;
                    })
                }

                if (friendsList.data && friendThumbnails.data) {
                    $(".spinner.spinner-default").addClass("ng-hide");

                    friendsList.data.forEach((friendData, index) => {
                        if (index < 9) {
                           $(".deleted-friends-list").append(`
                           <li id="people-${friendData.id}" rbx-user-id="${friendData.id}" class="list-item friend ng-scope">
                               <div class="ng-scope">
                                   <div class="avatar-container">
                                       <a href="${friendData.isBanned ? "/dashblox/viewdeleted?userid=" + friendData.id : "/users/" + friendData.id + "/profile"}" class="text-link friend-link ng-isolate-scope">
                                           <div class="avatar avatar-card-fullbody"> <span class="avatar-card-link friend-avatar icon-placeholder-avatar-headshot"> <thumbnail-2d class="avatar-card-image ng-isolate-scope"><span class="thumbnail-2d-container"> <img src="${friendThumbnailIds[friendData.id]}"> </span> </thumbnail-2d>
                                               </span>
                                           </div> <span class="text-overflow friend-name font-caption-header ng-binding" title="${friendData.name}">${friendData.name}</span>
                                        </a>
                                       <span class="avatar-status friend-status "></span>
                                   </div>
                               </div>
                               </li>
                           `)
                       }
                   })
                } else {
                    $(".deleted-friends-list").append(`<p style="text-align: center;">Failed to load friends list.</p>`);
                }
            } else {
                content.append(`<h1 style="text-align: center;">Failed to load basic profile information.</h1>`);
            }
        })
    } else {
        $.watch(".content", (content) => {
            content.empty();

            let boxText = "";

            content.append(`<h1 style="text-align: center;">Please enter a Username or a UserId below.</h1>`);
            content.append(`<div class="form-horizontal ng-scope" style="margin-left: 31.6%;"> <div style="float: left;"> <input class="form-control input-field" placeholder="Enter a Username or a UserId" style="height: 38px;width: 420px;"> <!-- ngIf: !layout.shoutError --><!-- end ngIf: !layout.shoutError --> <!-- ngIf: layout.shoutError --> </div> <a class="btn-secondary-md ng-binding">Enter</a> </div>`);
            content.children(`.form-horizontal.ng-scope`).children(`div`).children(`input`).keyup(() => {
                boxText = content.children(`.form-horizontal.ng-scope`).children(`div`).children(`input`)[0].value;
            });

            let loadProfile = async () => {
                let isValid = (boxText != "");
                let isUserId = (isValid && !isNaN(Number(boxText)));

                if (isUserId) {
                    location.href = `https://${currentUrlPaths[2]}/dashblox/viewdeleted?userid=${Number(boxText)}`;
                    return;
                }

                if (isValid) {
                    let data = await dashblox.get(`https://api.roblox.com/users/get-by-username`, {username: boxText});
                    location.href = `https://${currentUrlPaths[2]}/dashblox/viewdeleted?userid=${data.Id}`;
                }
            }

            $(`.form-horizontal.ng-scope .btn-secondary-md.ng-binding`).click(async () => {
                loadProfile();
            })

            document.addEventListener("keyup", (pressed) => {
                if (pressed.key === 'Enter') {
                    if ($(`.form-horizontal.ng-scope div .form-control.input-field`).is(":focus")) {
                        loadProfile();
                    }
                }
            });
        })
    }
}