//
const generateLayerGroupWithCityGeoJSON = function (data) {
    // geoJSON layer
    return L.geoJSON(data, {
        style: {
            fillColor: '#333333',
            fillOpacity: .1,
            color: '#d80606',
            opacity: .8,
            weight: 3,
            dashArray: '1, 5'
        },
        onEachFeature: function(feature, layer) {
            layer.bindTooltip(`
                <div style="font-size:14px">
                    <div>Province : ${feature.properties.province}<div>
                    <div>City : ${feature.properties.city}<div>
                </div>
            `)
        }
    })
}
//
const generateLayerGroupWithgeoJSON = function (data) {
    // geoJSON layer
    return L.geoJSON(data, {
        style: function (feature) {
            // style options
            let styleOptions = {
                    color: "#000",
                    weight: 1,
                    opacity: .5,
                    fillOpacity: .9
            }
            // assign feature property to named variable
            ,   operatorLists = feature.properties.operator_list
            // check operator
            if (operatorLists.includes('|')){
                if (! operatorLists.includes('Telkomsel')) {
                    styleOptions['fillColor'] = "#000102"
                } else {
                    styleOptions['fillColor'] = "#807f7e"
                }
            } else {
                switch(operatorLists) {
                    case '3':
                            styleOptions['fillColor'] = "#891f8d"
                        break;
                    case 'Indosat Ooredoo':
                    case 'IOH' :
                            styleOptions['fillColor'] = "#fdff03"
                        break
                    case 'Smartfren':
                    case 'SF':
                            styleOptions['fillColor'] = "#fc2efb"
                        break;
                    case 'XL':
                            styleOptions['fillColor'] = "#191afa"
                        break;
                    case 'IOH-XL-SF':
                            styleOptions['fillColor'] = "#fb5607"
                        break;
                    case 'IOH-XL':
                            styleOptions['fillColor'] = "#0f4c5c"
                        break;
                    case 'IOH-SF':
                            styleOptions['fillColor'] = "#8338ec"
                        break;
                    case 'XL-SF':
                            styleOptions['fillColor'] = "#3a86ff"
                        break;
                    case 'Telkomsel':
                            styleOptions['fillColor'] = "#fa0105"
                        break;
                }
            }
            // return style options
            return styleOptions
        },
        onEachFeature: function(feature, layer) {
            if (feature.properties.grid19 === undefined) {
                layer.bindTooltip(`
                    <div style="font-size:14px">
                        <center>geohash :<b> ${feature.properties.geohash7}</b></center>
                        <div>Yearweek : ${feature.properties.yearweek}<div>
                        <div>Operator : ${feature.properties.operator_list}<div>
                        <div>Sample : ${feature.properties.sample_list}</div>
                        <div>Nearest Site : ${feature.properties.site_id}</div>
                        <div>Distance in Meters : ${feature.properties.distance_meters}</div>
                    </div>
                `)
            } else {
                layer.bindTooltip(`
                    <div style="font-size:14px">
                        <center>geohash :<b> ${feature.properties.grid}</b></center>
                        <div>Kabupaten : ${feature.properties.kabupaten}<div>
                        <div>Latitude : ${feature.properties.latitude}<div>
                        <div>Longitude : ${feature.properties.longitude}<div>
                        <div>Telkomsel : ${feature.properties.grid_tsel}<div>
                        <div>Indosat Ooredoo : ${feature.properties.grid_ioh}<div>
                        <div>XL : ${feature.properties.grid_xl}<div>
                        <div>Smartfren : ${feature.properties.grid_sf}<div>
                        <div>Operator List: ${feature.properties.operator_list}<div>
                    </div>
                `)
            }
        }
    })
}
//
const generateLayerGroupWithCircleMarker = function (data) {
    return L.layerGroup(data.map(function(ele) {
        return L.circle([ele.latitude_op, ele.longitude_op], {
                color: 'black',
                fillColor: '#f03',
                fillOpacity: 1,
                weight: 3,
                radius: 75
            }).bindTooltip(`
                <div style="font-size:14px">
                    <center>siteID :<b> ${ele.site_id}</b></center>
                    <div>4g_cap_util_site : ${ele['4g_cap_util_site']}<div>
                    <div>Red Sector : ${ele.redsector_notation}</div>
                    <div>Profitability : ${ele.marginfull_notation}</div>
                </div>
            `)
    }))
}
//
const generateLayerGroupWithGridMarker = function (data) {
    //
    $markerLists = data.map(function (ele) {
        //
        let classIcon = 'white'
        //
        switch(ele['Competitor Operator']) {
            case 'IOH-XL-SF':
                classIcon = 'ioh-xl-sf'
                break
            case 'IOH-XL':
                classIcon = 'ioh-xl'
                break
            case 'IOH-SF':
                classIcon = 'ioh-sf'
                break
            case 'XL-SF':
                classIcon = 'xl-sf'
                break
            case 'IOH':
                classIcon = 'ioh'
                break
            case 'XL':
                classIcon = 'xl'
                break
            case 'SF':
                classIcon = 'sf'
                break
        }
        //
        let icon = L.divIcon({
            iconSize: [20, 20],
            className: `marker__operator-wrap ${classIcon}`
        })
        //
        return L.marker([ele['Latitude'], ele['Longitude']], { icon: icon })
            .bindTooltip(`
                <div style="font-size:14px">
                    <center>Grid<b> ${ele['Grid']}</b></center>
                    <div>Yearweek : ${ele['Yearweek']}</div>
                    <div>Competitor Operator : ${ele['Competitor Operator']}<div>
                    <div>Kabupaten : ${ele['Kabupaten']}</div>
                    <div>Latitude : ${ele['Latitude']}</div>
                    <div>Longitude : ${ele['Longitude']}</div>
                </div>
            `)
    })
    // return marker within Layer Group
    return L.layerGroup($markerLists)
}
// function generate marker with icon
const generateLayerGroupWithMarker = function (data, marker_icon = 'outlier_marker', other = undefined) {
    return L.layerGroup(data.map(function(ele) {
        var icon = ele.site_id != other
            ?
                L.icon({
                    iconUrl:`assets/img/icons/markers/${marker_icon}.png`,
                    // iconSize: [25, 41],
                    iconSize: [18, 30],
                    shadowUrl:'assets/img/icons/markers/marker-shadow.png',
                    shadowSize: [35, 51],
                    // shadowAnchor: [10, 30]
                    shadowAnchor: [13, 35]
                })
            :
                // icon with custom css
                L.divIcon({
                    className: 'marker__operator-icon marker__operator-icon--animated',
                    iconSize: [18, 30]
                })
        //
        return L.marker([ele.latitude_op, ele.longitude_op], { icon: icon })
                .bindTooltip(`
                    <div style="font-size:14px">
                        <center>siteID :<b> ${ele.site_id}</b></center>
                        <div>4g_cap_util_site : ${ele['4g_cap_util_site']}<div>
                        <div>Red Sector : ${ele.redsector_notation}</div>
                        <div>Profitability : ${ele.marginfull_notation}</div>
                    </div>
                `)
            // .bindTooltip(`
            //     <div style="font-size:14px">
            //         <div>Provider: ${ele.provider}<div>
            //         <div>Site Operator: ${ele.site_op}</div>
            //         <div>Class: ${ele.remark}</div>
            //     </div>
            // `)
        })
    )
}
//
const generateCoverageShareMap = function ({ layerGroup, center = [-4.011167313278849, 119.62733298444172], zoom = '13', layerDefault = [], eleID = 'map-single-1' }) {
    // set tile layer
    var baseLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
    // map single
    var map = L.map(eleID, {
            zoomControl: false,
            layers: [baseLayer].concat(layerDefault)
        })
        .setView(center, zoom)
    // layers control
    L.control.layers(
    {
        "<span style=\"color: black;font-size: x-small;\">OpenStreet Map</span>": baseLayer
    },
    layerGroup,
    {
        "position": "bottomleft"
    }).addTo(map)
    // zoom control
    if (eleID == 'map-single-1'){
        L.control.zoom({
            "position": "bottomleft"
        }).addTo(map)
    }
    // return leaflet object
    return map
}
/**
 *  Fetches and caches grid data for a given city and yearweek.
 *  @param {string} cityName - The name of the city (default: "KOTA MAKASSAR").
 *  @param {string} yearweek - The year and week in YYYYWW format (default: "202529").
 *  @returns {Promise<Object>} The grid data for the specified city and yearweek.
*/
const gridCities = async function (cityName="KOTA MAKASSAR", yearweek="202529") {
    // Normalize city name: lowercase and remove hyphens/spaces for consistent keying
    let cityNameLoc = cityName.toLowerCase().replace(/[- ]/gm, '')
    // Create a unique key for the city and yearweek grouping
    let cityYearweekProp = cityNameLoc + yearweek
    // check unique city-yearweek key in globalThis.citiesGrid
    if (! (cityYearweekProp in globalThis.citiesGrid)) {
        // fetch grid data from api and specified length threshold
        let gridData = await client.get("/coverage-share/grid/city", { ...config, "params" : { "city" : cityName.toUpperCase(), yearweek }})
        let gridDataLength = (new TextEncoder().encode(JSON.stringify(gridData.data))).length / 1024
        // check length threshold before caching
        if (gridDataLength >= 750) {
            // cache grid data in globalThis.citiesGrid
            globalThis.citiesGrid[cityYearweekProp] = gridData
        }
        // return the fetched grid data
        return gridData
    } else {
        // return the cached grid data
        return globalThis.citiesGrid[cityYearweekProp]
    }
}
// global variable
globalThis.citiesGrid = {}
//
let mapLeaflet
,   mapLeafletMirror
,   cities = []
// declare jquery object element variable
,   inputTextEle = $("#name-city-id-1")
// init data
const firstLoaded = async function() {
    //
    let currYearweek = $("#current-yearweek")
    let mirrYearweek = $("#mirror-yearweek")
    let defaultCityName = "KOTA PARE-PARE"
    //
    let { data: { data: firstGridCity, yearweek: currentYearweek }} = await gridCities(defaultCityName, '202540')
    let { data: { data: firstSiteLocation } } = await client.get("/coverage-share/grid/site-location", { ...config, "params": { "city": defaultCityName } })
    let { data: { data: yearweek } } = await client.get("/coverage-share/list/yearweek", { ...config })
    // let { data: { data: competitorOperator } } = await client.get("/coverage-share/grid/city/competitor-operator", { ...config })
    let { data: { data: cityBorder } } = await client.get("/coverage-share/grid/city/border", { ...config, "params": { "city": defaultCityName } })
    let { data: { data: compOnlyPamasuka } } = await client.get("/coverage-share/grid/comp-only-pamasuka", { ...config })
    // parse geoJSON Object
    let firstGridCityEleParse = firstGridCity.map(ele => JSON.parse(ele))
    // let competitorOperatorParse = competitorOperator.map(ele => JSON.parse(ele))
    let cityBorderParse = cityBorder.map(ele => JSON.parse(ele))
    // set text to current yearweek element object
    currYearweek.first().text(currentYearweek)
    // console.log('current Yearweek', )
    console.log('current Yearweek', currYearweek.eq(0).text())
    //
    $.each(yearweek, function (idx, ele) {
        let list = $("<li></li>")
        let anchor = $("<a></a>")
        // set attribute
        anchor.attr({
            "href": "javascript:void(0)",
            "class": "dropdown-item"
        })
        anchor.text(ele)
        // append to list
        list.append(anchor)
        // set content
        currYearweek.next().children().append(list)
    })
    // ,   yearweekElementCurrent = document.getElementById('current-yearweek-map')
    // ,   yearweekElementMirror = document.getElementById('mirror-yearweek-map')
    // // initial yearweek
    // yearweekElementCurrent.innerText = firstGridCityEleParse[0].properties.yearweek
    // yearweekElementMirror.innerText = firstGridCityEleParse[0].properties.yearweek
    //
    let firstInitLeafletMap = function (selectedLeafletMap = 'single') {
        // grid Tutela
        let gridTutela = generateLayerGroupWithgeoJSON(firstGridCityEleParse)
        // competitor Operator
        // let gridCompetitorOperator = generateLayerGroupWithgeoJSON(competitorOperatorParse)
        // city border
        let gridCityBorder = generateLayerGroupWithCityGeoJSON(cityBorderParse)
        // site Location
        // var siteTselLocation = generateLayerGroupWithCircleMarker(firstSiteLocation.data)
        let siteTselLocation = generateLayerGroupWithMarker(firstSiteLocation, 'telkomsel_marker')
        let compOnlyPamasukaGrid = generateLayerGroupWithGridMarker(compOnlyPamasuka)
        // layer group
        let layerGroup = {
            "<span style=\"color: black;font-size: x-small;\">Grid Tutela</span>" : gridTutela,
            // "<span style=\"color: black;font-size: x-small;\">Competitor Operator</span>" : gridCompetitorOperator,
            // "<span style=\"color: black;font-size: x-small;\">City Border</span>" : gridCityBorder,
            "<span style=\"color: black;font-size: x-small;\">Comp Only Pamasuka</span>" : compOnlyPamasukaGrid,
            "<span style=\"color: black;font-size: x-small;\">Site TSel</span>" : siteTselLocation
        }
        // checking leaflet map in single view mode
        if (selectedLeafletMap == 'single') {
            // remove old leaflet map object
            if (mapLeaflet != undefined) {
                mapLeaflet.remove()
            }
            // generate leaflet maps
            mapLeaflet = generateCoverageShareMap({
                layerGroup,
                layerDefault: [ gridCityBorder, gridTutela ]
                // layerDefault: [ gridCompetitorOperator ]
            })
            // sync zoom and move event on both map
            mapLeaflet.on("moveend zoomend", function (e) {
                let zoom = mapLeaflet.getZoom()
                let center = mapLeaflet.getCenter()
                // mapLeafletMirror.setView(center, zoom)
            })
        } else {
            // remove old leaflet map object
            // if (mapLeafletMirror != undefined) {
            //     mapLeafletMirror.remove()
            // }
            // // generate leaflet maps
            // mapLeafletMirror = generateCoverageShareMap({
            //     layerGroup,
            //     layerDefault: [ gridTutela ],
            //     eleID: 'map-mirror-1'
            // })
        }
    }
    // initialize leaflet map
    firstInitLeafletMap()
    // firstInitLeafletMap('mirror')
}
// invoke
firstLoaded()
/**
 *
 *  Debounce function to limit the rate at which a function can fire.
 *
 *  @param {Function} func - The function to debounce
 *  @param {number} delay - The delay in milliseconds
 *  @returns {Function} - A debounced version of the input function
 */
const debounce = function (func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args) , delay)
    }
}
/**
 *
 * show usage information
 *
 * @returns {string} usage information in HTML string
 *
*/
const usageInfo = function () {
    // HTML string
    return `
        <div class="list-group-item list-group-item-action flex-column align-items-start">
            <h6 class="mb-1">Pattern</h6>
            <p class="mb-1">
                LONGLAT:{LATITUDE},{LONGITUDE}#RADIUS:{NUMBER}km
            </p>
            <div class="list-group my-3">
                <div class="list-group-item list-group-item-action active"><strong>Example:</strong></div>
                <div class="list-group-item list-group-item-action">LONGLAT: -5.144963253269966, 119.49045698607804 # RADIUS: 5km</div>
            </div>
        </div>
        <div class="list-group-item list-group-item-action flex-column align-items-start">
            <h6 class="mb-1">Pattern</h6>
            <p class="mb-1">
                SITEID:{SITEID}
            </p>
            <div class="list-group my-3">
                <div class="list-group-item list-group-item-action active"><strong>Example:</strong></div>
                <div class="list-group-item list-group-item-action">SITEID:UPD026</div>
            </div>
        </div>`
}
/**
*
*  function to handle item active element on click event from dropdown list
*
*  @param {object} eleObj - element object from dropdown list
*  @param {string} valueType - type of value input, default is cityName, other option is longlat
*  @returns {void}
*
*/
const itemActive = function (eleObj, valueType = "cityName") {
    // declare variables
    let inputValue = eleObj.text
    let inputValueZoom = valueType === 'longlat' ? 17 : 11
    let inputValueLonglat = JSON.stringify(eleObj.dataset).length === 2 ? undefined : [eleObj.dataset.latitude, eleObj.dataset.longitude]
    console.log("inputValueLongLat", inputValueLonglat)
    // set value for inputText element
    let preText = eleObj.dataset.field == 'siteid' ? 'SITEID: ' : ''
    inputTextEle.val(`${preText}${inputValue}`)
    // async function to fetch / cache city grid data from API
    const fetchCitiesGrid = async function (name, longlat = undefined) {
        let cityGrid
        let coordinatMarker
        let circleMarker
        let extendMarker = {}
        // check if longlat parameter is defined
        if (longlat != undefined && ! name.toLowerCase().includes("longlat")) {
            // get city name by site id
            let { data: { data: [ { city: cityName } ] }} = await client.get("/coverage-share/city/siteid/" + name, { ...config })
            // set new value to name
            name = cityName
        }
        //
        if (name.toLowerCase().includes("longlat")) {
            //
            let getLongLat = name.match(/(-?[0-9]+.?[0-9]+)|\d/gis)
            let getLatitude = getLongLat[0] != undefined ? getLongLat[0] : -5.144963253269966
            let getLongitude = getLongLat[1] != undefined ? getLongLat[1] : 119.432964
            let getRadiusKm = getLongLat[2] != undefined ? getLongLat[2] : 5
            //
            let { data: { data: getCityByLongLat } }  = await client.get(`/coverage-share/city/latitude/${getLatitude}/longitude/${getLongitude}`, { ...config } )
            let { data: { data: cityGridRadius } } = await client.get("/coverage-share/grid/city/radius", { ...config, "params": { latitude: getLatitude, longitude: getLongitude, radius: getRadiusKm } } )
            //
            circleMarker = L.circle([getLatitude, getLongitude], {
                radius: getRadiusKm * 1000,
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.1,
                weight: 2
            }).bindTooltip(`<div style="font-size:14px;"><b>Radius in ${getRadiusKm} km</b></div>`)
            //
            coordinatMarker = L.marker([getLatitude, getLongitude], {
                icon: L.icon({
                    iconUrl:`assets/img/icons/markers/marker-icon.png`,
                    iconSize: [18, 30],
                    shadowUrl:'assets/img/icons/markers/marker-shadow.png',
                    shadowSize: [35, 51],
                    shadowAnchor: [13, 35]
                })
            })
            //
            extendMarker = {
                "<span style=\"color: black;font-size: x-small;\">Longlat Radius</span>": circleMarker,
                "<span style=\"color: black;font-size: x-small;\">Coordinate</span>": coordinatMarker
            }
            //
            cityGrid = cityGridRadius
            console.log("getCityByLongLat", getCityByLongLat)
            console.log("getCityGridByRadius", cityGrid)
            // assign to name param
            name = getCityByLongLat
        } else {
            let { data: { data: cityGridFetchCache } } = await gridCities(name)
            //
            cityGrid = cityGridFetchCache
        }
        // object destructuring assignment to get city longlat, site location, and city grid data
        let { data: { data: cityLongLat } } = await client.get("/coverage-share/long-lat/city/" + name, { ...config })
        let { data: { data: siteLocation } } = await client.get("/coverage-share/grid/site-location", { ...config, "params" : { city: name } })
        let { data: { data: cityBorder } } = await client.get("/coverage-share/grid/city/border", { ...config, "params": { city: name } })
        let { data: { data: compOnlyPamasuka } } = await client.get("/coverage-share/grid/comp-only-pamasuka", { ...config })
        // parse city grid data from string to object
        let gridCityEleParse = cityGrid.map((ele) => JSON.parse(ele))
        let gridCityBorderParse = cityBorder.map(ele => JSON.parse(ele))
        // declare leafletMapInitial function to re-initialize leaflet map
        const leaflatMapInitial = function (leafletMapMode = "single", center = undefined, zoom = 11) {
            // declare centerLongLat variable to set map center
            let centerLongLat = center != undefined ? center : [ cityLongLat.latitude, cityLongLat.longitude ]
            // declare gridTutela variable to generate grid layer group from geoJSON data
            let gridTutela = generateLayerGroupWithgeoJSON(gridCityEleParse)
            // declare siteTselLocation variable to generate marker layer group from site location data
            let siteTselLocation = generateLayerGroupWithMarker(siteLocation, "telkomsel_marker", valueType == "longlat" ? inputValue : undefined)
            let compOnlyPamasukaGrid = generateLayerGroupWithGridMarker(compOnlyPamasuka)
            //
            let cityBorder = generateLayerGroupWithCityGeoJSON(gridCityBorderParse)
            //
            let layerGroup = {
                "<span style=\"color: black;font-size: x-small;\">Grid Tutela</span>" : gridTutela,
                // "<span style=\"color: black;font-size: x-small;\">City Border</span>" : cityBorder,
                "<span style=\"color: black;font-size: x-small;\">Comp Only Pamasuka</span>" : compOnlyPamasukaGrid,
                ...extendMarker,
                "<span style=\"color: black;font-size: x-small;\">Site TSel</span>" : siteTselLocation
            }
            let siteLocationDefault = valueType == "longlat" ? siteTselLocation : []
            // default layer
            let layerDefault = [ cityBorder, gridTutela ]
            //
            if (circleMarker != undefined) {
                layerDefault.unshift(circleMarker)
            }
            if (coordinatMarker != undefined) {
                layerDefault.push(coordinatMarker)
            }
            //
            if (inputTextEle.val().toLowerCase().includes("siteid:")) {
                layerDefault.push(siteTselLocation)
            }
            // check leafletMapMode parameter to determine which map to initialize or update
            if (leafletMapMode == "single") {
                // remove existing map instance if it exists
                if (mapLeaflet != undefined) {
                    mapLeaflet.remove()
                }
                // re-initialize map
                mapLeaflet = generateCoverageShareMap({
                    layerGroup,
                    center: centerLongLat,
                    zoom,
                    layerDefault
                })
                // add event listener to update mirror map on moveend and zoomend events
                mapLeaflet.on("moveend zoomend", function (eventObj) {
                    let zoom = mapLeaflet.getZoom()
                    let center = mapLeaflet.getCenter()
                    // update mirror map view
                    // mapLeafletMirror.setView(center, zoom)
                })
            } else {
                // remove existing mirror map instance if it exists
                if (mapLeafletMirror != undefined) {
                    mapLeafletMirror.remove()
                }
                // re-initialize mirror map
                mapLeafletMirror = generateCoverageShareMap({
                    layerGroup,
                    center: centerLongLat,
                    zoom,
                    layerDefault,
                    eleID: "map-mirror-1"
                })
            }
        }
        // invoke leafletMapInitial function to re-initialize leaflet map with new data
        leaflatMapInitial("single", longlat, inputValueZoom)
        // leaflatMapInitial("mirror", longlat, inputValueZoom)
    }
    // invoke fetchCitiesGrid function to fetch / cache city grid data from API
    fetchCitiesGrid(inputValue, inputValueLonglat)
}
// add keyup's event listener on search text
$("#name-city-id-1").on("keyup", debounce(function (obj) {
    // console.log("event object", obj)
    let cityNameUpper = obj.target.value.toUpperCase()
    ,   listGroupEle = $("#list-group-list-1")
    ,   anchorEle = ''
    //
    const eleCreateAppend = function (ele, iconClassName) {
        // create element
        anchorEle = $("<a></a>")
        iconEle = $("<i></i>")
        listEle = $("<li></li>")
         // set attributes
        iconEle.attr("class", `icon-base bx ${iconClassName} me-2`)
        listEle.attr("class", "list-group-item list-group-item-action")
         // append to anchor element
        anchorEle.append(iconEle)
        //
        if (typeof ele === "object") {
        // if (obj.target.value.toLowerCase().includes("siteid:") === true) {
            anchorEle.attr("data-latitude", ele.sitelat)
            anchorEle.attr("data-longitude", ele.sitelong)
            anchorEle.attr("data-field", "siteid")
            anchorEle.append(ele.site_id)
        } else if (obj.target.value.toLowerCase().includes("longlat:")) {
            let getLongLat = obj.target.value.toLowerCase().match(/(-?[0-9]+.?[0-9]+)|\d/gis)
            let getLatitude = getLongLat[0] != undefined ? getLongLat[0] : -5.144963253269966
            let getLongitude = getLongLat[1] != undefined ? getLongLat[1] : 119.432964
            //
            anchorEle.attr("data-latitude", getLatitude)
            anchorEle.attr("data-longitude", getLongitude)
            anchorEle.attr("data-field", "longlat")
            anchorEle.append(obj.target.value.toUpperCase())
        } else {
            //
            anchorEle.append(ele)
        }
        //
        anchorEle.attr("onclick", obj.target.value.toLowerCase().match(/longlat:|siteid:/gis) ? "itemActive(this, 'longlat')" : "itemActive(this)")
        // append to list item
        listEle.append(anchorEle)
        // append to list group element
        listGroupEle.append(listEle)
    }
    //
    const fetchSiteCities = async function () {
        // empty content of list group element
        listGroupEle.html("")
        //
        console.log("obj.key", obj.key)
        console.log("obj.keyCode", obj.keyCode)
        //
        if (obj.target.value.toLowerCase().includes("siteid:") === true
            && obj.target.value.toLowerCase().match(/[^siteid:\s][a-z0-9]*/gs) !== null) {
            //
            siteId = obj.target.value.toLowerCase().match(/[^siteid:\s][a-z0-9]*/gs)[0]
            //
            if (globalThis.sites === undefined) {
                let { data: { data: sites } } = await client.get("/coverage-share/list/site", { ...config })
                // set variable global with globalthis
                globalThis.sites = sites
                sitesFilter = sites.filter(function (ele) {
                    return ele.site_id.toLowerCase().includes(siteId)
                })
            } else {
                sitesFilter = globalThis.sites.filter(function (ele) {
                    return ele.site_id.toLowerCase().includes(siteId)
                })
                //
                console.log('no sending request', sitesFilter)
            }
            // loop data
            $.each(sitesFilter, function (idx, ele) {
                eleCreateAppend(ele, "bx-broadcast")
            })
        }
        //
        else if (obj.target.value.toLowerCase().includes("longlat:")) {
            // search pattern contain longlat keyword
            eleCreateAppend(obj.target.value, "bxs-map-pin")
        }
        else if (obj.target.value.toLowerCase().includes("usage")) {
            //
            listGroupEle.html(usageInfo())
        }
        else {
            //
            if (globalThis.cities === undefined) {
                // object destructuring
                let { data : { data : cities } } = await client.get("/coverage-share/list/city", { ...config })
                // set global variable with globalThis
                globalThis.cities = cities
                // cities filter by city name
                citiesFilter = cities.filter(function (ele) {
                    return ele.includes(cityNameUpper)
                })
            } else {
                citiesFilter = globalThis.cities.filter(function (ele) {
                    return ele.includes(cityNameUpper)
                })
            }
            // loop data
            $.each(citiesFilter, function (idx, ele) {
                eleCreateAppend(ele, "bxs-city")
            })
            // console.log('inside asybc cityFilter', globalThis.cities)
        }
    }
    // invoke
    fetchSiteCities();
    //
    console.log('outside async cityFilter', globalThis.cities)
    console.log('outside async sitesFilter', globalThis.sites)
    console.log('cityName upper', cityNameUpper)
} , 800)) //ms
// perfect scrollbar
new PerfectScrollbar(document.getElementById("current-yearweek-list-1"), { wheelPropagation: false })
new PerfectScrollbar(document.getElementById("list-group-1"), { wheelPropagation: false })
