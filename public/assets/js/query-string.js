export default function () {
    var queryParameters = $('input[type=hidden][name$=-value]').toArray().reduce(function(queryString, curr) {
            var key = curr.name.slice(0, curr.name.length - 6)
            ,   value = curr.defaultValue
            // assign property to queryString object
            queryString[key] = value
            // return query string
            return queryString
    }, {})
    // remove object property
    // delete queryParameters['siteid']
    // return final queryParameters
    return queryParameters
}



