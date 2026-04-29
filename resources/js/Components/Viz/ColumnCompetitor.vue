<template>
    <div class="viz-column">
        <div class="viz-section-header bg-competitor">
            <i class="bx bx-group viz-header-icon"></i>
            Competitor &amp; Market
        </div>

        <!-- Market Share Stacked Bar (HTML) -->
        <div class="stacked-bar">
            <div v-for="seg in marketShareBar" :key="seg.label"
                class="bar-segment"
                :style="{ width: seg.pct, background: seg.color, fontSize: seg.small ? '0.5rem' : undefined }">
                {{ seg.label }}
            </div>
        </div>

        <!-- SDN Table -->
        <div class="card viz-card">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">
                    <i class="bx bx-signal-5 me-1"></i>SDN
                </h6>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-viz">
                        <thead>
                            <tr>
                                <th>#Subs</th>
                                <th>Dev All</th>
                                <th>USIM</th>
                                <th>SIM</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in sdnRows" :key="row.label">
                                <td :class="{ 'fw-bold': row.bold }">{{ row.label }}</td>
                                <td>{{ row.devAll }}</td>
                                <td>{{ row.usim }}</td>
                                <td>{{ row.sim }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Market Share Chart -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">
                    Market Share <small class="text-muted">W52</small>
                </h6>
            </div>
            <div class="card-body">
                <apexchart type="bar" height="220"
                    :options="marketShareOptions"
                    :series="marketShareSeries" />
            </div>
        </div>

        <!-- Competition Index Chart -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">
                    Competition Index <small class="text-muted">W52</small>
                </h6>
            </div>
            <div class="card-body">
                <apexchart type="bar" height="220"
                    :options="compIndexOptions"
                    :series="compIndexSeries" />
            </div>
        </div>

        <!-- Competition Index Table -->
        <div class="card viz-card mt-2">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-viz">
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Jan-24</th>
                                <th>Dec-23</th>
                                <th>Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in compIndexRows" :key="row.region">
                                <td :class="{ 'fw-bold': row.bold }">{{ row.region }}</td>
                                <td>{{ row.jan24 }}</td>
                                <td>{{ row.dec23 }}</td>
                                <td :class="cellClass(row.trend)">{{ row.trend }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const marketShareBar = [
    { label: '62.39%', pct: '62.39%', color: '#d32f2f', small: false },
    { label: '26.65%', pct: '26.65%', color: '#f9a825', small: false },
    { label: '13.05%', pct: '13.05%', color: '#1565c0', small: false },
    { label: '3.77%',  pct: '3.77%',  color: '#6a1b9a', small: true },
];

const sdnRows = [
    { label: 'Area 4', devAll: '25.85M', usim: '24.40M', sim: '1.45M',   bold: true },
    { label: 'KAL',    devAll: '10.08M', usim: '8.77M',  sim: '1.26M',   bold: false },
    { label: 'MOM',    devAll: '1.40%',  usim: '3.07%',  sim: '-20.31%', bold: false },
];

const compIndexRows = [
    { region: 'Area 4', jan24: '95.69%', dec23: '93.30%', trend: '+43.0%', bold: true },
    { region: 'indosat', jan24: '51.96%', dec23: '53.96%', trend: '-2.0%', bold: false },
    { region: 'xl',      jan24: '34.62%', dec23: '34.33%', trend: '+0.3%', bold: false },
];

function cellClass(val) {
    if (!val) return '';
    return val.startsWith('-') ? 'text-negative' : 'text-positive';
}

const marketShareSeries = [
    { name: 'Telkomsel', data: [62.39, 54.83, 59.36, 59.36] },
    { name: 'Indosat',   data: [26.65, 14.05, 26.65,  5.92] },
    { name: 'XL',        data: [13.05, 15.52, 14.41,  5.05] },
    { name: 'Tri+SF',    data: [ 3.77,  1.58,  4.16,  0.16] },
];

const marketShareOptions = {
    chart: {
        type: 'bar',
        height: 220,
        stacked: true,
        fontFamily: "'Public Sans', sans-serif",
        toolbar: { show: false },
    },
    plotOptions: { bar: { horizontal: false, borderRadius: 2, columnWidth: '60%' } },
    colors: ['#d32f2f', '#f9a825', '#1565c0', '#2e7d32'],
    dataLabels: { enabled: false },
    xaxis: {
        categories: ['Area 4', 'KAL', 'SUL/MON', 'PUM'],
        labels: { style: { fontSize: '10px' } },
    },
    yaxis: {
        max: 110,
        labels: {
            style: { fontSize: '10px' },
            formatter: (v) => v.toFixed(0) + '%',
        },
    },
    legend: { show: true, fontSize: '10px', position: 'top' },
    grid: { strokeDashArray: 4, borderColor: '#e9ecef' },
    tooltip: { y: { formatter: (v) => v.toFixed(2) + '%' } },
};

const compIndexSeries = [
    { name: 'Telkomsel', data: [95.69, 93.55, 96.14, 95.69] },
    { name: 'Indosat',   data: [51.96, 67.27, 52.14, 34.62] },
    { name: 'XL',        data: [34.62, 43.16, 43.33,  7.21] },
    { name: 'Others',    data: [11.73,  8.84,  7.77,  1.26] },
];

const compIndexOptions = {
    chart: {
        type: 'bar',
        height: 220,
        fontFamily: "'Public Sans', sans-serif",
        toolbar: { show: false },
    },
    plotOptions: { bar: { borderRadius: 2, columnWidth: '65%' } },
    colors: ['#d32f2f', '#f9a825', '#1565c0', '#546e7a'],
    dataLabels: { enabled: false },
    xaxis: {
        categories: ['Area 4', 'KAL', 'SUL/MON', 'PUM'],
        labels: { style: { fontSize: '10px' } },
    },
    yaxis: {
        max: 110,
        labels: {
            style: { fontSize: '10px' },
            formatter: (v) => v.toFixed(0) + '%',
        },
    },
    legend: { show: true, fontSize: '10px', position: 'top' },
    grid: { strokeDashArray: 4, borderColor: '#e9ecef' },
    tooltip: { y: { formatter: (v) => v.toFixed(2) + '%' } },
};
</script>