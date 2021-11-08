"use strict"

pages.viewdeleted = () => {
    let args = currentPageInfo.args;
    let userId = Number(args.userid);

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

            let friendsList = await dashblox.get(`https://friends.roblox.com/v1/users/${userId}/friends?userSort=Alphabetical`);

            let userThumbnails = await dashblox.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=true&size=150x150&userIds=${userId}`);

            let friendsIds = [];

            if (friendsList.data) {
                friendsList.data.forEach((friendData, index) => {
                    if (index < 9) {
                        friendsIds.push(friendData.id);
                    }
                })
            }

            let friendThumbnails = await dashblox.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=false&size=150x150&userIds=${friendsIds.join(",")}`);

            let friendThumbnailIds = {};

            if (friendThumbnails.data) {
                friendThumbnails.data.forEach((thumbnailData) => {
                    friendThumbnailIds[thumbnailData.targetId] = thumbnailData.imageUrl;
                })
            }

            if (userThumbnails.data && friends.count && followers.count && followings.count) {
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
                                                <a class="text-name" href=""> <span class="font-header-2 ng-binding">${friends.count}</span> </a>
                                            </li>
                                            <li>
                                                <div class="text-label font-caption-header ng-binding">Followers</div>
                                                <a class="text-name" href=""> <span class="font-header-2 ng-binding">${followers.count}</span> </a>
                                            </li>
                                            <li>
                                                <div class="text-label font-caption-header ng-binding">Following</div>
                                                <a class="text-name" href=""> <span class="font-header-2 ng-binding">${followings.count}</span> </a>
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

                if (friendThumbnails.data && friendsList.data) {
                    $(".profile-about").after(`
                        <div class="section-content remove-panel people-list">

                        <h3 class="ng-binding">Friends <span class="friends-count ng-binding">(${friends.count})</span> </h3>

                        <ul class="hlist deleted-friends-list">
                    
                        </ul> <span class="spinner spinner-default ng-hide"></span> 
                    </div>
                    `)

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
                }
            } else {
                content.append(`<h1 style="text-align: center;">Failed to fetch user data.</h1>`);
            }
        })
    } else {
        $.watch(".content", (content) => {
            content.empty();
            content.append(`<h1 style="text-align: center;">Please provide a valid UserId.</h1>`);
        })
    }
}