"use strict"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const determinEndDate = (date) => {
    if (date > 3 && date < 21) {
        return "th";
    }

    switch (date % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

const util = {};

util.domains = ["www.roblox.com", "web.roblox.com"];

util.getAuthUser = async () => {
    return new Promise (async (resolve, reject) => {
        const authenticatedData = await dashblox.get(`https://users.roblox.com/v1/users/authenticated`);

        if (authenticatedData) {
            resolve({
                displayName: authenticatedData.displayName,
                username: authenticatedData.name,
                userId: authenticatedData.id
            })
        }
        
        reject([{
            message: "Failed to authenticate user."
        }])
    })
}

util.formatTime = (rawdate) => {
    const date = new Date(rawdate);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let zone = (hours >= 12 ? "PM" : "AM");

    hours = (hours % 12);
    hours = (hours ? hours : 12);
    minutes = (minutes < 10 ? "0" + minutes : minutes);

    // if (settings.get("general.simpleTimeFormat")) {
    //     return `${months[date.getMonth()]} ${date.getDate()}${determinEndDate(date.getDate())}, ${date.getFullYear()} @ ${hours}:${minutes} ${zone}`;
    // }

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} @ ${hours}:${minutes} ${zone}`;
}