console.log('new site monitoring loaded')
//
import queryString from "../query-string.js"
// Highcharts option
const chart_trend_ptr_bb_voice_vlr_default_options = {
    chart: {
        reflow: true,
        color:'#000',
        borderRadius: 5,
    },
    colors: ['rgba(0, 0, 0, 0.45)', '#3498db'],
    exporting: {
        enabled: true,
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'Area 4',
        style: {
            color: "#000"
        }
    },
    xAxis: {
        categories:[],
        type: 'category',
        // crosshair: true,
        labels: {
            style: {
                color: "#000",
                fontSize: "9px"
            },
            rotation: -90
        },
        minRange: 1,
        lineWidth: 5,
        lineColor: "#ffffff",
    },
    yAxis: [
        { // Secondary yAxis
            labels: {
                enabled: false,
                style: {
                    color: '#ffffff',
                    fontSize: '7.5px'
                }
            },
            lineWidth: 1,
            gridLineWidth: 2,
            gridLineDashStyle: "Dash",
            gridLineColor: "rgba(108, 106, 106, 0.1)",
            min: 0,
            title: {
                text: 'Revenue (Bio)',
                style: {
                    color: '#000',
                    fontSize:'14px'
                }
            },
        },
        // Primary yAxis
        {
            labels: {
                enabled: false,
                style: {
                    color: '#000',
                    fontSize: '14px'
                }
            },
            lineWidth: 1,
            gridLineWidth: 2,
            gridLineDashStyle: "Dash",
            gridLineColor: "rgba(108, 106, 106, 0.1)",
            min: 0,
            title: {
                text: 'Payload (PB)',
                style: {
                    color: '#000',
                    fontSize:'14px'
                }
            }
        },
        // Secondary yAxis
        {
            labels: {
                enabled: false,
                style: {
                    color: '#ffffff',
                    fontSize: '7.5px'
                }
            },
            lineWidth: 1,
            gridLineWidth: 2,
            gridLineDashStyle: "Dash",
            gridLineColor: "rgba(108, 106, 106, 0.1)",
            min: 0,
            title: {
                text: 'Traffic (M Erl)',
                style: {
                    color: '#000',
                    fontSize:'14px'
                }
            },
            opposite: true
        },
    ],
    tooltip: {
        shared: true
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            allowPointSelect: true,
            marker: {
                enabled: false
            }
        },
    },
    legend: {
       // align: 'right',
       //  verticalAlign: 'top',
        layout: 'horizontal',
        x: 0,
        y: 0,
        // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        // backgroundColor: 'rgba(1, 1, 1, 0.29)',
        backgroundColor: null,
        itemStyle: {
            fontWeight: 'Normal',
            color: '#000'
        },
        itemHoverStyle: {
            // color: '#FFF'
            color: '#000'
        },
    },
    series: []
}
//
const highcharts_default_options = {
    chart: {
        // backgroundColor: "rgba(1, 1, 1, 0.29)",
        reflow: true,
        color: "#000",
        borderRadius: 5,
    },
    colors: ["rgba(0, 0, 0, 0.45)", "#3498db"],
    exporting: {
        enabled: true,
    },
    credits: {
        enabled: false,
    },
    title: {
        text: "Area 4",
        style: {
            color: "#000",
        },
    },
    xAxis: {
        // categories:[],
        type: "category",
        // min: 1,
        // startOnTick: true,
        // type: "category",
        // crosshair: true,
        labels: {
            style: {
                color: "#000",
                font: "10pt",
            },
            // rotation: -90,
        },
        minRange: 1,
        lineWidth: 5,
        lineColor: "#ffffff",
        // zoomEnabled: true //whether zooming is enabled
    },
    yAxis: {
        // max: 100,
        labels: {
            enabled: false,
            format: '{value} %',
            style: {
                color: "#000",
            },
        },
        // lineColor: '#ddd',
        lineWidth: 1,
        gridLineWidth: 2,
        gridLineDashStyle: "Dash",
        gridLineColor: "rgba(108, 106, 106, 0.1)",
        min: 0,
        title: {
            text: "",
            style: {
                color: "#000",
                fontSize: "14px",
            },
        },
    },
    tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
            const regexTitle = /pamasuka|regional|region/i
            // console.log(regexTitle.test(this.points[2].series.chart.title.textStr))
            // console.log('this', this)
            return `<div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item ps-2">${this.x + 1}</li>
                    <li class="list-group-item ps-2">
                        <div class="series-item">
                            <div style="width:10px;height:10px;background-color: ${this.points[2].color};display: inline-block;border-radius:50%;" class="me-2"></div>
                            ${this.points[2].series.name}:
                            <b>
                                ${this.points[2].y}
                                ${regexTitle.test(this.points[2].series.chart.title.textStr) ? "PB" : "TB"}
                            </b>
                        </div>
                        <div class="series-item">
                            <div style="width:10px;height:10px;background-color: ${this.points[1].color};display: inline-block;border-radius:50%;" class="me-2"></div>
                            ${this.points[1].series.name}:
                            <b>
                                ${this.points[1].y}
                                ${regexTitle.test(this.points[2].series.chart.title.textStr) ? "PB" : "TB"}
                            </b>
                        </div>
                        <div class="series-item">
                            <div style="width:10px;height:10px;background-color: ${this.points[0].color};display: inline-block;border-radius:50%;" class="me-2"></div>
                            ${this.points[0].series.name}:
                            <b>
                                ${this.points[0].y}
                                ${regexTitle.test(this.points[2].series.chart.title.textStr) ? "PB" : "TB"}
                            </b>
                        </div>
                    </li>
                    <li class="list-group-item ps-2">
                        <div>MTD: <b>${this.points[2].series.data[this.x].options.mtd}</b></div>
                        <div>MOM: <b>${this.points[2].series.data[this.x].options.mom}</b></div>
                        <div>YTD: <b>${this.points[2].series.data[this.x].options.ytd}</b></div>
                        <div>YOY: <b>${this.points[2].series.data[this.x].options.yoy}</b></div>
                    </li>
                </ul>
            </div>`
        },
        backgroundColor: "transparent",
        borderColor: "transparent",
        shadow: false,
        // borderRadius: 10,
        // borderWidth: 0,
        // style: {
        //     color: '#333',
        //     fontSize: '12px',
        //     fontWeight: 'bold'
        // },
    },
    legend: {
        // align: 'right',
        //  verticalAlign: 'top',
        layout: "horizontal",
        x: 0,
        y: 0,
        // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        // backgroundColor: 'rgba(1, 1, 1, 0.29)',
        backgroundColor: null,
        itemStyle: {
            font: "10pt Trebuchet MS, Verdana, sans-serif",
            color: "#000",
        },
        itemHoverStyle: {
            color: "#000",
        },
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            allowPointSelect: true,
            marker: {
                enabled: false,
            },
        },
    },
    series: [],
};
// highchart instance
const highchartsVlrSubsInstance = function ({
        response,
        elementId,
        prefixField,
        region = '',
        branch = '',
        city = '',
        subdistrict = '',
        ward = '',
        title = {
            area: '',
            region: '',
            branch: '',
            city: '',
            subdistrict: '',
            ward: ''
        }
    }) {
     // variable kategori
    const category = response[0]['Date'];
    // chart options
    chart_trend_ptr_bb_voice_vlr_default_options.series = [
        {
            name: "Payload",
            data: response[1]['Payload'].map(ele => +ele),
            tooltip: {
                pointFormatter: function() {
                    return `<span style="color:${this.color}">●  </span><span>${this.series.name} : </span><b>${this.y} PB</b><br>`
                }
            },
            type:'spline',
            color:'#2ecc71',
            yAxis: 1,
            visible: true
        },
        {
            name: "Traffic",
            data: response[5]['Traffic'].map(ele => +ele),
            tooltip: {
                pointFormatter: function() {
                    return `<span style="color:${this.color}">●  </span><span>${this.series.name} : </span><b>${this.y} M Erl</b><br>`
                }
            },
            type:'spline',
            color:'#dbcb34',
            yAxis: 2,
            visible: false
        },
        {
            name: "Rev All",
            data: response[2]['Revenue'].map(ele => +ele),
            tooltip: {
                pointFormatter: function() {
                    return `<span style="color:${this.color}">●  </span><span>${this.series.name} : </span><b>${this.y} Bio</b><br>`
                }
            },
            type:'spline',
            color:'#000'
        },
        {
            name: "Rev Broadband",
            data: response[3]['Rev_BB'].map(ele => +ele),
            tooltip: {
                pointFormatter: function() {
                    return `<span style="color:${this.color}">●  </span><span>${this.series.name} : </span><b>${this.y} Bio</b><br>`
                }
            },
            type:'spline',
            color:'#ee4035',
            visible: true
        },
        {
            name: "Rev Voice",
            data: response[4]['Rev_Voice'].map(ele => +ele),
            tooltip: {
                pointFormatter: function() {
                    return `<span style="color:${this.color}">●  </span><span>${this.series.name} : </span><b>${this.y} Bio</b><br>`
                }
            },
            type:'spline',
            color:'#0392cf',
            visible: true
        },
    ]
    // console.log('vlr instance', chart_trend_ptr_bb_voice_vlr_default_options.series)
    chart_trend_ptr_bb_voice_vlr_default_options.xAxis.categories = category
    //
    if (region == "") {
        chart_trend_ptr_bb_voice_vlr_default_options.title.text = title.area.toUpperCase();
    } else if (region !== "" && branch == "") {
        chart_trend_ptr_bb_voice_vlr_default_options.title.text = title.region.toUpperCase() + region;
    } else if (branch !== "" && city == "") {
        chart_trend_ptr_bb_voice_vlr_default_options.title.text = title.branch.toUpperCase() + branch;
    } else if (city !== "" && subdistrict == "") {
        chart_trend_ptr_bb_voice_vlr_default_options.title.text = title.city.toUpperCase() + city;
    } else if (subdistrict !== "" && ward == "") {
        chart_trend_ptr_bb_voice_vlr_default_options.title.text = title.subdistrict.toUpperCase() + subdistrict;
    } else {
        chart_trend_ptr_bb_voice_vlr_default_options.title.text = title.ward.toUpperCase() + ward;
    }
    //
    chart_trend_ptr_bb_voice_vlr_default_options.chart.renderTo = elementId;
    // initial highcharts
    new Highcharts.Chart(chart_trend_ptr_bb_voice_vlr_default_options);
}
const highchartsInstance = function ({
        response,
        elementId,
        prefixField,
        region = '',
        branch = '',
        city = '',
        subdistrict = '',
        ward = '',
        title = {
            area: '',
            region: '',
            branch: '',
            city: '',
            subdistrict: '',
            ward: ''
        }
    }) {
    // create empty array
    let my_1 = [];
    for (let i = 0; i < response.item.length; i++) {
        my_1.push({
            y: +response.item[i][`${prefixField}_my1`],
            name: +response.item[i][`date`],
            mtd: +response.item[i][`${prefixField}_mtd`],
            mom: +response.item[i][`${prefixField}_mom`],
            yoy: +response.item[i][`${prefixField}_yoy`],
            ytd: +response.item[i][`${prefixField}_ytd`],
        });
    }
    // create empty array
    let my_2 = [];
    for (let i = 0; i < response.item.length; i++) {
        my_2.push({
            y: +response.item[i][`${prefixField}_my2`],
            name: +response.item[i][`date`],
        });
    }
    // create empty array
    let my_3 = [];
    for (let i = 0; i < response.item.length; i++) {
        my_3.push({
            y: +response.item[i][`${prefixField}_my3`],
            name: +response.item[i][`date`],
        });
    }
    // chart series
    highcharts_default_options.series = [
        {
            name: response.item3,
            data: my_3,
            type: "spline",
            color: "#dbcb34",
        },
        {
            name: response.item2,
            data: my_2,
            type: "spline",
            color: "#db3445",
        },
        {
            name: response.item1,
            data: my_1,
            type: "spline",
            color: "#3498db",
        },
    ];
    if (region == "") {
        highcharts_default_options.title.text = title.area.toUpperCase();
    } else if (region !== "" && branch == "") {
        highcharts_default_options.title.text = title.region.toUpperCase() + region;
    } else if (branch !== "" && city == "") {
        highcharts_default_options.title.text = title.branch.toUpperCase() + branch;
    } else if (city !== "" && subdistrict == "") {
        highcharts_default_options.title.text = title.city.toUpperCase() + city;
    } else if (subdistrict !== "" && ward == "") {
        highcharts_default_options.title.text = title.subdistrict.toUpperCase() + subdistrict;
    } else {
        highcharts_default_options.title.text = title.ward.toUpperCase() + ward;
    }
    // highchart options
    highcharts_default_options.xAxis.labels.rotation = 0;
    highcharts_default_options.yAxis.title.text = /pamasuka|region|regional/i.test(highcharts_default_options.title.text) ? "PB" : "TB";
    highcharts_default_options.chart.renderTo = elementId;
    // create highchart instance
    // Highcharts.setOptions({
    //     styledMode: true
    // })
    new Highcharts.Chart(highcharts_default_options);
}
// jquery object
const newSiteMonitoringTableBody = $("#new-site-monitoring-rows-1")
// fetching data
const fetchData = async function () {
    const response = await client.get('achievement/toip/chart', { ...config, params: { ...queryString() }})
    const responseVlrSubs = await client.get('achievement/toip/vlr-chart', { ...config, params: { ...queryString() }})

    const chartLists = [
        {
            elemId: 'payload-chart',
            prefixField: 'p',
            title: {
                area: 'payload trend pamasuka',
                region: 'payload trend regional: ',
                branch: 'payload trend branch: ',
                city: 'payload trend kab/kota: ',
                subdistrict: 'payload trend kecamatan: ',
                ward: 'payload trend kelurahan: '
            }
        }, {
            elemId: 'traffic-chart',
            prefixField: 't',
            title: {
                area: 'traffic trend pamasuka',
                region: 'traffic trend regional: ',
                branch: 'traffic trend branch: ',
                city: 'traffic trend kab/kota: ',
                subdistrict: 'traffic trend kecamatan: ',
                ward: 'traffic trend kelurahan: '
            }
        }, {
            elemId: 'digital-chart',
            prefixField: 'rd',
            title: {
                area: 'digital trend pamasuka',
                region: 'digital trend regional: ',
                branch: 'digital trend branch: ',
                city: 'digital trend kab/kota: ',
                subdistrict: 'digital trend kecamatan: ',
                ward: 'digital trend kelurahan: '
            }
        }, {
            elemId: 'broadband-chart',
            prefixField: 'rb',
            title: {
                area: 'broadband trend pamasuka',
                region: 'broadband trend regional: ',
                branch: 'broadband trend branch: ',
                city: 'broadband trend kab/kota: ',
                subdistrict: 'broadband trend kecamatan: ',
                ward: 'broadband trend kelurahan: '
            }
        }, {
            elemId: 'voice-chart',
            prefixField: 'rv',
            title: {
                area: 'voice trend pamasuka',
                region: 'voice trend regional: ',
                branch: 'voice trend branch: ',
                city: 'voice trend kab/kota: ',
                subdistrict: 'voice trend kecamatan: ',
                ward: 'voice trend kelurahan: '
            }
        }, {
            elemId: 'total-chart',
            prefixField: 'rt',
            title: {
                area: 'total trend pamasuka',
                region: 'total trend regional: ',
                branch: 'total trend branch: ',
                city: 'total trend kab/kota: ',
                subdistrict: 'total trend kecamatan: ',
                ward: 'total trend kelurahan: '
            }
        }, {
            elemId: 'rpmb-chart',
            prefixField: 'rpmb',
            title: {
                area: 'rpmb trend pamasuka',
                region: 'rpmb trend regional: ',
                branch: 'rpmb trend branch: ',
                city: 'rpmb trend kab/kota: ',
                subdistrict: 'rpmb trend kecamatan: ',
                ward: 'rpmb trend kelurahan: '
            }
        }
    ]
    // loop over chartLists element
    chartLists.forEach(ele => {
        // highchart instance
        highchartsInstance({
            elementId: ele.elemId,
            prefixField: ele.prefixField,
            response: response.data.data,
            ...queryString(),
            title: ele.title
        })
    });
    // highchart instance
    highchartsVlrSubsInstance({
        elementId: 'site_chart',
        response: responseVlrSubs.data.data,
        ...queryString(),
        title: {
            area: 'payload|traffic|revenue pamasuka',
            region: 'payload|traffic|revenue regional: ',
            branch: 'payload|traffic|revenue branch: ',
            city: 'payload|traffic|revenue kab/kota: ',
            subdistrict: 'payload|traffic|revenue kecamatan: ',
            ward: 'payload|traffic|revenue kelurahan: '
        }
    })
}
// invoke
fetchData()
// click handler on dynamic element
$("div.list-group").on('click', 'a.dropdown-item', function() {
    // invoke
    fetchData()
})
//
$("div.dropdown-menu").on('click', 'button.btn-danger', function() {
    // invoke
    fetchData()
})
