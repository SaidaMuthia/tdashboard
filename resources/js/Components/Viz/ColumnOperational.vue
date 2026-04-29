<template>
    <div class="viz-column">
        <div class="viz-section-header bg-operational">
            <i class="bx bx-cog viz-header-icon"></i>
            Operational Excellence
        </div>

        <!-- Site Availability -->
        <div class="card viz-card">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">
                    Site Availability <small class="text-muted">W01</small>
                </h6>
            </div>
            <div class="card-body">
                <div class="row text-center">
                    <div v-for="tier in availTiers" :key="tier.label" class="col-4">
                        <div class="metric-badge">
                            <div class="metric-value fw-bold" :style="{ color: tier.color, fontSize: '1.1rem' }">
                                {{ tier.label }}
                            </div>
                            <div class="metric-sub fw-bold">{{ tier.value }}</div>
                            <div class="metric-label" :class="cellClass(tier.delta)">{{ tier.delta }}</div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-4">
                        <apexchart type="radialBar" height="140"
                            :options="gaugeOptions('#1565c0', 'Diamond')"
                            :series="[98.76]" />
                    </div>
                    <div class="col-4">
                        <apexchart type="radialBar" height="140"
                            :options="gaugeOptions('#7b1fa2', 'Platinum')"
                            :series="[99.12]" />
                    </div>
                    <div class="col-4">
                        <apexchart type="radialBar" height="140"
                            :options="gaugeOptions('#f9a825', 'Gold')"
                            :series="[98.95]" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 4G PL -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">
                    4G PL <small class="text-muted">W01</small>
                </h6>
            </div>
            <div class="card-body text-center">
                <apexchart type="radialBar" height="160"
                    :options="plGaugeOptions"
                    :series="[97.39]" />
                <div class="d-flex justify-content-center gap-3 mt-2">
                    <div>
                        <small class="text-muted">WoW</small><br>
                        <span class="fw-bold text-positive">0.35pp</span>
                    </div>
                </div>
                <div class="table-responsive mt-3">
                    <table class="table table-viz">
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Ach</th>
                                <th>WoW</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in plRows" :key="row.region">
                                <td>{{ row.region }}</td>
                                <td>{{ row.ach }}</td>
                                <td :class="cellClass(row.wow)">{{ row.wow }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- FBB Assurance -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">FBB Assurance</h6>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-viz">
                        <thead>
                            <tr>
                                <th></th>
                                <th>W01-26</th>
                                <th>WoW</th>
                            </tr>
                        </thead>
                        <tbody>
                                                        <tr v-for="row in fbbRows" :key="row.metric">
                                <td>{{ row.metric }}</td>
                                <td class="fw-bold">{{ row.value }}</td>
                                <td :class="cellClass(row.wow)">{{ row.wow }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Cost Leadership -->
        <div class="card viz-card mt-2">
            <div class="card-header py-2">
                <h6 class="card-title mb-0" style="font-size:0.8rem">
                    <i class="bx bx-dollar-circle me-1"></i>Cost Leadership
                </h6>
            </div>
            <div class="card-body">
                <p class="mb-1" style="font-size:0.75rem">
                    Activity Total <strong>14,582</strong> | Done <strong>14,465</strong> |
                    <span class="text-success fw-bold">99%</span>
                </p>
                <p class="mb-0" style="font-size:0.75rem">
                    FY25 <strong>4.037 Bio</strong> | Achieve <strong>14.356 Bio</strong> |
                    <span class="text-success fw-bold">356%</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const availTiers = [
    { label: 'D', value: '98.76%', delta: '0.04pp',  color: '#1565c0' },
    { label: 'P', value: '99.12%', delta: '-0.22pp', color: '#7b1fa2' },
    { label: 'G', value: '98.95%', delta: '-0.16pp', color: '#f9a825' },
];

const plRows = [
    { region: 'Area 4', ach: '97.39%', wow: '0.35pp' },
    { region: 'KAL',    ach: '96.85%', wow: '0.12pp' },
    { region: 'SUL',    ach: '98.06%', wow: '-0.23pp' },
    { region: 'PUM',    ach: '97.67%', wow: '0.85pp' },
];

const fbbRows = [
    { metric: 'Service Availability', value: '98.36%', wow: '0.06pp' },
    { metric: 'Assurance Guarantee',  value: '93.23%', wow: '0.81pp' },
    { metric: 'TTR Diamond',          value: '95.45%', wow: '1.41pp' },
    { metric: 'iTTR Platinum',        value: '96.11%', wow: '-1.46pp' },
];

function cellClass(val) {
    if (!val) return '';
    return val.startsWith('-') ? 'text-negative' : 'text-positive';
}

function gaugeOptions(color, label) {
    return {
        chart: {
            height: 140,
            type: 'radialBar',
            sparkline: { enabled: true },
            toolbar: { show: false },
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: { size: '60%' },
                track: { background: '#e7e7e7', strokeWidth: '100%' },
                dataLabels: {
                    name: { show: true, fontSize: '11px', offsetY: -5, color: '#546e7a' },
                    value: {
                        show: true,
                        fontSize: '18px',
                        fontWeight: 700,
                        offsetY: -2,
                        formatter: (v) => v + '%',
                    },
                },
            },
        },
        fill: { colors: [color] },
        labels: [label],
        stroke: { lineCap: 'round' },
    };
}

const plGaugeOptions = {
    chart: {
        height: 160,
        type: 'radialBar',
        sparkline: { enabled: true },
        toolbar: { show: false },
    },
    plotOptions: {
        radialBar: {
            hollow: { size: '65%' },
            track: { background: '#e7e7e7' },
            dataLabels: {
                name: { show: true, fontSize: '12px', offsetY: -10, color: '#546e7a' },
                value: {
                    show: true,
                    fontSize: '22px',
                    fontWeight: 800,
                    offsetY: 0,
                    color: '#2e7d32',
                    formatter: (v) => v + '%',
                },
            },
        },
    },
    fill: { colors: ['#2e7d32'] },
    labels: ['Ach'],
    stroke: { lineCap: 'round' },
};
</script>