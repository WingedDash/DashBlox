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

class DashBloxUtil {
    constructor () {
        this.domains = ["www.roblox.com", "web.roblox.com"];
    }

    getAuthUser () {
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
                    username: null,
                    displayName: null,
                    userId: null
                })
            }
            
            reject({
                message: "Failed to get authenticated user."
            })
        })
    }

    timeFormat (date) {
        date = new Date(date);

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let zone = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes: minutes;

        if (settings.get("general.simpleTimeFormat")) {
            return `${months[date.getMonth()]} ${date.getDate()}${determinEndDate(date.getDate())}, ${date.getFullYear()} @ ${hours}:${minutes} ${zone}`;
        } else {
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} @ ${hours}:${minutes} ${zone}`;
        }
    }
}

// Object.assign($, { // Once jquery is removed and I make a new one, write this into it. 
//     watch(selector, callback) {
//         if (typeof callback !== "function") {
//             throw Error("Watch requires a function.");
//         }
    
//         if ($(selector).length >= 1) {
//             callback($(selector));
//         } else {
//             setTimeout(() => {
//                 $.watch(selector, callback);
//             })
//         }
//     }
// })

const util = new DashBloxUtil();