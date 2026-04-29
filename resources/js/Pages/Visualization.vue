<template>
    <Head title="Visualization (Columns)" />

    <!-- Screen header: title + update badge -->
    <div class="d-flex align-items-center justify-content-between mb-3 print-hide">
        <h5 class="fw-bold mb-0">
            <i class="bx bx-bar-chart-alt-2 me-2"></i>Performance Dashboard
            <small class="text-muted fw-normal">(Column View)</small>
        </h5>
        <span class="update-badge"><i class="bx bx-calendar"></i> Update: 14-Jan-2026</span>
    </div>

    <!-- Print header (only visible when printing) -->
    <div class="print-header">
        <div class="print-header-title">Performance Dashboard — Column View</div>
        <div class="print-header-date">Update: 14-Jan-2026</div>
    </div>

    <!-- 4-column visualization grid -->
    <div class="viz-print-wrapper">
        <div class="row g-3">
            <div class="col-xl-3 col-lg-6 col-md-6">
                <ColumnBusiness />
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6">
                <ColumnOperational />
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6">
                <ColumnNetwork />
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6">
                <ColumnCompetitor />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import ColumnBusiness    from '@/Components/Viz/ColumnBusiness.vue';
import ColumnOperational from '@/Components/Viz/ColumnOperational.vue';
import ColumnNetwork     from '@/Components/Viz/ColumnNetwork.vue';
import ColumnCompetitor  from '@/Components/Viz/ColumnCompetitor.vue';
</script>

<style>
/* ============================================================
   Print Styles — fit the entire 4-column dashboard on one
   A4 landscape slide (297mm × 210mm).
   Screen layout is unchanged (normal scrolling).
   ============================================================ */

/* Elements shown only on screen */
.print-hide { display: block; }

/* Print-only header — hidden on screen */
.print-header { display: none; }

@media print {
    /* Page setup: A4 landscape, no margin (we control spacing) */
    @page {
        size: A4 landscape;
        margin: 0;
    }

    /* Force colour backgrounds / fills to print */
    * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    /* Hide layout chrome */
    #layout-menu,
    .layout-navbar,
    .content-footer,
    .layout-overlay,
    .content-backdrop,
    .print-hide {
        display: none !important;
    }

    /* Remove sidebar offset */
    .layout-page {
        padding-inline-start: 0 !important;
    }

    /* Flatten wrappers */
    html, body,
    .layout-wrapper,
    .layout-container,
    .layout-page,
    .content-wrapper {
        height: auto !important;
        overflow: visible !important;
        padding: 0 !important;
        margin: 0 !important;
        background: #fff !important;
    }

    .container-fluid {
                padding: 4mm 5mm !important;
        max-width: 100% !important;
    }

    /* Show print-only header */
    .print-header {
        display: flex !important;
        align-items: center;
        justify-content: space-between;
        padding: 2mm 5mm;
        font-size: 9pt;
        font-weight: 700;
        border-bottom: 1px solid #dee2e6;
        margin-bottom: 2mm;
    }

    /* Scale the entire 4-column grid to fit A4 landscape height */
    .viz-print-wrapper {
        transform: scale(0.62);
        transform-origin: top left;
        width: calc(100% / 0.62);
        /* prevent content from spilling to page 2 */
        max-height: calc(190mm / 0.62);
        overflow: hidden;
    }

    /* Remove card hover shadows for clean print */
    .viz-card,
    .viz-card:hover {
        box-shadow: 0 1px 3px rgba(0,0,0,0.08) !important;
    }

    /* Keep each column on the same page */
    .viz-column {
        page-break-inside: avoid;
        break-inside: avoid;
    }

    /* Tighten spacing slightly */
    .kpi-card {
        margin-bottom: 3px !important;
        padding: 3px 6px !important;
    }
}
</style>