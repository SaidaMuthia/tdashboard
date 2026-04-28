// data table
function dataTables(idx, e, tBodyEle, dropdownToggle = true) {
    var dropdownMenu = `<div class="dropdown">
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
    // table
    // append table row
    tBodyEle.append(`
        <tr>
            <td>${ e['no'] }</td>
            <td style="display: flex;justify-content: space-between">
                ${ e['SITE ID'] }
                ${ dropdownToggle ? dropdownMenu : '' }
            </td>
            <td>${ e['SITE NAME'] }</td>
            <td>${ e['REGION'] }</td>
            <td>${ e['BRANCH'] }</td>
            <td>${ e['CLUSTER'] }</td>
            <td>${ e['KAB'] }</td>
            <td>${ e['SITE FLAG']}</td>
            <td>${ e['conndate'] }</td>
            <td>${ e['aging'] }</td>
            <td>${ e['TYPE INFRA'] }</td>
            <td>${ e['avg_rev'] }</td>
            <td>${ e['avg_payload'] }</td>
            <td>${ e['avg_traffic'] }</td>
            <td>${ e['max_rev'] }</td>
            <td>${ e['max_payload'] }</td>
            <td>${ e['max_traffic'] }</td>
            <td>${ e['sum_rev'] }</td>
            <td>${ e['sum_payload'] }</td>
            <td>${ e['sum_traffic'] }</td>
            <td>${ e['avg_vlr_subs'] }</td>
            <td>${ e['4g_cap_util_site'] }</td>
            <td>${ e['distribution_pl'] }</td>
            <td>${ e['availability'] }</td>
            <td>${ e['band'] }</td>
            <td>${ e['prb'] }</td>
            <td>${ e['avg_dl'] }</td>
            <td>${ e['max_dl'] }</td>
            <td>${ e['avg_ul'] }</td>
            <td>${ e['max_ul'] }</td>
            <td>${ e['rs <1.5km'] }</td>
            <td>${ e['rs 1.5 - 3km'] }</td>
            <td>${ e['rs >3 - 5km'] }</td>
            <td>${ e['network_capacity_status'] }</td>
        </tr>
    `)
}

export default dataTables
