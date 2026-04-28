@php
$requestSegment = request()->segment(count(request()->segments()));
$segment = $requestSegment <> '' ? $requestSegment : 'visualization-upgraded'
    @endphp
    <!doctype html>
    <html lang="en"
        class="light-style layout-navbar-fixed layout-compact layout-menu-fixed layout-menu-collapsed"
        dir="ltr"
        data-theme="theme-default"
        data-assets-path="../assets/"
        data-template="vertical-menu-template-free"
        data-style="light"
        menu-collapse="true">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
        <title>Visualization (Upgraded) — TRANS4MERS</title>
        <meta name="description" content="Telco Performance Dashboard - Row-by-Row Layout" />
        <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/logo/logo-icon.png') }}" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/boxicons.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/css/core.css') }}" class="template-customizer-core-css" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/css/theme-default.css') }}" class="template-customizer-theme-css" />
        <link rel="stylesheet" href="{{ asset('assets/css/demo.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/libs/apex-charts/apex-charts.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/css/visualization.css') }}" />
        <script src="{{ asset('assets/vendor/js/helpers.js') }}"></script>
        <script src="{{ asset('assets/js/config.js') }}"></script>
        <style>
            .layout-menu-collapsed:not(.layout-menu-hover, .layout-menu-offcanvas, .layout-menu-fixed-offcanvas) .layout-menu.menu-vertical .menu-inner>.menu-item,
            .layout-menu-collapsed:not(.layout-menu-hover, .layout-menu-offcanvas, .layout-menu-fixed-offcanvas) .layout-menu .menu-vertical,
            .layout-menu-collapsed:not(.layout-menu-hover, .layout-menu-offcanvas, .layout-menu-fixed-offcanvas) .layout-menu.menu-vertical {
                inline-size: 5.25rem;
            }

            .layout-menu-collapsed:not(.layout-menu-hover, .layout-menu-offcanvas, .layout-menu-fixed-offcanvas) .layout-menu.menu-vertical:not(.layout-menu-hover) .menu-inner>.menu-item>.menu-link {
                padding-inline: calc(.9375rem - 1px);
            }

            .layout-menu-fixed.layout-menu-collapsed .layout-page {
                padding-inline-start: 5.25rem;
            }

            .layout-navbar-fixed.layout-menu-collapsed:not(.layout-menu-offcanvas, .layout-menu-fixed-offcanvas) .layout-content-navbar .layout-navbar,
            .layout-menu-fixed.layout-navbar-fixed.layout-menu-collapsed .layout-content-navbar .layout-navbar {
                inset-inline-start: 5.25rem;
            }

            .layout-menu-collapsed:not(.layout-menu-hover):not(.layout-menu-offcanvas):not(.layout-menu-fixed-offcanvas) .layout-menu .menu-inner .menu-sub {
                display: none;
                width: auto;
            }

            .layout-menu-collapsed:not(.layout-menu-hover, .layout-menu-offcanvas, .layout-menu-fixed-offcanvas) .layout-menu.menu-vertical .menu-inner>.menu-item div:not(.menu-block) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                opacity: 0;
            }

            .layout-menu-collapsed:not(.layout-menu-hover, .layout-menu-offcanvas, .layout-menu-fixed-offcanvas) .layout-menu .menu-vertical .menu-inner>.menu-item>.menu-toggle::after,
            .layout-menu-collapsed:not(.layout-menu-hover, .layout-menu-offcanvas, .layout-menu-fixed-offcanvas) .layout-menu.menu-vertical .menu-inner>.menu-item>.menu-toggle::after {
                display: none
            }
        </style>
    </head>

    <body>
        <!-- Layout wrapper -->
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <!-- Menu -->
                <x-menu :segment="$segment" />
                <!-- / Menu -->
                <!-- Layout container -->
                <div class="layout-page">
                    <!-- Navbar -->
                    <x-navbar />
                    <!-- / Navbar -->
                    <!-- Content wrapper -->
                    <div class="content-wrapper">
                        <!-- Content -->
                        <div class="container-fluid flex-grow-1 container-p-y">

                            {{-- Page Title --}}
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h5 class="fw-bold mb-0"><i class="bx bx-bar-chart-alt-2 me-2"></i>Performance Dashboard <small class="text-muted fw-normal">(Upgraded Row View)</small></h5>
                                <span class="update-badge"><i class="bx bx-calendar"></i> Update: 14-Jan-2026</span>
                            </div>

                            {{-- ================================================================ --}}
                            {{-- ROW 1: BUSINESS PERFORMANCE --}}
                            {{-- ================================================================ --}}
                            <div class="viz-section">
                                <div class="viz-section-header bg-business">
                                    <i class="bx bx-trending-up viz-header-icon"></i>
                                    Business Performance
                                </div>
                                <div class="p-3">
                                    <div class="row g-3">
                                        {{-- Horizontal Bar KPI --}}
                                        <div class="col-12 col-xl-5 col-lg-6 col-md-12">
                                            <div class="card h-100">
                                                <div class="card-header d-flex align-items-center justify-content-between">
                                                    <h5 class="card-title m-0 me-2" style="font-size:1rem">Business Performance KPI</h5>
                                                    <div class="dropdown">
                                                        <button class="btn p-0" type="button" id="topicDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="bx bx-dots-vertical-rounded"></i>
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="topicDropdown">
                                                            <a class="dropdown-item" href="javascript:void(0);">View Details</a>
                                                            <a class="dropdown-item" href="javascript:void(0);">Download Report</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body row g-3">
                                                    <div class="col-md-8">
                                                        <div id="horizontalBarChart" style="min-height: 250px;"></div>
                                                    </div>
                                                    <div class="col-md-4 d-flex justify-content-around align-items-center pt-0">
                                                        <div>
                                                            <div class="d-flex align-items-baseline">
                                                                <span class="text-primary me-2"><i class="bx bxs-circle" style="font-size:12px"></i></span>
                                                                <div>
                                                                    <p class="mb-0" style="font-size:0.75rem">REV ALL</p>
                                                                    <h5 class="mb-0 fs-6">-1.79%</h5>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex align-items-baseline my-3">
                                                                <span class="text-success me-2"><i class="bx bxs-circle" style="font-size:12px"></i></span>
                                                                <div>
                                                                    <p class="mb-0" style="font-size:0.75rem">REV DIG</p>
                                                                    <h5 class="mb-0 fs-6">-0.06%</h5>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex align-items-baseline">
                                                                <span class="text-danger me-2"><i class="bx bxs-circle" style="font-size:12px"></i></span>
                                                                <div>
                                                                    <p class="mb-0" style="font-size:0.75rem">PAYLOAD</p>
                                                                    <h5 class="mb-0 fs-6">-4.28%</h5>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div class="d-flex align-items-baseline">
                                                                <span class="text-info me-2"><i class="bx bxs-circle" style="font-size:12px"></i></span>
                                                                <div>
                                                                    <p class="mb-0" style="font-size:0.75rem">REV BB</p>
                                                                    <h5 class="mb-0 fs-6">-1.94%</h5>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex align-items-baseline my-3">
                                                                <span class="text-secondary me-2"><i class="bx bxs-circle" style="font-size:12px"></i></span>
                                                                <div>
                                                                    <p class="mb-0" style="font-size:0.75rem">REV VC</p>
                                                                    <h5 class="mb-0 fs-6">-1.03%</h5>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex align-items-baseline">
                                                                <span class="text-warning me-2"><i class="bx bxs-circle" style="font-size:12px"></i></span>
                                                                <div>
                                                                    <p class="mb-0" style="font-size:0.75rem">TRAFFIC</p>
                                                                    <h5 class="mb-0 fs-6">-3.05%</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- Revenue Mobile (Gross) --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2 d-flex align-items-center justify-content-between">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">Revenue Mobile (Gross)</h6>
                                                    <span class="update-badge">14-Jan-26</span>
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
                                                                <tr>
                                                                    <td class="fw-bold">Area 4</td>
                                                                    <td>812 B</td>
                                                                    <td class="text-negative">-1.79%</td>
                                                                    <td class="text-negative">-4.52%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>KAL</td>
                                                                    <td>317 B</td>
                                                                    <td class="text-negative">-1.87%</td>
                                                                    <td class="text-negative">-3.91%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>SUL</td>
                                                                    <td>351 B</td>
                                                                    <td class="text-negative">-0.87%</td>
                                                                    <td class="text-negative">-4.10%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>PUM</td>
                                                                    <td>144 B</td>
                                                                    <td class="text-negative">-3.61%</td>
                                                                    <td class="text-negative">-6.55%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- Revenue NET --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
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
                                                                <tr>
                                                                    <td class="fw-bold">Area 4</td>
                                                                    <td>1,653</td>
                                                                    <td class="text-negative">-0.6%</td>
                                                                    <td class="text-positive">3.1%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>KAL</td>
                                                                    <td>627</td>
                                                                    <td class="text-negative">-0.1%</td>
                                                                    <td class="text-positive">1.4%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>SUL</td>
                                                                    <td>701</td>
                                                                    <td class="text-negative">-0.3%</td>
                                                                    <td class="text-positive">5.0%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>PUM</td>
                                                                    <td>325</td>
                                                                    <td class="text-negative">-1.6%</td>
                                                                    <td class="text-positive">3.8%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- Payload + Revenue Trend --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card mb-2">
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
                                                                <tr>
                                                                    <td class="fw-bold">Area 4</td>
                                                                    <td>156 PB</td>
                                                                    <td>21.0%</td>
                                                                    <td class="text-positive">2.5%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>KAL</td>
                                                                    <td>62.0 PB</td>
                                                                    <td>13.8%</td>
                                                                    <td class="text-positive">0.6%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>SUL</td>
                                                                    <td>72.7 PB</td>
                                                                    <td>19.5%</td>
                                                                    <td class="text-positive">10.1%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>PUM</td>
                                                                    <td>21.2 PB</td>
                                                                    <td>4.83%</td>
                                                                    <td class="text-positive">1.1%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card viz-card">
                                                <div class="card-body py-2">
                                                    <h6 class="card-title mb-1" style="font-size:0.8rem">Revenue Trend</h6>
                                                    <div id="revenueTrendChart"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {{-- ================================================================ --}}
                            {{-- ROW 2: OPERATIONAL EXCELLENCE --}}
                            {{-- ================================================================ --}}
                            <div class="viz-section">
                                <div class="viz-section-header bg-operational">
                                    <i class="bx bx-cog viz-header-icon"></i>
                                    Operational Excellence
                                </div>
                                <div class="p-3">
                                    <div class="row g-3">
                                        {{-- Site Availability --}}
                                        <div class="col-xl-4 col-lg-6 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">Site Availability <small class="text-muted">W01</small></h6>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row text-center">
                                                        <div class="col-4">
                                                            <div class="metric-badge">
                                                                <div class="metric-value" style="color:#1565c0;font-size:1.1rem">D</div>
                                                                <div class="metric-sub fw-bold">98.76%</div>
                                                                <div class="metric-label text-positive">0.04pp</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="metric-badge">
                                                                <div class="metric-value" style="color:#7b1fa2;font-size:1.1rem">P</div>
                                                                <div class="metric-sub fw-bold">99.12%</div>
                                                                <div class="metric-label text-negative">-0.22pp</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="metric-badge">
                                                                <div class="metric-value" style="color:#f9a825;font-size:1.1rem">G</div>
                                                                <div class="metric-sub fw-bold">98.95%</div>
                                                                <div class="metric-label text-negative">-0.16pp</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2">
                                                        <div class="col-4">
                                                            <div id="siteAvailDiamond"></div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div id="siteAvailPlatinum"></div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div id="siteAvailGold"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- 4G PL --}}
                                        <div class="col-xl-3 col-lg-6 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">4G PL <small class="text-muted">W01</small></h6>
                                                </div>
                                                <div class="card-body text-center">
                                                    <div id="plAchievementGauge"></div>
                                                    <div class="d-flex justify-content-center gap-3 mt-2">
                                                        <div><small class="text-muted">WoW</small><br><span class="fw-bold text-positive">0.35pp</span></div>
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
                                                                <tr>
                                                                    <td>Area 4</td>
                                                                    <td>97.39%</td>
                                                                    <td class="text-positive">0.35pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>KAL</td>
                                                                    <td>96.85%</td>
                                                                    <td class="text-positive">0.12pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>SUL</td>
                                                                    <td>98.06%</td>
                                                                    <td class="text-negative">-0.23pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>PUM</td>
                                                                    <td>97.67%</td>
                                                                    <td class="text-positive">0.85pp</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- FBB Assurance --}}
                                        <div class="col-xl-3 col-lg-6 col-md-6">
                                            <div class="card viz-card h-100">
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
                                                                <tr>
                                                                    <td>Service Availability</td>
                                                                    <td class="fw-bold">98.36%</td>
                                                                    <td class="text-positive">0.06pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Assurance Guarantee</td>
                                                                    <td class="fw-bold">93.23%</td>
                                                                    <td class="text-positive">0.81pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>TTR Diamond</td>
                                                                    <td class="fw-bold">95.45%</td>
                                                                    <td class="text-positive">1.41pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>iTTR Platinum</td>
                                                                    <td class="fw-bold">96.11%</td>
                                                                    <td class="text-negative">-1.46pp</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- Cost Leadership --}}
                                        <div class="col-xl-2 col-lg-6 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem"><i class="bx bx-dollar-circle me-1"></i>Cost Leadership</h6>
                                                </div>
                                                <div class="card-body">
                                                    <p class="mb-2" style="font-size:0.75rem">Activity Total <strong>14,582</strong></p>
                                                    <p class="mb-2" style="font-size:0.75rem">Done <strong>14,465</strong> | <span class="text-success fw-bold">99%</span></p>
                                                    <hr class="my-2">
                                                    <p class="mb-1" style="font-size:0.75rem">FY25 <strong>4.037 Bio</strong></p>
                                                    <p class="mb-0" style="font-size:0.75rem">Achieve <strong>14.356 Bio</strong> | <span class="text-success fw-bold">356%</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {{-- ================================================================ --}}
                            {{-- ROW 3: NETWORK QUALITY --}}
                            {{-- ================================================================ --}}
                            <div class="viz-section">
                                <div class="viz-section-header bg-network">
                                    <i class="bx bx-wifi viz-header-icon"></i>
                                    Network Quality
                                </div>
                                <div class="p-3">
                                    <div class="row g-3">
                                        {{-- Quality Experience --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-body">
                                                    <div class="row text-center">
                                                        <div class="col-4">
                                                            <div class="kpi-card flex-column text-center p-2" style="background:#e8f5e9">
                                                                <span class="quality-dot good"></span>
                                                                <strong style="font-size:0.7rem">Good Qual</strong>
                                                                <div id="goodQualDonut"></div>
                                                                <small style="font-size:0.6rem">Win 183 City</small>
                                                            </div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="kpi-card flex-column text-center p-2" style="background:#e3f2fd">
                                                                <span class="quality-dot" style="background:#1565c0"></span>
                                                                <strong style="font-size:0.7rem">Video Exp</strong>
                                                                <div id="videoExpDonut"></div>
                                                                <small style="font-size:0.6rem">Win 195 City</small>
                                                            </div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="kpi-card flex-column text-center p-2" style="background:#fff3e0">
                                                                <span class="quality-dot" style="background:#e65100"></span>
                                                                <strong style="font-size:0.7rem">Game Exp</strong>
                                                                <div id="gameExpDonut"></div>
                                                                <small style="font-size:0.6rem">Win 194 City</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="text-center mt-2 mb-0" style="font-size:0.65rem;color:#6c757d">Total City: 200 Cities</p>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- 4G Utilization --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2 d-flex align-items-center justify-content-between">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">4G Utilization</h6>
                                                    <div>
                                                        <span class="badge bg-label-primary" style="font-size:0.6rem">Ach: 65.90%</span>
                                                        <span class="badge bg-label-danger" style="font-size:0.6rem">WoW: -0.31pp</span>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <div id="utilizationChart"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- 4G RCI --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2 d-flex align-items-center justify-content-between">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">4G RCI</h6>
                                                    <div>
                                                        <span class="badge bg-label-success" style="font-size:0.6rem">W01: 3.69%</span>
                                                        <span class="badge bg-label-danger" style="font-size:0.6rem">WoW: -0.09pp</span>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <div id="rciChart"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- RCI Table --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">4G RCI by Region</h6>
                                                </div>
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
                                                                <tr>
                                                                    <td class="fw-bold">Area 4</td>
                                                                    <td>3.69%</td>
                                                                    <td>1.4%</td>
                                                                    <td class="text-negative">-0.09pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>KAL</td>
                                                                    <td>4.30%</td>
                                                                    <td>1.1%</td>
                                                                    <td class="text-positive">0.12pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>SUL</td>
                                                                    <td>2.90%</td>
                                                                    <td>2.4%</td>
                                                                    <td class="text-negative">-0.31pp</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>PUM</td>
                                                                    <td>4.10%</td>
                                                                    <td>0.7%</td>
                                                                    <td class="text-positive">0.21pp</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {{-- ================================================================ --}}
                            {{-- ROW 4: COMPETITOR & MARKET --}}
                            {{-- ================================================================ --}}
                            <div class="viz-section">
                                <div class="viz-section-header bg-competitor">
                                    <i class="bx bx-group viz-header-icon"></i>
                                    Competitor & Market
                                </div>
                                <div class="p-3">
                                    {{-- Top Market Share Bar --}}
                                    <div class="mb-3">
                                        <div class="stacked-bar">
                                            <div class="bar-segment" style="width:62.39%;background:#d32f2f">62.39%</div>
                                            <div class="bar-segment" style="width:26.65%;background:#f9a825">26.65%</div>
                                            <div class="bar-segment" style="width:13.05%;background:#1565c0">13.05%</div>
                                            <div class="bar-segment" style="width:3.77%;background:#6a1b9a;font-size:0.5rem">3.77%</div>
                                        </div>
                                    </div>
                                    <div class="row g-3">
                                        {{-- SDN --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem"><i class="bx bx-signal-5 me-1"></i>SDN</h6>
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
                                                                <tr>
                                                                    <td class="fw-bold">Area 4</td>
                                                                    <td>25.85M</td>
                                                                    <td>24.40M</td>
                                                                    <td>1.45M</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>KAL</td>
                                                                    <td>10.08M</td>
                                                                    <td>8.77M</td>
                                                                    <td>1.26M</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>MOM</td>
                                                                    <td>1.40%</td>
                                                                    <td>3.07%</td>
                                                                    <td>-20.31%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- Market Share Chart --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">Market Share <small class="text-muted">W52</small></h6>
                                                </div>
                                                <div class="card-body">
                                                    <div id="marketShareChart"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- Competition Index Chart --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">Competition Index <small class="text-muted">W52</small></h6>
                                                </div>
                                                <div class="card-body">
                                                    <div id="competitionIndexChart"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- Competition Index Table --}}
                                        <div class="col-xl-3 col-lg-4 col-md-6">
                                            <div class="card viz-card h-100">
                                                <div class="card-header py-2">
                                                    <h6 class="card-title mb-0" style="font-size:0.8rem">Competition Index Detail</h6>
                                                </div>
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
                                                                <tr>
                                                                    <td class="fw-bold">Area 4</td>
                                                                    <td>95.69%</td>
                                                                    <td>93.30%</td>
                                                                    <td class="text-positive">+43.0%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>indosat</td>
                                                                    <td>51.96%</td>
                                                                    <td>53.96%</td>
                                                                    <td class="text-negative">-2.0%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>xl</td>
                                                                    <td>34.62%</td>
                                                                    <td>34.33%</td>
                                                                    <td class="text-positive">+0.3%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- / Content -->
                        <!-- Footer -->
                        <footer class="content-footer footer bg-footer-theme">
                            <div class="container-fluid">
                                <div class="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                                    <div class="text-body">
                                        © <script>
                                            document.write(new Date().getFullYear());
                                        </script>, made with ❤️ by
                                        <a href="{{ asset('/') }}" target="_blank" class="footer-link">Network Performance Analysis Division</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                        <!-- / Footer -->
                        <div class="content-backdrop fade"></div>
                    </div>
                    <!-- Content wrapper -->
                </div>
                <!-- / Layout page -->
            </div>
            <!-- Overlay -->
            <div class="layout-overlay layout-menu-toggle"></div>
        </div>
        <!-- / Layout wrapper -->

        <script src="{{ asset('assets/vendor/libs/jquery/jquery.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/popper/popper.js') }}"></script>
        <script src="{{ asset('assets/vendor/js/bootstrap.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
        <script src="{{ asset('assets/vendor/js/menu.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/apex-charts/apexcharts.js') }}"></script>
        <script src="{{ asset('assets/js/main.js') }}"></script>
        <script src="{{ asset('assets/js/visualization-charts.js') }}"></script>
        <script>
            let layoutMenu = document.getElementById('layout-menu'),
                htmlTag = document.getElementsByTagName('html')[0],
                appBrandLogo = document.querySelector("a.app-brand-link > img"),
                appBrand = document.getElementsByClassName("app-brand")[0]
            layoutMenu.addEventListener("mouseenter", function() {
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    htmlTag.classList.add("layout-menu-hover")
                    appBrand.classList.remove("ps-0", "pe-0")
                    appBrand.querySelector("div").style.display = 'block'
                }
            })
            layoutMenu.addEventListener("mouseleave", function() {
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    htmlTag.classList.remove("layout-menu-hover")
                    appBrand.querySelector("div").style.display = 'none'
                    appBrand.classList.add("ps-0", "pe-0")
                }
            })
            appBrand.children[1].addEventListener("click", function() {
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    htmlTag.setAttribute("menu-collapse", "false")
                    htmlTag.classList.remove("layout-menu-collapsed")
                } else {
                    htmlTag.setAttribute("menu-collapse", "true")
                    htmlTag.classList.add("layout-menu-collapsed")
                }
                appBrand.querySelector("div").style.display = 'block'
            })
        </script>
        @stack('visualization-rows-js')
    </body>

    </html>