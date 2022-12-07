module.exports.groupBy = function groupBy(arr, field) {
    return arr.reduce((r, a) => {
        r[a[field]] = [...(r[a[field]] || []), a]
        return r
    }, {})
}


module.exports.isObjEmpty = function (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}
