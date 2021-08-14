"use strict"

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let determinEndDate = (date) => {
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

const util = {
    getAuthUser: () => {
        return new Promise (async (resolve, reject) => {
            let auth = await dashblox.get(`https://users.roblox.com/v1/users/authenticated`);
    
            if (auth) {
                resolve({
                    username: auth.name,
                    displayName: auth.displayName,
                    userId: auth.id
                })
            } else {
                resolve({
                    username: "",
                    displayName: "",
                    userId: 0
                })
            }
            
            reject({
                message: "Failed to get authenticated user."
            })
        })
    },

    timeFormat: (date) => {
        date = new Date(date);

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let zone = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes: minutes;

        if (settings.general.simpleTimeFormat) {
            return `${months[date.getMonth()]} ${date.getDate()}${determinEndDate(date.getDate())}, ${date.getFullYear()} @ ${hours}:${minutes} ${zone}`;
        } else {
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} @ ${hours}:${minutes} ${zone}`;
        }
    }
}

$.watch = function(selector, timeout, callback) {
    if (timeout && !callback) {
        callback = timeout;
        timeout = null;
    }

    if (jQuery(selector).length) {
        callback();
    } else {
        setTimeout(function() {
            $.watch(selector, timeout, callback);
        }, timeout || 0);
    }
}

injectPages();
injectPage("universal");

$.watch("head", () => {
    injectCSS("css/universal.css");
    injectCSSPages();
})