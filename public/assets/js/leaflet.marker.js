function iconMarkerLayer(data, remark, markerPath) {
    return L.layerGroup(data.filter(function (ele) {
            return ele.remark == remark
        }).map(function(ele) {
            return L.marker([ele.latitude_op, ele.longitude_op], {
                icon: L.icon({
                    iconUrl:'assets/css/images/' + markerPath,
                    iconSize: [25, 41],
                    shadowUrl:'assets/css/images/marker-shadow.png',
                    shadowSize: [35, 51],
                    shadowAnchor: [10, 30]
                })
            }).bindTooltip(`
                <div>Provider: ${ele.provider}<div>
                <div>Site Operator: ${ele.site_op}</div>
                <div>Class: ${ele.remark}</div>
                <div>Distance (KM): ${ele.distance_km}</div>
            `)
        }))
}


export default iconMarkerLayer
