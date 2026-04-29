<template>
    <div class="viz-column">
        <div class="viz-section-header bg-business">
            <i class="bx bx-trending-up viz-header-icon"></i>
            Business Performance
        </div>

        <!-- KPI Mini Cards -->
        <div v-for="kpi in kpiCards" :key="kpi.label" class="kpi-card">
            <div :class="['kpi-icon', kpi.iconBg]">
                <i :class="['bx', kpi.icon]"></i>
            </div>
            <div class="kpi-detail">
                <div class="kpi-label">{{ kpi.label }}</div>
                <div class="kpi-value">{{ kpi.value }}</div>
            </div>
            <span :class="['fw-bold', kpi.tagColor]" style="font-size:0.7rem">{{ kpi.tag }}</span>
        </div>

        <!-- Revenue Mobile (Gross) Table -->
        <div class="card viz-card mt-3">
            <div class="card-header py-2 d-flex align-items-center justify-content-between">
                <h6 class="card-title mb-0" style="font-size:0.8rem">Revenue Mobile (Gross)</h6>
                <span class="update-badge"><i class="bx bx-calendar"></i> Update: 14-Jan-26</span>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-viz">
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>YTD</th>
                                <th>WoW</th>
                                <th>MoM</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in revMobileRows" :key="row.region">
                                <td :class="{ 'fw-bold': row.bold }">{{ row.region }}</td>
                                <td>{{ row.ytd }}</td>
                                <td :class="cellClass(row.wow)">{{ row.wow }}</td>
                                <td :class="cellClass(row.mom)">{{ row.mom }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Revenue NET Table -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">Revenue (NET)</h6>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-viz">
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Cumm*</th>
                                <th>M-1</th>
                                <th>YoP*</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in revNetRows" :key="row.region">
                                <td :class="{ 'fw-bold': row.bold }">{{ row.region }}</td>
                                <td>{{ row.cumm }}</td>
                                <td :class="cellClass(row.m1)">{{ row.m1 }}</td>
                                <td :class="cellClass(row.yop)">{{ row.yop }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Revenue Trend Chart -->
        <div class="card viz-card mt-2">
            <div class="card-body">
                <h6 class="card-title mb-2" style="font-size:0.8rem">Revenue Trend</h6>
                <apexchart
                    type="area"
                    height="120"
                    :options="revTrendOptions"
                    :series="revTrendSeries"
                />
            </div>
        </div>

        <!-- Payload Table -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">Payload (PB)</h6>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-viz">
                        <thead>
                                                        <tr>
                                <th>Region</th>
                                <th>HTTP</th>
                                <th>VoLTE</th>
                                <th>WoW</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in payloadRows" :key="row.region">
                                <td :class="{ 'fw-bold': row.bold }">{{ row.region }}</td>
                                <td>{{ row.http }}</td>
                                <td>{{ row.volte }}</td>
                                <td :class="cellClass(row.wow)">{{ row.wow }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const kpiCards = [
    { label: 'REV ALL', value: '-1.79%', icon: 'bx-dollar-circle', iconBg: 'bg-danger', tag: 'WoW', tagColor: 'text-danger' },
    { label: 'REV BB',  value: '-1.94%', icon: 'bx-broadcast',     iconBg: 'bg-danger', tag: '+5.40%', tagColor: 'text-success' },
    { label: 'REV DIG', value: '-0.06%', icon: 'bx-chip',          iconBg: 'bg-success', tag: '+26.05%', tagColor: 'text-success' },
    { label: 'REV VC',  value: '-1.03%', icon: 'bx-phone-call',    iconBg: 'bg-danger', tag: '-44.53%', tagColor: 'text-danger' },
    { label: 'PAYLOAD', value: '-4.28%', icon: 'bx-data',          iconBg: 'bg-success', tag: '+11.23%', tagColor: 'text-success' },
    { label: 'TRAFFIC', value: '-3.05%', icon: 'bx-transfer',      iconBg: 'bg-success', tag: '+34.63%', tagColor: 'text-success' },
];

const revMobileRows = [
    { region: 'Area 4', ytd: '812 B',  wow: '-1.79%', mom: '-4.52%', bold: true },
    { region: 'KAL',    ytd: '317 B',  wow: '-1.87%', mom: '-3.91%', bold: false },
    { region: 'SUL',    ytd: '351 B',  wow: '-0.87%', mom: '-4.10%', bold: false },
    { region: 'PUM',    ytd: '144 B',  wow: '-3.61%', mom: '-6.55%', bold: false },
];

const revNetRows = [
    { region: 'Area 4', cumm: '1,653', m1: '-0.6%', yop: '3.1%', bold: true },
    { region: 'KAL',    cumm: '627',   m1: '-0.1%', yop: '1.4%', bold: false },
    { region: 'SUL',    cumm: '701',   m1: '-0.3%', yop: '5.0%', bold: false },
    { region: 'PUM',    cumm: '325',   m1: '-1.6%', yop: '3.8%', bold: false },
];

const payloadRows = [
    { region: 'Area 4', http: '156 PB',  volte: '21.0%', wow: '2.5%',  bold: true },
    { region: 'KAL',    http: '62.0 PB', volte: '13.8%', wow: '0.6%',  bold: false },
    { region: 'SUL',    http: '72.7 PB', volte: '19.5%', wow: '10.1%', bold: false },
    { region: 'PUM',    http: '21.2 PB', volte: '4.83%', wow: '1.1%',  bold: false },
];

function cellClass(val) {
    if (!val) return '';
    return parseFloat(val) >= 0 ? 'text-positive' : 'text-negative';
}

const revTrendSeries = [
    { name: 'Revenue', data: [812, 825, 798, 830, 815, 845, 812] },
];

const revTrendOptions = {
    chart: {
        type: 'area',
        height: 120,
        sparkline: { enabled: true },
        fontFamily: "'Public Sans', sans-serif",
        toolbar: { show: false },
    },
    stroke: { width: 2, curve: 'smooth' },
    fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 90, 100] },
    },
    colors: ['#d32f2f'],
    tooltip: {
        fixed: { enabled: false },
        y: { formatter: (v) => v + ' B' },
    },
};
</script>