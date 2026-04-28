/**
 * Visualization Dashboard — ApexCharts
 * Shared by both column and row-based layouts
 */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // --- Color config ---
    const colors = {
        red: "#d32f2f",
        green: "#2e7d32",
        blue: "#1565c0",
        orange: "#e65100",
        gold: "#f9a825",
        gray: "#546e7a",
        lightRed: "#ef9a9a",
        lightGreen: "#a5d6a7",
        lightBlue: "#90caf9",
        lightOrange: "#ffcc80",
        telkomsel: "#d32f2f",
        indosat: "#f9a825",
        xl: "#1565c0",
        tri: "#6a1b9a",
        smartfren: "#2e7d32",
    };
    const fontFamily = "'Public Sans', sans-serif";

    // =============================================
    // 1. OPERATIONAL EXCELLENCE — Site Availability
    // =============================================

    // Diamond Gauge
    const diamondEl = document.querySelector("#siteAvailDiamond");
    if (diamondEl) {
        new ApexCharts(diamondEl, {
            series: [98.76],
            chart: {
                height: 140,
                type: "radialBar",
                sparkline: { enabled: true },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: { size: "60%" },
                    track: { background: "#e7e7e7", strokeWidth: "100%" },
                    dataLabels: {
                        name: {
                            show: true,
                            fontSize: "11px",
                            offsetY: -5,
                            color: colors.gray,
                        },
                        value: {
                            show: true,
                            fontSize: "18px",
                            fontWeight: 700,
                            offsetY: -2,
                            formatter: (v) => v + "%",
                        },
                    },
                },
            },
            fill: { colors: [colors.blue] },
            labels: ["Diamond"],
            stroke: { lineCap: "round" },
        }).render();
    }

    // Platinum Gauge
    const platinumEl = document.querySelector("#siteAvailPlatinum");
    if (platinumEl) {
        new ApexCharts(platinumEl, {
            series: [99.12],
            chart: {
                height: 140,
                type: "radialBar",
                sparkline: { enabled: true },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: { size: "60%" },
                    track: { background: "#e7e7e7", strokeWidth: "100%" },
                    dataLabels: {
                        name: {
                            show: true,
                            fontSize: "11px",
                            offsetY: -5,
                            color: colors.gray,
                        },
                        value: {
                            show: true,
                            fontSize: "18px",
                            fontWeight: 700,
                            offsetY: -2,
                            formatter: (v) => v + "%",
                        },
                    },
                },
            },
            fill: { colors: ["#7b1fa2"] },
            labels: ["Platinum"],
            stroke: { lineCap: "round" },
        }).render();
    }

    // Gold Gauge
    const goldEl = document.querySelector("#siteAvailGold");
    if (goldEl) {
        new ApexCharts(goldEl, {
            series: [98.95],
            chart: {
                height: 140,
                type: "radialBar",
                sparkline: { enabled: true },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: { size: "60%" },
                    track: { background: "#e7e7e7", strokeWidth: "100%" },
                    dataLabels: {
                        name: {
                            show: true,
                            fontSize: "11px",
                            offsetY: -5,
                            color: colors.gray,
                        },
                        value: {
                            show: true,
                            fontSize: "18px",
                            fontWeight: 700,
                            offsetY: -2,
                            formatter: (v) => v + "%",
                        },
                    },
                },
            },
            fill: { colors: [colors.gold] },
            labels: ["Gold"],
            stroke: { lineCap: "round" },
        }).render();
    }

    // =============================================
    // 2. OPERATIONAL EXCELLENCE — 4G PL Achievement
    // =============================================
    const plGaugeEl = document.querySelector("#plAchievementGauge");
    if (plGaugeEl) {
        new ApexCharts(plGaugeEl, {
            series: [97.39],
            chart: {
                height: 160,
                type: "radialBar",
                sparkline: { enabled: true },
            },
            plotOptions: {
                radialBar: {
                    hollow: { size: "65%" },
                    track: { background: "#e7e7e7" },
                    dataLabels: {
                        name: {
                            show: true,
                            fontSize: "12px",
                            offsetY: -10,
                            color: colors.gray,
                        },
                        value: {
                            show: true,
                            fontSize: "22px",
                            fontWeight: 800,
                            offsetY: 0,
                            color: colors.green,
                            formatter: (v) => v + "%",
                        },
                    },
                },
            },
            fill: { colors: [colors.green] },
            labels: ["Ach"],
            stroke: { lineCap: "round" },
        }).render();
    }

    // =============================================
    // 3. NETWORK QUALITY — 4G Utilization Bar
    // =============================================
    const utilChartEl = document.querySelector("#utilizationChart");
    if (utilChartEl) {
        new ApexCharts(utilChartEl, {
            series: [
                { name: "W52", data: [65.2, 62.1, 58.7, 71.3] },
                { name: "W53", data: [63.8, 60.5, 57.2, 69.8] },
            ],
            chart: {
                type: "bar",
                height: 200,
                fontFamily: fontFamily,
                toolbar: { show: false },
            },
            plotOptions: {
                bar: { borderRadius: 3, columnWidth: "55%", grouped: true },
            },
            colors: [colors.blue, colors.lightBlue],
            dataLabels: { enabled: false },
            xaxis: {
                categories: ["Area 4", "KAL", "SUL", "PUM"],
                labels: { style: { fontSize: "10px" } },
            },
            yaxis: {
                labels: {
                    style: { fontSize: "10px" },
                    formatter: (v) => v.toFixed(0) + "%",
                },
                max: 100,
            },
            legend: { show: true, fontSize: "10px", position: "top" },
            grid: { strokeDashArray: 4, borderColor: "#e9ecef" },
            tooltip: { y: { formatter: (v) => v + "%" } },
        }).render();
    }

    // =============================================
    // 4. NETWORK QUALITY — 4G RCI Bar
    // =============================================
    const rciChartEl = document.querySelector("#rciChart");
    if (rciChartEl) {
        new ApexCharts(rciChartEl, {
            series: [
                { name: "W52", data: [3.5, 4.1, 2.8, 3.9] },
                { name: "W53", data: [3.69, 4.3, 2.9, 4.1] },
            ],
            chart: {
                type: "bar",
                height: 200,
                fontFamily: fontFamily,
                toolbar: { show: false },
            },
            plotOptions: { bar: { borderRadius: 3, columnWidth: "55%" } },
            colors: [colors.green, colors.lightGreen],
            dataLabels: { enabled: false },
            xaxis: {
                categories: ["Area 4", "KAL", "SUL", "PUM"],
                labels: { style: { fontSize: "10px" } },
            },
            yaxis: {
                labels: {
                    style: { fontSize: "10px" },
                    formatter: (v) => v.toFixed(1),
                },
            },
            legend: { show: true, fontSize: "10px", position: "top" },
            grid: { strokeDashArray: 4, borderColor: "#e9ecef" },
            tooltip: { y: { formatter: (v) => v.toFixed(2) } },
        }).render();
    }

    // =============================================
    // 5. COMPETITOR & MARKET — Market Share Bar
    // =============================================
    const marketShareEl = document.querySelector("#marketShareChart");
    if (marketShareEl) {
        new ApexCharts(marketShareEl, {
            series: [
                { name: "Telkomsel", data: [62.39, 54.83, 59.36, 59.36] },
                { name: "Indosat", data: [26.65, 14.05, 26.65, 5.92] },
                { name: "XL", data: [13.05, 15.52, 14.41, 5.05] },
                { name: "Tri+SF", data: [3.77, 1.58, 4.16, 0.16] },
            ],
            chart: {
                type: "bar",
                height: 220,
                stacked: true,
                fontFamily: fontFamily,
                toolbar: { show: false },
            },
            plotOptions: {
                bar: { horizontal: false, borderRadius: 2, columnWidth: "60%" },
            },
            colors: [
                colors.telkomsel,
                colors.indosat,
                colors.xl,
                colors.smartfren,
            ],
            dataLabels: { enabled: false },
            xaxis: {
                categories: ["Area 4", "KAL", "SUL/MON", "PUM"],
                labels: { style: { fontSize: "10px" } },
            },
            yaxis: {
                max: 110,
                labels: {
                    style: { fontSize: "10px" },
                    formatter: (v) => v.toFixed(0) + "%",
                },
            },
            legend: { show: true, fontSize: "10px", position: "top" },
            grid: { strokeDashArray: 4, borderColor: "#e9ecef" },
            tooltip: { y: { formatter: (v) => v.toFixed(2) + "%" } },
        }).render();
    }

    // =============================================
    // 6. COMPETITOR & MARKET — Competition Index Bar
    // =============================================
    const compIndexEl = document.querySelector("#competitionIndexChart");
    if (compIndexEl) {
        new ApexCharts(compIndexEl, {
            series: [
                { name: "Telkomsel", data: [95.69, 93.55, 96.14, 95.69] },
                { name: "Indosat", data: [51.96, 67.27, 52.14, 34.62] },
                { name: "XL", data: [34.62, 43.16, 43.33, 7.21] },
                { name: "Others", data: [11.73, 8.84, 7.77, 1.26] },
            ],
            chart: {
                type: "bar",
                height: 220,
                fontFamily: fontFamily,
                toolbar: { show: false },
            },
            plotOptions: { bar: { borderRadius: 2, columnWidth: "65%" } },
            colors: [colors.telkomsel, colors.indosat, colors.xl, colors.gray],
            dataLabels: { enabled: false },
            xaxis: {
                categories: ["Area 4", "KAL", "SUL/MON", "PUM"],
                labels: { style: { fontSize: "10px" } },
            },
            yaxis: {
                max: 110,
                labels: {
                    style: { fontSize: "10px" },
                    formatter: (v) => v.toFixed(0) + "%",
                },
            },
            legend: { show: true, fontSize: "10px", position: "top" },
            grid: { strokeDashArray: 4, borderColor: "#e9ecef" },
            tooltip: { y: { formatter: (v) => v.toFixed(2) + "%" } },
        }).render();
    }

    // =============================================
    // 7. NETWORK QUALITY — Quality Experience Donuts
    // =============================================
    const goodQualEl = document.querySelector("#goodQualDonut");
    if (goodQualEl) {
        new ApexCharts(goodQualEl, {
            series: [91.5],
            chart: {
                height: 100,
                type: "radialBar",
                sparkline: { enabled: true },
            },
            plotOptions: {
                radialBar: {
                    hollow: { size: "55%" },
                    dataLabels: {
                        name: { show: false },
                        value: {
                            show: true,
                            fontSize: "14px",
                            fontWeight: 700,
                            offsetY: 5,
                            formatter: (v) => v + "%",
                        },
                    },
                },
            },
            fill: { colors: [colors.green] },
            stroke: { lineCap: "round" },
        }).render();
    }

    const videoExpEl = document.querySelector("#videoExpDonut");
    if (videoExpEl) {
        new ApexCharts(videoExpEl, {
            series: [97.5],
            chart: {
                height: 100,
                type: "radialBar",
                sparkline: { enabled: true },
            },
            plotOptions: {
                radialBar: {
                    hollow: { size: "55%" },
                    dataLabels: {
                        name: { show: false },
                        value: {
                            show: true,
                            fontSize: "14px",
                            fontWeight: 700,
                            offsetY: 5,
                            formatter: (v) => v + "%",
                        },
                    },
                },
            },
            fill: { colors: [colors.blue] },
            stroke: { lineCap: "round" },
        }).render();
    }

    const gameExpEl = document.querySelector("#gameExpDonut");
    if (gameExpEl) {
        new ApexCharts(gameExpEl, {
            series: [97.0],
            chart: {
                height: 100,
                type: "radialBar",
                sparkline: { enabled: true },
            },
            plotOptions: {
                radialBar: {
                    hollow: { size: "55%" },
                    dataLabels: {
                        name: { show: false },
                        value: {
                            show: true,
                            fontSize: "14px",
                            fontWeight: 700,
                            offsetY: 5,
                            formatter: (v) => v + "%",
                        },
                    },
                },
            },
            fill: { colors: [colors.orange] },
            stroke: { lineCap: "round" },
        }).render();
    }

    // =============================================
    // 8. BUSINESS PERFORMANCE — Revenue Trend
    // =============================================
    const revTrendEl = document.querySelector("#revenueTrendChart");
    if (revTrendEl) {
        new ApexCharts(revTrendEl, {
            series: [
                {
                    name: "Revenue",
                    data: [812, 825, 798, 830, 815, 845, 812],
                },
            ],
            chart: {
                type: "area",
                height: 120,
                sparkline: { enabled: true },
                fontFamily: fontFamily,
            },
            stroke: { width: 2, curve: "smooth" },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 90, 100],
                },
            },
            colors: [colors.red],
            tooltip: {
                fixed: { enabled: false },
                y: { formatter: (v) => v + " B" },
            },
        }).render();
    }

    // =============================================
    // 9. BUSINESS PERFORMANCE — KPI Horizontal Bar Chart
    // =============================================
    const hpChartEl = document.querySelector("#horizontalBarChart");
    if (hpChartEl) {
        new ApexCharts(hpChartEl, {
            series: [
                {
                    name: "Value",
                    data: [-1.79, -1.94, -0.06, -1.03, -4.28, -3.05],
                },
            ],
            chart: {
                height: 250,
                type: "bar",
                toolbar: { show: false },
                fontFamily: fontFamily,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: "55%",
                    distributed: true,
                    borderRadius: 4,
                },
            },
            colors: [
                colors.blue, // REV ALL
                colors.lightBlue, // REV BB
                colors.green, // REV DIG
                colors.gray, // REV VC
                colors.red, // PAYLOAD
                colors.gold, // TRAFFIC
            ],
            dataLabels: {
                enabled: true,
                style: { colors: ["#fff"], fontWeight: 400, fontSize: "11px" },
                formatter: (val) => val + "%",
                offsetX: 0,
            },
            stroke: { show: false },
            xaxis: {
                categories: [
                    "REV ALL",
                    "REV BB",
                    "REV DIG",
                    "REV VC",
                    "PAYLOAD",
                    "TRAFFIC",
                ],
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
                max: 0,
                min: -5,
            },
            yaxis: { labels: { show: false } },
            grid: {
                strokeDashArray: 7,
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: false } },
                padding: { top: -20, bottom: -12, left: -10, right: 0 },
            },
            legend: { show: false },
            tooltip: { y: { formatter: (val) => val + "%" } },
        }).render();
    }
});
