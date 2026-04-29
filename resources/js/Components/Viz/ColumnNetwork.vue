<template>
    <div class="viz-column">
        <div class="viz-section-header bg-network">
            <i class="bx bx-wifi viz-header-icon"></i>
            Network Quality
        </div>

        <!-- Quality Experience Summary -->
        <div class="card viz-card">
            <div class="card-body">
                <div class="row text-center mb-2">
                    <div class="col-4">
                        <div class="kpi-card flex-column text-center p-2" style="background:#e8f5e9">
                            <span class="quality-dot good"></span>
                            <strong style="font-size:0.7rem">Good Qual</strong>
                            <apexchart type="radialBar" height="100"
                                :options="donutOptions('#2e7d32')"
                                :series="[91.5]" />
                            <small style="font-size:0.6rem">Win 183 City</small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="kpi-card flex-column text-center p-2" style="background:#e3f2fd">
                            <span class="quality-dot" style="background:#1565c0"></span>
                            <strong style="font-size:0.7rem">Video Exp</strong>
                            <apexchart type="radialBar" height="100"
                                :options="donutOptions('#1565c0')"
                                :series="[97.5]" />
                            <small style="font-size:0.6rem">Win 195 City</small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="kpi-card flex-column text-center p-2" style="background:#fff3e0">
                            <span class="quality-dot" style="background:#e65100"></span>
                            <strong style="font-size:0.7rem">Game Exp</strong>
                            <apexchart type="radialBar" height="100"
                                :options="donutOptions('#e65100')"
                                :series="[97.0]" />
                            <small style="font-size:0.6rem">Win 194 City</small>
                        </div>
                    </div>
                </div>
                <p class="text-center mb-0" style="font-size:0.65rem;color:#6c757d">Total City: 200 Cities</p>
            </div>
        </div>

        <!-- 4G Utilization -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2 d-flex align-items-center justify-content-between">
                <h6 class="card-title mb-0" style="font-size:0.8rem">4G Utilization</h6>
                <div>
                    <span class="badge bg-label-primary" style="font-size:0.6rem">Ach: 65.90%</span>
                    <span class="badge bg-label-danger" style="font-size:0.6rem">WoW: -0.31pp</span>
                </div>
            </div>
            <div class="card-body">
                <apexchart type="bar" height="200"
                    :options="utilizationOptions"
                    :series="utilizationSeries" />
            </div>
        </div>

        <!-- 4G RCI -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2 d-flex align-items-center justify-content-between">
                <h6 class="card-title mb-0" style="font-size:0.8rem">4G RCI</h6>
                <div>
                    <span class="badge bg-label-success" style="font-size:0.6rem">W01: 3.69%</span>
                    <span class="badge bg-label-danger" style="font-size:0.6rem">WoW: -0.09pp</span>
                </div>
            </div>
            <div class="card-body">
                <apexchart type="bar" height="200"
                    :options="rciOptions"
                    :series="rciSeries" />
            </div>
        </div>

        <!-- RCI by Region Table -->
        <div class="card viz-card mt-2">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-viz">
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Ach</th>
                                <th>4G%</th>
                                <th>WoW</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in rciRows" :key="row.region">
                                <td :class="{ 'fw-bold': row.bold }">{{ row.region }}</td>
                                <td>{{ row.ach }}</td>
                                <td>{{ row.pct4g }}</td>
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
const rciRows = [
    { region: 'Area 4', ach: '3.69%', pct4g: '1.4%', wow: '-0.09pp', bold: true },
    { region: 'KAL',    ach: '4.30%', pct4g: '1.1%', wow: '0.12pp',  bold: false },
    { region: 'SUL',    ach: '2.90%', pct4g: '2.4%', wow: '-0.31pp', bold: false },
    { region: 'PUM',    ach: '4.10%', pct4g: '0.7%', wow: '0.21pp',  bold: false },
];

function cellClass(val) {
    if (!val) return '';
    return val.startsWith('-') ? 'text-negative' : 'text-positive';
}

function donutOptions(color) {
    return {
        chart: {
            height: 100,
            type: 'radialBar',
            sparkline: { enabled: true },
            toolbar: { show: false },
        },
        plotOptions: {
            radialBar: {
                hollow: { size: '55%' },
                dataLabels: {
                    name: { show: false },
                    value: {
                        show: true,
                        fontSize: '14px',
                        fontWeight: 700,
                        offsetY: 5,
                        formatter: (v) => v + '%',
                    },
                },
            },
        },
        fill: { colors: [color] },
        stroke: { lineCap: 'round' },
    };
}

const utilizationSeries = [
    { name: 'W52', data: [65.2, 62.1, 58.7, 71.3] },
    { name: 'W53', data: [63.8, 60.5, 57.2, 69.8] },
];

const utilizationOptions = {
    chart: {
        type: 'bar',
        height: 200,
        fontFamily: "'Public Sans', sans-serif",
        toolbar: { show: false },
    },
    plotOptions: { bar: { borderRadius: 3, columnWidth: '55%', grouped: true } },
    colors: ['#1565c0', '#90caf9'],
    dataLabels: { enabled: false },
    xaxis: {
        categories: ['Area 4', 'KAL', 'SUL', 'PUM'],
        labels: { style: { fontSize: '10px' } },
    },
    yaxis: {
        labels: {
            style: { fontSize: '10px' },
            formatter: (v) => v.toFixed(0) + '%',
        },
        max: 100,
    },
    legend: { show: true, fontSize: '10px', position: 'top' },
    grid: { strokeDashArray: 4, borderColor: '#e9ecef' },
    tooltip: { y: { formatter: (v) => v + '%' } },
};

const rciSeries = [
    { name: 'W52', data: [3.5, 4.1, 2.8, 3.9] },
    { name: 'W53', data: [3.69, 4.3, 2.9, 4.1] },
];

const rciOptions = {
    chart: {
        type: 'bar',
        height: 200,
        fontFamily: "'Public Sans', sans-serif",
        toolbar: { show: false },
    },
    plotOptions: { bar: { borderRadius: 3, columnWidth: '55%' } },
    colors: ['#2e7d32', '#a5d6a7'],
    dataLabels: { enabled: false },
    xaxis: {
        categories: ['Area 4', 'KAL', 'SUL', 'PUM'],
        labels: { style: { fontSize: '10px' } },
    },
    yaxis: {
        labels: {
            style: { fontSize: '10px' },
            formatter: (v) => v.toFixed(1),
        },
    },
    legend: { show: true, fontSize: '10px', position: 'top' },
    grid: { strokeDashArray: 4, borderColor: '#e9ecef' },
    tooltip: { y: { formatter: (v) => v.toFixed(2) } },
};
</script>