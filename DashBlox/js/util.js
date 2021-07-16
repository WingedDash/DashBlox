"use strict"

const util = {};

util.getAuthUser = () => {
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
}

util.timeFormat = function(date) {
    date = new Date(date);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let zone = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes: minutes;
    
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} @ ${hours}:${minutes} ${zone}`;
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
        }, timeout || 1);
    }
};

injectPages();
injectPage("universal");