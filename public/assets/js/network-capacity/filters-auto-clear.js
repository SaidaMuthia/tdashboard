console.log('filters loaded')
//
import queryString from '../query-string.js'
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
// search on filter
$("[name=conndate], [name=branch], [name=cluster], [name=city]").keyup(function() {
    // get input element value each key press
    let getInputValue = $(this).val().toLowerCase()
    // filter array
    $(this).next().find('a.dropdown-item').filter(function(i, ele) {
        // toggle each element by condition
        $(ele).toggle($(ele).text().toLowerCase().indexOf(getInputValue) > -1 )
    })
})
// filter item data
$("[name=conndate], [name=region], [name=branch], [name=city]").on('focus', function(obj) {
    // get element name attribute value
    let getNameAttrValue = $(this).attr('name')
    // get element with id
    let listGroup = $(`#list-item-${getNameAttrValue}-1`)
    let listGroupWOActiveClass = $(`#list-item-${getNameAttrValue}-1 a:not(.active)`)
    // find element with active class
    let multiSelectCount = listGroup.find('.active').length
    // check multi select
    if (multiSelectCount > 0 ){
        // delete all element without active class
        listGroupWOActiveClass.remove()
    } else {
        // single query string 'siteid'
        let queryStringFilters = getNameAttrValue != 'siteid' ? queryString() : {}
        // request
        const fetchFilter = async function () {
            const { data: response } = await clientFilter.get('filters', { ...configFilter, params: { field: getNameAttrValue, ...queryStringFilters } })
            console.log('data11', response)
            // clean inner html
            listGroup.html("")
            // loop over with JQuery each method
            $.each(response, function(i, element){
                // create element node
                let listGroupItem = $("<a></a>")
                let listGroupDivItem = $("<div></div>")
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
        }
        // invoke
        fetchFilter()
    }
})
//filter item selected
$("div.list-group").on('click', 'a.dropdown-item', function() {
    // remove all 'active' class
    $(this).closest('div.list-group').find('a.dropdown-item').removeClass('active')
    // add active class on this element
    $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active')
    // convert nodelist to regular array with spread ...
    let nodeArray = [...$(this).parents('div.list-group').find('.active')]
    // transform to array of text element
    let textContentArray = nodeArray.map(node => node.textContent).sort()
    // multi select count
    let multiSelectCount =$(this).parents('div.list-group').find('.active').length
    // get value of attr data-field
    let field = $(this).data('field')
    // create element button
    if (multiSelectCount >= 1) {
        // create button clear
        if ($(this).parents('div.list-group').nextAll('button').length == 0) {
            let buttonClear = $("<button></button>")
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
    let childrenInputCount = $(this).parents('div.list-group').nextAll(`[name=${field}-value][type=hidden]`).length
    // create element input
    if (childrenInputCount == 0){
        // create element
        let inputHidden = $("<input />")
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
    // reset all value of input element after this current button triggered
    $(this).parents('div.form-group').nextAll().children().next().find("div.list-group").find('.active').removeClass('active')
    $(this).parents('div.form-group').nextAll().children().next().find("input[type=hidden]").val('')
    $(this).parents('div.form-group').nextAll().children().next().find("button[type='button']").remove()
    $(this).parents('div.form-group').nextAll().children().val('')
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
