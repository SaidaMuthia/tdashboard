console.log('new site monitoring loaded')
//
import queryString from "../query-string.js"
import dataTables from "./data-tables.js"
import pagination from "../pagination.js"
// jquery element objects
const newSiteMonitoringTableBody = $("#new-site-monitoring-rows-1")
const networkCapacityTitle = $("#title-network-capacity-1")
const totalSite = $('#total-site-1')
// Highcharts option
const chartOpts = {
    chart: {
        type: 'bar',
    },
    credits: { enabled: false },
    title: {
        text: 'A4 Pamasuka Network Capacity Status'
    },
    xAxis: {
        categories: '',
        title: {
            text: ''
        },
        labels: {
            rotation: 0
        }
    },
    yAxis:  [
        { // Secondary yAxis
            title: {
                text: 'Branch Sites',
                style: {
                    // color: Highcharts.getOptions().colors[0],
                    color: '#ffffff',
                    // color: '#000',
                    fontSize:'14px'
                }
            },
        },
        {
            min: 0,
            title: {
                text: 'Total Sites'
            }
        }
    ],
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                format: `{point.y}`,
                style: {
                    fontSize: '16px'
                }
            },
            cursor: 'pointer',
            events: {
                click: function(event) {
                    const queryStringFilters = 'siteid' in queryString() && queryString()['siteid'].length > 0 ? { "siteid" : queryString()['siteid'] } : queryString()
                    const clientGet = async function () {
                        const seriesName = event.point.series.name.toLowerCase()
                        // fetch data
                        const response = await client.get('/network-capacity', {
                            ...config,
                            params: {
                                ...queryStringFilters,
                                "branch": event.point.category.toLowerCase() != 'network status' ? event.point.category : '',
                                "treshold": seriesName,
                                "pagination": true
                            }
                        })
                        console.log('response', response)
                        console.log('event', event.point.category)
                        console.log('event 1', event.point.series.name)
                        console.log('queryString()', queryString())
                        // remove child element
                        $("tbody#data, span#lastupdate_date, span#last-day-mtd").html("")
                        $("nav[aria-label=\"Page navigation\"]").html("")
                        newSiteMonitoringTableBody.html("")
                        totalSite.html("")
                        networkCapacityTitle.html("")
                        // assign process
                        totalSite.text(response.data.data.total)
                        networkCapacityTitle.html(`
                            New Site Lists
                            <a href="#" style="text-decoration: underline;">${event.point.series.name}</a>
                            <a href="#" style="text-decoration: underline;">#Branch${event.point.category}</a>
                        `)
                        // loop data to table
                        $.each(response.data.data.data, function (i, ele) {
                            dataTables(i, ele, newSiteMonitoringTableBody)
                        })
                        // pagination
                        $('nav[aria-label="Page navigation"]').append(pagination(response.data.data.links))
                    }
                    // method called
                    clientGet()
                    //auto scroll to table after click
                    $("html, body").animate({
                        scrollTop: $("#new-site-data-table-1").offset().top - 165
                    }, 200)
                }
            }
        }
    },
    series: []
}
// highchart instances
const highchartsInstance = function (chartOpts) {
    // set default options
    Highcharts.setOptions({
        lang: {
            numericSymbol: null,
            decimalPoint: '.',
            thousandSep: ','
        }
    })
    // chart instances
    Highcharts.chart(chartOpts)
}
// add click event to dynamic anchor element
$('nav[aria-label="Page navigation"]').on('click', 'a.page-link', function (event) {
    console.log('trigger pagination button')
    // prevent element from default behavior action
    event.preventDefault()
    // get source
    const queryStringFilters = 'siteid' in queryString() && queryString()['siteid'].length > 0 ? { "siteid" : queryString()['siteid'] } : queryString()
    const clientGet = async () => {
        // push new url to url bar without reload page
        history.pushState(null, null, event.currentTarget.pathname + event.currentTarget.search )
        // get response
        const getQueryParams = function () {
            const params = new URLSearchParams(event.currentTarget.search)
            const queryParams = {}
            // loop over query params entries
            for (const [key, value] of params.entries()) {
                queryParams[key] = value
            }
            // return object
            return queryParams
        }
        // fetch data
        const response = await client.get('/network-capacity', { ...config, params: { ...queryStringFilters, ...getQueryParams() }})
        // re-assign generate link by paginator
        $.each($('a.page-link'), function (i, ele) {
            // re-assign href attribute value
            ele.href = response.data.data.links[i].url??'#'
            // toggle class active in page-item element
            response.data.data.links[i].active ? $(ele).parent().addClass('active') : $(ele).parent().removeClass('active')
            // re-assign text content
            if (response.data.data.links[i].label == "&laquo; Previous") {
                $(ele).html('<i class="bx bx-chevron-left bx-sm"></i>')
            } else if (response.data.data.links[i].label == "Next &raquo;") {
                $(ele).html('<i class="bx bx-chevron-right bx-sm"></i>')
            } else {
                ele.text = response.data.data.links[i].label
            }
        })
        // re-assign data table
        newSiteMonitoringTableBody.html("")
        // loop
        $.each(response.data.data.data, function (i, ele) {
            dataTables(i, ele, newSiteMonitoringTableBody)
        })
    }
    // invoke
    clientGet()
})
// fetching data
const fetchData = async function () {
    const { data: { data: response } } = await client.get('network-capacity', { ...config, params: { ...queryString(), "pagination": true }})
    const { data: { data: branchLists }} = await client.get('network-capacity', {...config, params: { ...queryString(), "list": 'branch' }})
    const { data: { data: responseAboveThreshold }} = await client.get('network-capacity', { ...config, params: { ...queryString(), "treshold": 'above treshold' }})
    const { data: { data: responseBelowThreshold }}  = await client.get('network-capacity', { ...config, params: { ...queryString(), "treshold": 'below treshold' }})
    const { data: { data: responseFullbandThreshold }} = await client.get('network-capacity', { ...config, params: { ...queryString(), "treshold": 'fullband treshold' }})
    console.log('responseFullbandThreshold', responseFullbandThreshold)
    console.log('responseBelowThreshold', responseBelowThreshold)
    console.log('responseAboveThreshold', responseAboveThreshold)
    // re-assign data table
    newSiteMonitoringTableBody.html("")
    totalSite.html("")
    // assign total site
    totalSite.text(response.total)
    // loop data to table
    $.each(response.data, function (i, ele) {
        dataTables(i, ele, newSiteMonitoringTableBody)
    })
    // pagination
    $('nav[aria-label="Page navigation"]').html("")
    $('nav[aria-label="Page navigation"]').append(pagination(response.links))
    // main chart
    chartOpts.title.text = 'A4 Pamasuka Network Capacity Status'
    chartOpts.xAxis.categories = ['NETWORK STATUS']
    chartOpts.chart.height = '275px'
    chartOpts.chart.type = 'bar'
    chartOpts.chart.renderTo = 'treshold-status-all-branch-1'
    chartOpts.plotOptions.series.dataLabels.style.fontSize = '12px'
    chartOpts.series = [
        {
            name: 'Full Band',
            data: [responseFullbandThreshold.length],
            color: '#2caffe'
        },
        {
            name: 'Below Treshold',
            data: [responseBelowThreshold.length],
            color: '#544fc5'
        },
        {
            name: 'Above Treshold',
            data: [responseAboveThreshold.length],
            color: '#00e272'
        },
    ]
    // highcharts instances
    const branchAboveTresholdCount = branchLists.map(function (ele) {
        return responseAboveThreshold.filter(function (eleAboveTreshold) {
            return eleAboveTreshold['BRANCH'] == ele
        }).length
    })
    const branchBelowTresholdCount = branchLists.map(function (ele) {
        return responseBelowThreshold.filter(function (eleBelowTreshold) {
            return eleBelowTreshold['BRANCH'] == ele
        }).length
    })
    const branchFullbandTresholdCount = branchLists.map(function (ele) {
        return responseFullbandThreshold.filter(function (eleFullbandTreshold) {
            return eleFullbandTreshold['BRANCH'] == ele
        }).length
    })
    // invoke
    highchartsInstance(chartOpts)
    // above Threshold chart
    chartOpts.title.text = 'Network Capacity Above Treshold'
    chartOpts.xAxis.categories = branchLists
    chartOpts.xAxis.title.text = 'Branch'
    chartOpts.xAxis.labels.rotation = -90
    chartOpts.chart.type = 'column'
    chartOpts.chart.height = '420px'
    chartOpts.chart.renderTo = 'above-treshold-chart'
    chartOpts.plotOptions.series.dataLabels.style.fontSize = '10px'
    chartOpts.series = [{
        name: 'Above Treshold',
        data: branchAboveTresholdCount,
        color: '#00e277'
    }]
    // create chart instances
    highchartsInstance(chartOpts)
    // below threshold chart
    chartOpts.title.text = 'Network Capacity Below Treshold',
    chartOpts.chart.renderTo = 'below-treshold-chart'
    chartOpts.series = [{
        name: 'Below Treshold',
        data: branchBelowTresholdCount,
        color: '#544fc5'
    }]
    // create chart instances
    highchartsInstance(chartOpts)
    // fullband threshold chart
    chartOpts.title.text = 'Network Capacity Fullband',
    chartOpts.chart.renderTo = 'fullband-chart'
    chartOpts.series = [{
        name: 'Full Band',
        data: branchFullbandTresholdCount,
        color: '#2caffe'
    }]
    // create chart instances
    highchartsInstance(chartOpts)
}
// invoke
fetchData()
// click handler on dynamic element
$("div.list-group").on('click', 'a.dropdown-item', function() {
    // invoke
    fetchData()
})
$("div.dropdown-menu").on('click', 'button.btn-danger', function() {
    // invoke
    fetchData()
})
$("#filter-data").on('click', function () {
    // invoke
    fetchData()
})
