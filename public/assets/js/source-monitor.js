//
let origin = window.location.origin
let uri = '/new-ictpamasuka/api-test/source-monitor-db'
//
const clientIctPamasuka = axios.create({
    baseURL: ictpamasukaPath
})
//
const configIctPamasuka = {
    headers: {
        "Accept": "application/json"
    }
}
//
const fetchIctPamasuka = async function () {
    //
    const { data: response } = await clientIctPamasuka.get('/source-monitor-db', { ...configIctPamasuka })
    // define element letiable
    let sourceMonitorTableBody = $("#source-monitor-rows-1")
    let sourceMonitorInfo = $("span.badge")
    // clear child element
    sourceMonitorTableBody.html('')
    sourceMonitorInfo.text(response.info)
    // loop over
    $.each(response.data, function (i, e) {
        // append to table row
        sourceMonitorTableBody.append(`
            <tr>
                <td>
                    <i class="bx bx-data bx-md text-danger me-4"></i>
                    <span>${ e.table_name }</span>
                </td>
                <td>${ e.lastupdate }</td>
            </tr>
        `)
    })
}
// invoke
fetchIctPamasuka()
