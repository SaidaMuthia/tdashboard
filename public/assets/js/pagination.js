function pagination(links) {
    // create element unorderlist
    const ulPagination = $("<ul>", { class: "pagination pagination-outline-primary justify-content-end" })
    // loop links
    $.each(links, function (i, ele) {
        const liPagination = $("<li>", { class: "page-item" })
        ,     aPagination = $("<a>", { class: "page-link" })
        // links item to anchor element
        // add href attr
        aPagination.attr("href", ele.url??'#')
        // add content to element anchor
        if (ele.label == "&laquo; Previous" ) {
            aPagination.html('<i class="bx bx-chevron-left bx-sm"></i>')
        } else if (ele.label == "Next &raquo;") {
            aPagination.html('<i class="bx bx-chevron-right bx-sm"></i>')
        } else {
            aPagination.text(ele.label)
        }
        // append anchor to li then ul tag
        liPagination.addClass(ele.active ? 'active' : '').append(aPagination)
        ulPagination.append(liPagination)
    })

    return ulPagination
}

export default pagination
