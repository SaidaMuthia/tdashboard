
import queryString from "./query-string.js"
import dataTables from "./data-tables.js"
import pagination from "./pagination.js"
// create axios instances
const client = axios.create({
    baseURL: ictpamasukaPath
})
// headers configuration options
const config = {
    headers: {
        'Accept': 'application/json'
    },
}
const newSiteMonitoringTableBody = $("#new-site-monitoring-rows-1")
// add click event to dynamic anchor element
$('nav[aria-label="Page navigation"]').on('click', 'a.page-link', function (event) {
    // prevent element from default behavior action
    event.preventDefault()
    // get source
    const queryStringFilters = 'siteid' in queryString() && queryString()['siteid'].length > 0 ? { "siteid" : queryString()['siteid'] } : queryString()
    const clientGet = async () => {
        //
        history.pushState(null, null, event.currentTarget.pathname + event.currentTarget.search )
        //
        const config = {
            headers: {
                'Accept': 'application/json'
            },
            params: { ...queryStringFilters, page: event.currentTarget.search.split('=')[1] }
        }
        // get response
        const response = await client.get('/new-site-monitoring', config)
        // re-assign generate link by paginator
        $.each($('a.page-link'), function (i, ele) {
            // re-assign href attribute value
            ele.href = response.data.links[i].url??'#'
            // toggle class active in page-item element
            response.data.links[i].active ? $(ele).parent().addClass('active') : $(ele).parent().removeClass('active')
            // re-assign text content
            if (response.data.links[i].label == "&laquo; Previous") {
                $(ele).html('<i class="bx bx-chevron-left bx-sm"></i>')
            } else if (response.data.links[i].label == "Next &raquo;") {
                $(ele).html('<i class="bx bx-chevron-right bx-sm"></i>')
            } else {
                ele.text = response.data.links[i].label
            }
        })
        // re-assign data table
        newSiteMonitoringTableBody.html("")
        // loop
        console.log(response.data.data)
        $.each(response.data.data, function (i, ele) {
            dataTables(i, ele, newSiteMonitoringTableBody)
        })
    }
    // invoke
    clientGet()
})
// submit
$('#filter-data').click(function() {
    //
    const queryStringFilters = 'siteid' in queryString() && queryString()['siteid'].length > 0 ? { "siteid" : queryString()['siteid'] } : queryString()
    ,   totalSiteEle = $("#total-site-1")
    ,   lastUpdateEle = $("#last-update-1")
    ,   mtdUpdateEle = $("#mtd-update-1")
    // get source
    const clientGet = async () => {
        const response = await client.get('/new-site-monitoring', { ...config, params: { ...queryStringFilters, page: window.location.search.split("=")[1]??1 } })
        ,     dateObj = new Date(response.data.data[0]['last_day'])
        // assign to element
        lastUpdateEle.text(`last update ${response.data.data[0]['update_date']}`)
        mtdUpdateEle.text(`mtd: ${dateObj.toUTCString().slice(8, 16)}`)
        totalSiteEle.text(`${response.data.total} Sites`)
        // clear table body element
        newSiteMonitoringTableBody.html("")
        // loop
        $.each(response.data.data, function (i, ele) {
            dataTables(i, ele, newSiteMonitoringTableBody)
        })
        // pagination
        $('nav[aria-label="Page navigation"]').html("")
        $('nav[aria-label="Page navigation"]').append(pagination(response.data.links))
    }
    // invoke
    clientGet()
})

/* PerfectScrollbar */
new PerfectScrollbar(document.getElementById('new-site-data-table-1'), { wheelPropagation: false })

// initial
$('#filter-data').triggerHandler('click')

