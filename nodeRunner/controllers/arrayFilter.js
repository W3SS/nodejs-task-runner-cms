//filter single val from array

function arrayFilter(i) {
    if (arguments.length > 1) {
        throw new Error('[arrayFilter] Invalid args.');
    }
    return function filter(value) {
        return !String(value).match(i);
    };
}

module.exports = arrayFilter;