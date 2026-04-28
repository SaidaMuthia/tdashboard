console.log('worst 20 loaded')

import queryString from "./query-string.js"
import dataTables from "./data-tables.js"
import iconMarkerLayer from "./leaflet.marker.js"
// global variable map
var map = null
const client = axios.create({
    baseURL: ictpamasukaPath
})
// submit
$("input[type=radio]").click(function() {
    // variable declaration
    const filter = $('input[name=btnradio]:checked').val()
    ,   sort = $('input[name=btnradiosort]:checked').val()
    ,   config = {
            headers: {
                accept: 'application/json'
            }
        }
    // conditionally add checked attribute
    if (['btnradio', 'btnradiosort'].includes($(this).attr('name'))) {
        //remove checked attribute
        $('input[name=' + $(this).attr('name') + ']').removeAttr('checked')
        // add new checked attr to active element
        $(this).attr('checked', true)
    }
    // fetch data
    const fetchData = async function () {
        console.log('queryString this', queryString())
        const response = await client.get('/worst', {...config, params: { "filter": filter, "order": sort, ...queryString() }})
        ,   newSiteMonitoringTableBody = $("#new-site-monitoring-rows-1")
        ,   lastUpdateEle = $("#last-update-1")
        ,   mtdUpdateEle = $("#mtd-update-1")
        ,   dateObj = new Date(response.data.data[0]['last_day'])
        // assign to element
        lastUpdateEle.text(`last update: ${response.data.data[0]['update_date']}`)
        mtdUpdateEle.text(`mtd: ${dateObj.toUTCString().slice(8, 16)}`)
        // clear table body element
        newSiteMonitoringTableBody.html('')
        // check leaflet map has been initialized
        if (map != undefined || map != null) {
            map.remove();
            map.off();
        }
        // leaflet initial
        map = L.map('map').setView([-1.4658777332467352, 119.36728358927137], 6)
        // set tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        // loop over
        $.each(response.data.data, function (idx, ele){
            // table rows
            dataTables(idx, ele, newSiteMonitoringTableBody, false)
            // leaflet circle marker
            var circleMarker = L.circle([ele.latitude, ele.longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500 * (idx + 1)
            }).addTo(map)
            // binding popup to circle marker
            circleMarker.bindPopup(`<div><b>Urut:</b> ${idx + 1}</div><div><b>Site:</b> ${ele['SITE ID']}</div>`)
        })
    }
    // invoke
    fetchData()
    // sort/filter trigger placeholder
    $('#map-description-1').html(`Worst 20 New Site in Region: ${queryString()['region'] || ' - ' } | Sort: ${ sort } | Filter: ${ filter }`)
})
// nearest other operator
$('#new-site-monitoring-rows-1').on('click', 'td:nth-child(2)', function() {
    const fetchData = async function (site_id) {
        const response = await client.get('/new-ictpamasuka/api-test/worst/site_id/' + site_id + '/nearest-op', config)
        , bronzeOtherOperator = iconMarkerLayer(response.data.data, 'op bronze', 'bronze_marker.png')
        , silverOtherOperator = iconMarkerLayer(response.data.data, 'op silver', 'silver_marker.png')
        , goldOtherOperator = iconMarkerLayer(response.data.data, 'op gold', 'gold_marker.png')
        , platinumOtherOperator = iconMarkerLayer(response.data.data, 'op platinum', 'platinum_marker.png')
        , outlierOtherOperator = iconMarkerLayer(response.data.data, 'op outlier', 'outlier_marker.png')
        console.log('nearest op 1', site_id)
        console.log('nearest op', response)
        // check leaflet map has been initialized
        if (map != undefined || map != null) {
            map.remove();
            map.off();
        }
        //  reinitialize leaflet
        map = L.map('map', {
            center: [response.data.default[0]['latitude'], response.data.default[0]['longitude']],
            layers: [bronzeOtherOperator, silverOtherOperator, goldOtherOperator, platinumOtherOperator, outlierOtherOperator],
            zoom: 10
        })
        // set tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
        // Telkomsel Coor
        L.marker([response.data.default[0]['latitude'], response.data.default[0]['longitude']], {
            icon: L.icon({
                iconUrl: 'assets/css/images/telkomsel_marker.png',
                iconSize: [30, 46],
                shadowUrl: 'assets/css/images/marker-shadow.png',
                shadowSize: [40, 56],
                shadowAnchor: [13, 32]
            })
        })
        .addTo(map)
        .bindTooltip(`
            <div>Site: <b>${response.data.default[0]['SITE ID']}</b></div>
            <div>Average Daily Payload: <b>${response.data.default[0]['avg_payload']}MB</b></div>
            <div>Average Daily Traffic: <b>${response.data.default[0]['avg_traffic']}MB</b></div>
            <div>Average Daily Revenue: <b>${response.data.default[0]['avg_rev']}</b></div>
        `)
    }
    // invoke
    fetchData($(this).text().trim())
    //site id cell trigger placeholder
    $('#map-description-1').html(`Other Operator Less Than 5 KM Around Site <span class="badge rounded-pill bg-label-primary align-middle">${$(this).text().trim()}</span>`)
    // event
    $("html").scrollTop(350);
})

/* PerfectScrollbar */
new PerfectScrollbar(document.getElementById('new-site-data-table-1') ,{ wheelPropagation: false })

// initial
$('input[type=radio]').triggerHandler('click')
