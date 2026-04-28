//
const HighchartsInstances = function (seriesData, eleId) {
    let yAxisChartOpt = {
        min:0,
        max:101,
        tickInterval: 20,
        lineWidth: 1,
        lineColor: '#000',
        // gridLineColor: 'red',
        labels: {
            format: '{value}%',
            style: {
                fontSize: '14px'
            }
        },
        plotBands: [
            {from: 0, to: 20, color: 'rgba(233, 232, 232, 1) ' },
            {from: 20, to: 40, color: 'rgba(238, 237, 237, 1)' },
            {from: 40, to: 60, color: 'rgba(243, 242, 242, 1)' },
            {from: 60, to: 80, color: 'rgba(248, 247, 247, 1)' },
            {from: 80, to: 100, color: 'rgba(253, 252, 252, 1)' }
        ]
    }
    //
    let yAxisGrowthChartOpt = {
        min: seriesData['min'],
        max: seriesData['max'] + 1,
        tickInterval: 3,
        lineWidth: 1,
        lineColor: '#000',
        // gridLineColor: 'red',
        labels: {
            format: '{value}%',
            style: {
                fontSize: '14px'
            }
        },
        // plotBands: [
        //     {from: 0, to: 20, color: 'rgba(233, 232, 232, 1) ' },
        //     {from: 20, to: 40, color: 'rgba(238, 237, 237, 1)' },
        //     {from: 40, to: 60, color: 'rgba(243, 242, 242, 1)' },
        //     {from: 60, to: 80, color: 'rgba(248, 247, 247, 1)' },
        //     {from: 80, to: 100, color: 'rgba(253, 252, 252, 1)' }
        // ]
    }
    //
    return Highcharts.chart({
            chart: {
                polar: true,     // turn on polar (spider) mode
                type: 'spline',    // 'line' (web), or try 'area' for filled spider
                renderTo: eleId
            },
            title: {
                text: eleId.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase())
            },
            pane: {
                size: '100%'// radius of the spider
            },
            xAxis: {
                categories: seriesData.branch,
                tickmarkPlacement: 'on', // ticks on category points
                lineWidth: 0
            },
            yAxis: ! eleId.includes('growth') ? yAxisChartOpt : yAxisGrowthChartOpt,
            plotOptions: {
                series: {
                    marker: {
                        symbol: 'circle',
                        radius: 3
                    }
                }
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
            },
            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical',
                enabled: false
            },
            series: [
                {
                    name: 'TSEL',
                    color: 'red',
                    data: ! eleId.includes('growth') ? seriesData.tsel.map(ele => +ele) : seriesData.tsel_growth.map(ele => +ele),
                    pointPlacement: 'on'
                }, {
                    name: 'IOH',
                    color: '#e4e412',
                    data: ! eleId.includes('growth') ? seriesData.ioh.map(ele => +ele) : seriesData.ioh_growth.map(ele => +ele),
                    pointPlacement: 'on'
                }, {
                    name: 'XLSMART',
                    color: 'blue',
                    data: ! eleId.includes('growth') ? seriesData.xlsmart.map(ele => +ele) : seriesData.xlsmart_growth.map(ele => +ele),
                    pointPlacement: 'on'
                }
            ],
            responsive: {
                rules: [
                    {
                        condition: { maxWidth: 600 },
                        chartOptions: {
                            legend: { align: 'center', verticalAlign: 'bottom', layout: 'horizontal' },
                            pane: { size: '70%' }
                        }
                    }
                ]
            },
            credits: { enabled: false }
        });
}
//
let timeout;
let chartLists = ['market-share', 'competition-index', 'enodeb-share', 'good-quality'];
//
(async function () {
    const { data: { data: yearweek } } = await client.get("/competitor-market/yearweek", { ...config })
    const { data: { data: branch } } = await client.get("/competitor-market/branch", { ...config })
    // console.log('branch', branch)
    //
    const dropdownComponents = function (data, selector) {
        //
        let Lists = $(selector)
        //
        data.forEach( function (ele) {
            //
            let itemList = $("<li></li>")
            let anchorElement = $("<a></a>")
            // set attribute
            anchorElement.attr({
                "class": "dropdown-item",
                "href": "javascript:void(0)"
            })
            // set text node
            anchorElement.text(ele)
            // append to
            itemList.append(anchorElement)
            Lists.append(itemList)
        })
        // set default value text
        $(`h5${selector}`).text( selector.toLowerCase().includes('branch') ? 'ALL' : data[0] )
    }
    // invoke
    dropdownComponents(yearweek, "[aria-labelledby=dropdownYearweek]")
    dropdownComponents(branch, "[aria-labelledby=dropdownBranch]")
})()
//
const initialChartInstances = async function (chartItem, yearweek = '202542', filterOn = false, branchFilter = []) {
    //
    const { data: { data: response }} = await client.get("/competitor-market/competitor-market-branch-level-chart", { ...config, params: { chart: chartItem, yearweek }})
    const seriesData = []
    // response data mapping to series data
    seriesData['branch'] = response.filter( ele => filterOn ? branchFilter.includes(ele.branch) : true ).map( ele => ele.branch)
    seriesData['tsel'] = response.filter( ele => filterOn ? branchFilter.includes(ele.branch) : true ).map( ele => ele.tsel)
    seriesData['tsel_growth'] = response.filter( ele => filterOn ? branchFilter.includes(ele.branch) : true ).map( ele => +ele.growth_tsel)
    seriesData['ioh'] = response.filter( ele => filterOn ? branchFilter.includes(ele.branch) : true ).map( ele => ele.ioh)
    seriesData['ioh_growth'] = response.filter( ele => filterOn ? branchFilter.includes(ele.branch) : true ).map( ele => +ele.growth_ioh)
    seriesData['xlsmart'] = response.filter( ele => filterOn ? branchFilter.includes(ele.branch) : true ).map( ele => ele.xlsmart)
    seriesData['xlsmart_growth'] = response.filter( ele => filterOn ? branchFilter.includes(ele.branch) : true ).map( ele => +ele.growth_xlsmart)
    seriesData['min'] = Math.min(...seriesData['tsel_growth'], ...seriesData['ioh_growth'], ...seriesData['xlsmart_growth'])
    seriesData['max'] = Math.max(...seriesData['tsel_growth'], ...seriesData['ioh_growth'], ...seriesData['xlsmart_growth'])
    //
    HighchartsInstances(seriesData, chartItem)
    HighchartsInstances(seriesData, `${chartItem}-growth`)
}
// loop invoke
chartLists.forEach(ele => initialChartInstances(ele))
// yearweek dropdown
$("[aria-labelledby=dropdownYearweek").on("click", "a", function (eventObj) {
    //
    const branchLists = $("ul[aria-labelledby=dropdownBranch]>li>a.active").toArray().map( ele => ele.textContent )
    // get text value from current element triggered click event
    elementValue = $(this).text()
    // set new text value to h5 element
    $(this).parents('div[class=col-auto]').next().find('h5').text(elementValue)
    // loop invoke
    chartLists.forEach(ele => initialChartInstances(ele, elementValue, branchLists.length === 0 ? false : true, branchLists))
})
// branch dropdown
$("[aria-labelledby=dropdownBranch]").on("click", "a", function (eventObj) {
    // prevent default behavior
    eventObj.stopPropagation()
    //
    let yearweek = $("h5[aria-labelledby=dropdownYearweek]").text()
    //
    $(this).toggleClass("active")
    //
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        //
        const branchLists = $("ul[aria-labelledby=dropdownBranch]>li>a.active").toArray().map( ele => ele.textContent )
        //
        $("h5[aria-labelledby=dropdownBranch]").text(branchLists.length == 0 || branchLists.length == 18 ? "ALL" : branchLists.toString() )
        $("[name=branchList]").val(branchLists.toString())
        //
        chartLists.forEach(ele => initialChartInstances(ele, yearweek, branchLists.length === 0 ? false : true, branchLists))
    }, 1000)
})


