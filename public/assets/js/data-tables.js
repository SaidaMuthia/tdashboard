// data table
function dataTables(idx, e, tBodyEle, dropdownToggle = true, listColumn = []) {
    const dropdownMenu = `<div class="dropdown">
            <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <div class="dropdown-menu p-sm-4">
                <div class="card__modal">
                    <div class="card__modal_content>
                        <h6 class="card__modal_title">Site ID: <b>LWK237</b></h6>
                        <form class="card__modal_form mb-3">
                            <select class="form-control my-2" name="">
                                <option value="network">Network</option>
                                <option value="sales">Sales</option>
                            </select>
                            <textarea class="form-control mb-2" name="comment"></textarea>
                            <button type="button" class="btn btn-primary btn-xs" data-text="save">Save</button>
                        </form>
                        <div class="card__modal_logs">
                            <div>Log: </div>
                            <div class="user_comment">
                                <small><i>by <b>okihae</b></i></small>
                                <div class="divider mt-1" role="separator"></div>
                            </div>
                            <div class="card__modal_log_current_user">
                                <div class="mt-2" role="by-user" style="max-height: 245px;overflow-y: auto"></div>
                            </div>
                            <div class="card__modal_log_guest_user">
                                <div class="mt-2" role="no-user" style="max-height: 295px;overflow-y: auto"></div>
                            </div>
                        </div>
                </div>
            </div>
        </div>`

    const columns = [
        "no",
        "SITE ID",
        "SITE NAME",
        "REGION",
        "BRANCH",
        "CLUSTER",
        "KAB",
        "SITE FLAG",
        "conndate",
        "aging",
        "TYPE INFRA",
        "avg_rev",
        "avg_payload",
        "avg_traffic",
        "max_rev",
        "max_payload",
        "max_traffic",
        "sum_rev",
        "sum_payload",
        "sum_traffic",
        "avg_vlr_subs",
        "4g_cap_util_site",
        "distribution_pl",
        "availability",
        "band",
        "prb",
        "avg_dl",
        "max_dl",
        "avg_ul",
        "max_ul",
        "rs <1.5km",
        "rs 1.5 - 3km",
        "rs >3 - 5km",
        "network_capacity_status",
    ];
    // create table row
    const tr = $("<tr></tr>")
    // loop through columns name
    columns.forEach(function (ele) {
        // create table cell
        const td = $("<td></td>")
        // assign data to table cell '<td></td>'
        // console.log('ele', ele)
        if (ele == 'SITE ID' && dropdownToggle) {
            td.attr('style', 'display: flex;justify-content: space-between;')
            td.text(e[ele])
            td.append(dropdownMenu)
        }
        else { td.text(e[ele]) }
        // append table cell to table row
        tr.append(td)
    })
    // append table row
    tBodyEle.append(tr)
}

export default dataTables
