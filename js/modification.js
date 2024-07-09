"use strict"

const $ = (selector, callback) => {
    return new Promise((resolve) => {
        const contains = selector.match(/:Contains\(\'(.*?)\'\)/);

        selector = selector.split(":")[0];

        $.observe(selector, true).then((elements) => {
            if (contains) {
                elements = Array.prototype.slice.call(elements).filter((element) => {
                    return (element.textContent.toLowerCase().indexOf(contains[1].toLowerCase()) !== -1);
                })
            }

            if (callback) callback(elements);
            resolve(elements);
        })
    })
}

$.observe = (selector, hasAll, callback) => {
    if (typeof hasAll === "function") {
        callback = hasAll;
        hasAll = null;
    }

    const rawElement = (hasAll ? document.querySelectorAll(selector) : document.querySelector(selector));
    
    if (hasAll ? rawElement.length > 0 : rawElement) {
        if (callback) callback(rawElement);
        return Promise.resolve(rawElement);
    }

    return new Promise((resolve) => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const element = (hasAll ? mutation.target.querySelectorAll(selector) : mutation.target.querySelector(selector));
                    
                    if (hasAll ? element.length > 0 : element) {
                        observer.disconnect();

                        if (callback) callback(element);
                        resolve(element);
                    }
                }
            }
        })
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        })
    })
}