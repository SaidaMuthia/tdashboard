// import module
import queryString from './query-string.js'
// create axios instances
const clientFilter = axios.create({
    baseURL: ictpamasukaPath
})
// headers configuration options
const configFilter = {
    headers: {
        'Accept': 'application/json'
    },
}
// prevent dropdown destroy after click
$(".form-group, .btn-contains-dropdown").on('click', '.dropdown-menu', function(obj) {
    // prevent to run default action
    obj.stopPropagation()
})
// last_day fetch
const fetchFilter = async function () {
    //
    const { data: { data: response }} = await clientFilter.get("/filters", { ...config, params: { field: "last_day" } })
    // list group element
    var listGroup = $("#list-item-last-day-1")
    // clear child element
    listGroup.html("")
    // loop over
    $.each(response, function(i, element){
        // create element node
        var listGroupItem = $("<a></a>")
        var listGroupDivItem = $("<div></div>")
        // add attribute to element
        listGroupItem.attr({
            "data-field": 'last-day',
            class: "dropdown-item"
        })
        listGroupItem.text(element)
        // append
        listGroupDivItem.append(listGroupItem)
        listGroup.append(listGroupDivItem)
    })
    console.log('responseLastDay', response)
}
// invoke
fetchFilter()

// search on filter
$("[name=branch], [name=cluster], [name=city], [name=siteid]").keyup(function() {
    // get input element value each key press
    var getInputValue = $(this).val().toLowerCase()
    // filter array
    $(this).next().find('a.dropdown-item').filter(function(i, ele) {
        // toggle each element by condition
        $(ele).toggle($(ele).text().toLowerCase().indexOf(getInputValue) > -1 )
    })
})
// filter item data
$("[name=conndate], [name=region], [name=branch], [name=cluster], [name=city], [name=category-revenue], [name=siteid]").on('focus', function(obj) {
    // get element name attribute value
    console.log($(this).attr('name'), obj.target.value.length)
    var getNameAttrValue = $(this).attr('name')
    // get element with id
    var listGroup = $(`#list-item-${getNameAttrValue}-1`)
    var listGroupWOActiveClass = $(`#list-item-${getNameAttrValue}-1 a:not(.active)`)
    // find element with active class
    var multiSelectCount = listGroup.find('.active').length
    // check multi select
    if (multiSelectCount > 0 ){
        // delete all element without active class
        listGroupWOActiveClass.remove()
    } else {
        // single query string 'siteid'
        var queryStringFilters = getNameAttrValue != 'siteid' ? queryString() : {}
        // request
        const fetchFilter = async function () {
            //
            const { data: response } = await clientFilter.get("/filters", { ...configFilter, params: { field: getNameAttrValue, ...queryStringFilters }})
            //
            console.log($(this).attr('name'), obj.target.value.length)
            console.log('listgroup', response)
            listGroup.html("")
            // loop over with JQuery each method
            $.each(response, function(i, element){
                // create element node
                var listGroupItem = $("<a></a>")
                var listGroupDivItem = $("<div></div>")
                // add attribute to element
                listGroupItem.attr({
                    "data-field": getNameAttrValue,
                    class: "dropdown-item"
                })
                listGroupItem.text(element)
                // append
                listGroupDivItem.append(listGroupItem)
                listGroup.append(listGroupDivItem)
            })
            console.log('response', response)
        }
        // invoke
        fetchFilter()
    }
})
//filter item selected
$("div.list-group").on('click', 'a.dropdown-item', function(obj) {
    console.log('filter item selected')
    // add active class on this element
    $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active')
    // convert nodelist to regular array with spread ...
    var nodeArray = [...$(this).parents('div.list-group').find('.active')]
    // transform to array of text element
    var textContentArray = nodeArray.map(node => node.textContent).sort()
    // multi select count
    var multiSelectCount =$(this).parents('div.list-group').find('.active').length
    // get value of attr data-field
    var field = $(this).data('field')
    // create element button
    if (multiSelectCount >= 1) {
        // create button clear
        if ($(this).parents('div.list-group').nextAll('button').length == 0) {
            var buttonClear = $("<button></button>")
            buttonClear.attr({
                class: "btn btn-sm btn-danger m-2",
                type: "button",
                style: "width:-webkit-fill-available"
            })
            buttonClear.text("Clear")
            // add element after
            $(this).parents('div.list-group').after(buttonClear)
        }
    } else {
        // remove element button in no data selected
        $(this).parents('div.list-group').nextAll('button').remove()
    }
    // get input count
    var childrenInputCount = $(this).parents('div.list-group').nextAll(`[name=${field}-value][type=hidden]`).length
    // create element input
    if (childrenInputCount == 0){
        // create element
        var inputHidden = $("<input />")
        inputHidden.attr({
            type: "hidden",
            name: `${field}-value`,
            value: textContentArray
        })
        // <input type="hidden" name="previous-month-value" value="202402,202401">
        // append to parent
        $(this).parents('div.list-group').after(inputHidden)
    } else {
        //
        $(this).parents('div.list-group').nextAll(`[name=${field}-value][type=hidden]`).val(textContentArray)
    }
    // set value to specified field
    $(`[name=${field}]`).val(textContentArray.length == 1 ? textContentArray[0] : multiSelectCount >= 2 ? 'Multi-Selected' : '')

})
// filter item clear
$("div.dropdown-menu").on("click", "button.btn-danger", function (obj) {
    // remove class .active
    $(this).siblings("div.list-group").find('.active').removeClass('active')
    // set new value after clear element
    $(this).siblings("input[type=hidden]").val('')
    // set focus
    $(this).parent().prev().val('').focus()
    // destroy button clear
    $(this).remove()

})

/* perfect scrollbar */
document.getElementById('list-item-conndate-1') != null ? new PerfectScrollbar(document.getElementById('list-item-conndate-1'), { wheelPropagation: false }) : null
document.getElementById('list-item-branch-1') != null ? new PerfectScrollbar(document.getElementById('list-item-branch-1'), { wheelPropagation: false }) : null
document.getElementById('list-item-cluster-1') != null ? new PerfectScrollbar(document.getElementById('list-item-cluster-1'), { wheelPropagation: false }) : null
document.getElementById('list-item-city-1') != null ? new PerfectScrollbar(document.getElementById('list-item-city-1'), { wheelPropagation: false }) : null
document.getElementById('list-item-category-revenue-1') != null ? new PerfectScrollbar(document.getElementById('list-item-category-revenue-1'), { wheelPropagation: false }) : null
document.getElementById('list-item-category-siteid-1') != null ? new PerfectScrollbar(document.getElementById('list-item-siteid-1'), { wheelPropagation: false }) : null
document.getElementById('list-item-category-last-day-1') != null ? new PerfectScrollbar(document.getElementById('list-item-last-day-1'), { wheelPropagation: false }) : null
