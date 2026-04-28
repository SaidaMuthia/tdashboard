console.log('performance new infra loaded')
//
import queryString from "./../query-string.js"
import dataTables from "./../performance-new-infra/data-tables.js"
import pagination from "./../pagination.js"
// jquery element objects
const newSiteMonitoringTableBody = $("#new-site-monitoring-rows-1")
const networkCapacityTitle = $("#title-network-capacity-1")
const totalSite = $('#total-site-1')
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
//
const number_format = function (number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return Math.round(n * k) / k;
        },
        s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
//
const bgColor = function (ele) {
    if (ele < 1000000) {
        return "bg-danger text-white";
    } else if (ele >= 1000000 && ele < 2000000) {
        return "bg-warning";
    } else if (ele >= 2000000) {
        return "bg-success";
    }
}
//
const siteOAInfo = function (data) {
    let { yearmonth, update_date, siteid_all, avg_rev_siteid_all, avg_vlr_siteid_all, Red, Green, vlr_yearmonth_update } = data[0]
    let avg_rev = number_format(avg_rev_siteid_all)
    let avg_vlr = number_format(avg_vlr_siteid_all)
    let shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let vlrYearMonth = `${shortMonth[Number(vlr_yearmonth_update.toString().slice(-2)) - 1]} ${vlr_yearmonth_update.toString().slice(0, 4)}`
    // flush inner content
    $("#new-site-monitoring-info-1, #last-update-date-1").html("")
    // info details
    $("#last-update-date-1, #last-update-date-2").text(update_date)
    // vlr month info
    // $("#last-update-vlr-1").text(vlrYearMonth)
    //
    $("#new-site-monitoring-info-1")
        .html(`From <b style="color:red">${siteid_all}</b> new infra On Air in ${yearmonth}, <b style="color:red;">${Green}</b> sites have daily revenue >2 Mio, while remaining <b style="color:red;">${Red}</b> sites still under the target. Average revenue per site equals to <b style="color:red;">${avg_rev} mio</b> with an average <b style="color:red;">${avg_vlr}</b> subscribers per site.`)
}
//
const yearLabel = (yearMonthArr) => {
    //
    let getYearOnly = yearMonthArr.map(ele => {
        return ele.toString().slice(0, 4)
    })
    //
    let filterUniqueYear = (getYearOnly.filter( (ele, index, arr) => {
        return arr.indexOf(ele) == index
    })).join('-')
    // return
    return filterUniqueYear
}
//
const dataSiteOA = function (data) {
    let yearMonth = []
    let siteIDAll = []
    let siteIDB2S = []
    let siteIDColloTP = []
    //
    $.each(data, function(w, x) {
        yearMonth.push(x.yearmonth)
        siteIDAll.push(x.siteid_all)
        siteIDB2S.push(x.siteid_b2s)
        siteIDColloTP.push(x.siteid_collotp)
    })
    // invoke
    yearLabel(yearMonth)
    //
    let siteIDSeries = yearMonth.map((ele, i, arr) => {
        //
        let placeHolderArr = (new Array(arr.length)).fill(0)
        //
        return {
            name: `Site OA mtd ${ele}`,
            data: placeHolderArr.fill(siteIDAll[i], i),
            stack: 1
        }
    })
    let siteIDB2SSeries = yearMonth.map((ele, i, arr) => {
        //
        let placeHolderArr = (new Array(arr.length)).fill(0)
        //
        return {
            name: `Site B2S OA mtd ${ele}`,
            data: placeHolderArr.fill(siteIDB2S[i], i),
            stack: 1
        }
    })
    let siteIDColloSeries = yearMonth.map((ele, i, arr) => {
        //
        let placeHolderArr = (new Array(arr.length)).fill(0)
        //
        return {
            name: `Site ColloTP OA mtd ${ele}`,
            data: placeHolderArr.fill(siteIDColloTP[i], i),
            stack: 1
        }
    })
    // site Informations
    let siteInfoOA = [
        {
            elementId: 'siteid-all',
            title: `Total Site OA All SoW ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'All SoW',
            data: siteIDSeries.reverse(),
            color: ['red'],
            yAxisText: 'On Air Sites' ,
            tooltipText: ' Sites'
        },
        {
            elementId: 'siteid-b2s',
            title: `Total Site OA SoW B2S ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'B2S',
            data: siteIDB2SSeries.reverse(),
            color: ['blue'],
            yAxisText: 'On Air Sites',
            tooltipText: ' Sites'
        },
        {
            elementId: 'siteid-collotp',
            title: `Total Site OA SoW ColloTP ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'Collo TP',
            data: siteIDColloSeries.reverse(),
            color: ['blue'],
            yAxisText: 'On Air Sites',
            tooltipText: ' Sites'
        },
    ]
    // loop over highchartsInit
    $.each(siteInfoOA, function(x, y) {
        highchartsInstance({
            chart: {
                type: 'column',
                renderTo: y.elementId
            },
            credits: { enabled: false },
            exporting: {
                chartOptions: {
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                inside: true,
                                align: 'center',
                                formatter: function () {
                                    if (this.y != 0) {
                                        return this.y
                                    }
                                }
                            }
                        }
                    }
                }
            },
            title: {
                text: y.title,
                align: 'left'
            },
            xAxis: {
                categories: y.categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: y.yAxisText
                }
            },
            legend: { enabled: false },
            tooltip: {
                format: '{series.name}: {y}<br/>' +
                    'Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: y.data
        })
    })
}
//
const dataSite = function (data) {
    //
    let yearMonth = []
    let siteIDAll = []
    let siteIDB2S = []
    let siteIDColloTP = []
    let siteIDAllGreen = []
    let siteIDAllRed = []
    let siteIDRev = []
    let siteIDB2SRev = []
    let siteIDColloTPRev = []
    let siteIDVLR = []
    let siteIDB2SVLR = []
    let siteIDColloTPVLR = []
    //
    $.each(data, function(w, x) {
        siteIDAll.push(x.siteid_all)
        siteIDB2S.push(x.siteid_b2s)
        siteIDColloTP.push(x.siteid_collotp)
        siteIDAllGreen.push(x.green)
        siteIDAllRed.push(x.red)
        yearMonth.push(x.yearmonth)
        siteIDRev.push(+x.avg_rev_siteid_all)
        siteIDB2SRev.push(+x.avg_b2s)
        siteIDColloTPRev.push(+x.avg_collotp)
        siteIDVLR.push(+x.avg_vlr_siteid_all)
        siteIDB2SVLR.push(+x.avg_vlr_b2s)
        siteIDColloTPVLR.push(+x.avg_vlr_collotp)
    })
    // invoke
    yearLabel(yearMonth)
    //
    let seriesRevSiteidAll = yearMonth.map((ele, i) => {
        return {
            y: siteIDRev[i],
            siteid: siteIDAll[i],
        }
    })
    let seriesRevSiteidB2S = yearMonth.map((ele, i) => {
        return {
            y: siteIDB2SRev[i],
            siteid: siteIDB2S[i],
        }
    })
    let seriesRevSiteidColloTP = yearMonth.map((ele, i) => {
        return {
            y: siteIDColloTPRev[i],
            siteid: siteIDColloTP[i],
        }
    })
    let seriesVLRSiteidAll = yearMonth.map((ele, i) => {
        return {
            y: siteIDVLR[i],
            siteid: siteIDAll[i],
        }
    })
    let seriesVLRSiteidB2S = yearMonth.map((ele, i) => {
        return {
            y: siteIDB2SVLR[i],
            siteid: siteIDB2S[i],
        }
    })
    let seriesVLRSiteidColloTP = yearMonth.map((ele, i) => {
        return {
            y: siteIDColloTPVLR[i],
            siteid: siteIDColloTP[i],
        }
    })
    let siteInfo = [
        {
            elementId: 'avg-rev-siteid-all',
            title: `Average Montly Revenue Site OA All SoW ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'All SoW',
            data: seriesRevSiteidAll,
            color: ['red'],
            yAxisText: 'Average Revenue',
            tooltipText: '',
            info: {
                labelChart: 'Revenue'
            }
        },
        {
            elementId: 'avg-rev-b2s',
            title: `Average Montly Revenue Site OA SoW B2S ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'B2S',
            data: seriesRevSiteidB2S,
            color: ['blue'],
            yAxisText: 'Average Revenue',
            tooltipText: '',
            info: {
                labelChart: 'Revenue'
            }
        },
        {
            elementId: 'avg-rev-collotp',
            title: `Average Montly Revenue Site OA SoW ColloTP ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'Collo TP',
            data: seriesRevSiteidColloTP,
            color: ['blue'],
            yAxisText: 'Average Revenue',
            tooltipText: '',
            info: {
                labelChart: 'Revenue'
            }
        },
        {
            elementId: 'avg-vlr-subs-siteid-all',
            title: `Average Monthly VLR Subs Site OA All SoW ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'All SoW',
            data: seriesVLRSiteidAll,
            color: ['red'],
            yAxisText: 'Average VLR Subs',
            tooltipText: '',
            info: {
                labelChart: 'VLR Subs'
            }
        },
        {
            elementId: 'avg-vlr-subs-b2s',
            title: `Average Monthly VLR Subs Site OA SoW B2S ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'B2S',
            data: seriesVLRSiteidB2S,
            color: ['blue'],
            yAxisText: 'Average VLR Subs',
            tooltipText: '',
            info: {
                labelChart: 'VLR Subs'
            }
        },
        {
            elementId: 'avg-vlr-subs-collotp',
            title: `Average Monthly VLR Subs Site OA SoW ColloTP ${yearLabel(yearMonth)}`,
            categories: yearMonth,
            name: 'Collo TP',
            data: seriesVLRSiteidColloTP,
            color: ['blue'],
            yAxisText: 'Average VLR Subs',
            tooltipText: '',
            info: {
                labelChart: 'VLR Subs'
            }
        },
    ]
    // loop over highchartsInit
    $.each(siteInfo, function(x, y) {
        highchartsInstance({
            chart: {
                type: 'column',
                renderTo: y.elementId,
            },
            credits: { enabled: false },
            exporting: {
                chartOptions: {
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                inside: false,
                                align: 'left',
                                y: 0,
                            }
                        }
                    }
                }
            },
            title: {
                text: y.title,
                align: 'left'
            },
            colors: y.color,
            xAxis: {
                categories: y.categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: y.yAxisText
                }
            },
            tooltip: {
                // eleueSuffix: y.tooltipText
                format: `Average Monthly ${y.info.labelChart} : ${y.info.labelChart != 'VLR Subs' ? '{y:,.2f}' : '{y:,0f}' } <br/>` +
                'Total Site : {point.siteid}'
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                },
            },
            series: [
                {
                    name: y.name,
                    data: y.data
                },
            ]
        })
    })
}
//
const dataTableChart = function (index, ele, sowInfra) {
    //
    let avgRev = number_format(ele[sowInfra[1]], 0)
    let avgVlrSubs = number_format(ele[sowInfra[2]], 0)
    // progres bar
    let siteProgress = (ele[sowInfra[3]]/sowInfra[4] * 100)
    let avgRevProgress = ((ele[sowInfra[1]]/sowInfra[5] * 100) - 45)
    let avgVLRSubsProgress = ( ele[sowInfra[2]]/sowInfra[6] * 100)
    //
    if (ele['month_connected'] != 1000) {
        $(`#${sowInfra[0]} > tbody`).append(`
        <tr>
            <td><b>${ele.month_connected < 9 ? ele.month_connected : '>8'}</b></td>
            <td>
                <div class="progress" style="height: 2rem;font-size:12px;">
                    <div class="progress-bar progress-bar-danger" role="progressbar" style="width:${avgRevProgress + '%'}"></div>
                    <div class="progress-bar progress-bar-danger" role="progressbar" style="width:45%"><span>${avgRev}</span></div>
                </div>
            </td>
            <td>
                <div class="progress" style="height: 2rem;font-size:12px;">
                    <div class="progress-bar progress-bar-sub" role="progressbar" style="width:${avgVLRSubsProgress + '%'}"></div>
                    <div class="progress-bar progress-bar-sub" role="progressbar" style="width:29%"><span>${avgVlrSubs}</span></div>
                </div>
            </td>
            <td>
                <div class="progress" style="height: 2rem;font-size:12px;">
                    <div class="progress-bar progress-bar-site" role="progressbar" style="width:${siteProgress + '%'}"></div>
                    <div class="progress-bar progress-bar-site" role="progressbar" style="width:20%"><span>${ele[sowInfra[3]]}</span></div>
                </div>
            </td>
        </tr>`);
    } else {
        $(`#${sowInfra[0]} > tbody`).append(`
        <tr>
            <td></td>
            <td>
                <span  style="width: 75%; margin: auto; font-weight: 700">${avgRev}</span>
            </td>
            <td>
                <span  style="width: 75%; margin: auto; font-weight: 700">${avgVlrSubs}</span>
            </td>
            <td>
                <span  style="width: 75%; margin: auto; font-weight: 700">${ele[sowInfra[3]]}</span>
            </td>
        </tr>`);
    }
}
//
const dataTable = function (data) {
    // clear table body
    $("#tablePerformanceNewInfra > tbody#data").html("")
    // loop data
    $.each(data, function (idx, ele){
        // append to each table's row
        $("#tablePerformanceNewInfra > tbody#data").append("<tr>" +
            "<td>" + ele['level'].toUpperCase() + "</td>" +
            "<td>" + ele['region'] + "</td>" +
            "<td>" + ele['all'] + "</td>" +
            "<td>" + ele['site_B2S'] + "</td>" +
            "<td>" + ele['site_ColloTp'] + "</td>" +
            "<td>" + ele['no_rev'] + "</td>" +
            "<td>" + number_format(ele['avg_b2s'], 2) + "</td>" +
            "<td>" + number_format(ele['avg_collotp'], 2) + "</td>" +
            "<td>" + ele['avg_vlr_subs_b2s'] + "</td>" +
            "<td>" + ele['avg_vlr_subs_collotp'] + "</td>" +
            "<td>" + ele['Red'] + "</td>" +
            "<td>" + ele['Yellow'] + "</td>" +
            "<td>" + ele['Green'] + "</td>" +
            "<td>" + ele['No Revenue'] + "</td>" +
            "</tr>"
        );
    })
}
//
const lostAging = function (data) {
    // total row data
    let dataTotal = data[data.length - 1]
    //  b2s total site
    let siteIDTotalB2S = data.reduce(function(total, current) {
        return total + current.siteid_B2S
    }, 0)
    // collotp total site
    let siteIDTotalCollo = data.reduce(function(total, current) {
        return total + current.siteid_ColloTP
    }, 0)
    // max siteid All
    let avgSiteAll = data.reduce(function(total, current) {
        return Math.max(total, current.avg_siteid_all)
    }, 0)
    let avgVLRSubsSiteAll = data.reduce(function(total, current) {
        return Math.max(total, current.avg_vlr_siteid_all)
    }, 0)
    // max collotp
    let avgColloTP = data.reduce(function (total, current) {
        return Math.max(total, current.avg_collotp)
    }, 0)
    let avgVLRSubsColloTP = data.reduce(function (total, current) {
        return Math.max(total, current.avg_vlr_subs_collotp)
    }, 0)
    // max b2s
    let avgB2S = data.reduce(function (total, current) {
        return Math.max(total, current.avg_b2s)
    }, 0)
    let avgVLRSubsB2S = data.reduce(function (total, current) {
        return Math.max(total, current.avg_vlr_subs_b2s)
    }, 0)
    // declare variable with information about data table chart
    let sowInfraAllSoW = ['all-sow-chart', 'avg_siteid_all', 'avg_vlr_siteid_all', 'siteid_all', dataTotal['siteid_all'], avgSiteAll, avgVLRSubsSiteAll]
    let sowInfraB2S = ['b2s-chart', 'avg_b2s', 'avg_vlr_subs_b2s', 'siteid_B2S', dataTotal['siteid_B2S'], avgB2S, avgVLRSubsB2S]
    let sowInfraColloTP = ['collotp-chart', 'avg_collotp', 'avg_vlr_subs_collotp', 'siteid_ColloTP', dataTotal['siteid_ColloTP'], avgColloTP, avgVLRSubsColloTP]
    //
    console.log('lost aging', sowInfraAllSoW)
    console.log('lost aging', sowInfraB2S)
    console.log('lost aging', sowInfraColloTP)
    // clear table chart
    $("#b2s-chart > tbody, #collotp-chart > tbody, #all-sow-chart > tbody").html("")
    // All SOW
    $.each(data, function(i, v) {
        dataTableChart(i, v, sowInfraAllSoW)
    })
    // B2S
    $.each(data, function(i, v) {
        dataTableChart(i, v, sowInfraB2S)
    })
    // ColloTP
    $.each(data, function(i, v) {
        dataTableChart(i, v, sowInfraColloTP)
    })
}
// fetching data
const fetchData = async function () {
    const responsePNITablePamasuka = await client.get('performance-new-infra/information/pamasuka/site', { ...config, params: { ...queryString() } })
    const responsePNIChart = await client.get('performance-new-infra/chart', {...config, params: { ...queryString() } })
    const responsePNIInfo = await client.get('performance-new-infra/information', { ...config, params: { ...queryString() } })
    const responsePNISiteChart = await client.get('performance-new-infra/chart/site', { ...config, params: { ...queryString() } })
    const responsePNISiteOAChart = await client.get('performance-new-infra/chart/site-oa', { ...config, params: { ...queryString() } })
    // create chart instances
    dataSite(responsePNISiteChart.data.data)
    dataSiteOA(responsePNISiteOAChart.data.data)
    lostAging(responsePNIChart.data.data)
    dataTable(responsePNITablePamasuka.data.data)
    console.log('queryString', queryString())
    console.log('response', responsePNITablePamasuka)
    console.log('response PNIChart', responsePNIChart)
    console.log('response PNIInfo', responsePNIInfo)
    console.log('reponsePNISitechart', responsePNISiteChart.data.data)
    console.log('responsePNISiteOAChart', responsePNISiteOAChart.data.data)
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

