@php
// current segment
$requestSegment = request()->segment(count(request()->segments()));
$segment = $requestSegment <> '' ? $requestSegment : 'new-site-monitoring'
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
        <title>TRANS - 4 - MERS</title>
        <meta name="description" content="" />
        <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/logo/logo-icon.png') }}" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/boxicons.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/css/core.css') }}" class="template-customizer-core-css" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/css/theme-default.css') }}" class="template-customizer-theme-css" />
        <link rel="stylesheet" href="{{ asset('assets/css/demo.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/libs/apex-charts/apex-charts.css') }}" />
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
                    {{-- <pre>{{ $segment }}</pre> --}}
                    <!-- Navbar -->
                    <x-navbar />
                    <!-- / Navbar -->
                    <!-- Content wrapper -->
                    <div class="content-wrapper">
                        <!-- Content -->
                        {{-- <x-home /> --}}
                        {{-- <x-content.source-monitor /> --}}
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">
                                <div class="col-lg-12 mb-4 order-0">
                                    <div class="card">
                                        <div class="d-flex align-items-end row">
                                            <div class="col-sm-7">
                                                <div class="card-body">
                                                    <h5 class="card-title text-primary">Welcome to Trans4mers Template! 🎉</h5>
                                                    <p class="mb-4">
                                                        You have successfully extracted the project into a reusable template.
                                                        This is your dashboard with dummy statistics.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Dummy Table -->
                                <div class="col-12 col-lg-12 order-2 order-md-3 order-lg-2 mb-4">
                                    <div class="card">
                                        <h5 class="card-header">Dummy Data Overview</h5>
                                        <div class="table-responsive text-nowrap">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Project</th>
                                                        <th>Status</th>
                                                        <th>Users</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-border-bottom-0">
                                                    <tr>
                                                        <td><i class="bx bxl-angular bx-sm text-danger me-3"></i> <strong>Angular Project</strong></td>
                                                        <td><span class="badge bg-label-primary me-1">Active</span></td>
                                                        <td>150</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                                                                <div class="dropdown-menu">
                                                                    <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                                                                    <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="bx bxl-react bx-sm text-info me-3"></i> <strong>React Project</strong></td>
                                                        <td><span class="badge bg-label-success me-1">Completed</span></td>
                                                        <td>240</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                                                                <div class="dropdown-menu">
                                                                    <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                                                                    <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="bx bxl-vue bx-sm text-success me-3"></i> <strong>Vue Project</strong></td>
                                                        <td><span class="badge bg-label-warning me-1">Pending</span></td>
                                                        <td>90</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                                                                <div class="dropdown-menu">
                                                                    <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                                                                    <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- / Content -->
                        <!-- Footer -->
                        <footer class="content-footer footer bg-footer-theme">
                            <div class="container-fluid">
                                <div
                                    class="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                                    <div class="text-body">
                                        ©
                                        <script>
                                            document.write(new Date().getFullYear());
                                        </script>
                                        , made with ❤️ by
                                        <a href="{{ asset('/') }}" target="_blank"
                                            class="footer-link">Network Performance Analysis Division</a>
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
        <div class="buy-now">
            {{-- <a href="https://themeselection.com/item/sneat-dashboard-pro-bootstrap/" target="_blank"
            class="btn btn-danger btn-buy-now">Upgrade to Pro</a> --}}
        </div>
        <script src="{{ asset('assets/vendor/libs/jquery/jquery.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/popper/popper.js') }}"></script>
        <script src="{{ asset('assets/vendor/js/bootstrap.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
        <script src="{{ asset('assets/vendor/js/menu.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/apex-charts/apexcharts.js') }}"></script>
        <script src="{{ asset('assets/js/main.js') }}"></script>
        <script src="{{ asset('assets/js/axios.min.js') }}"></script>
        <script>
            const client = axios.create({
                baseURL: '{{ env('
                APP_API_URL ') }}'
            })
            //
            const config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer {{ env('BEARER_TOKEN') }}"
                }
            }
        </script>
        <script>
            let layoutMenu = document.getElementById('layout-menu'),
                htmlTag = document.getElementsByTagName('html')[0],
                appBrandLogo = document.querySelector("a.app-brand-link > img"),
                appBrand = document.getElementsByClassName("app-brand")[0]
            //
            layoutMenu.addEventListener("mouseenter", function() {
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    // add class name
                    htmlTag.classList.add("layout-menu-hover")
                    appBrand.classList.remove("ps-0", "pe-0")
                    appBrand.querySelector("div").style.display = 'block'
                }
            })
            layoutMenu.addEventListener("mouseleave", function() {
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    // add class name
                    htmlTag.classList.remove("layout-menu-hover")
                    appBrand.querySelector("div").style.display = 'none'
                    appBrand.classList.add("ps-0", "pe-0")
                }
            })
            appBrand.children[1].addEventListener("click", function() {
                //
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    htmlTag.setAttribute("menu-collapse", "false")
                    htmlTag.classList.remove("layout-menu-collapsed")
                } else {
                    htmlTag.setAttribute("menu-collapse", "true")
                    htmlTag.classList.add("layout-menu-collapsed")
                }
                //
                appBrand.querySelector("div").style.display = 'block'

            })
        </script>
        @stack('source-monitor-js')
        @stack('new-site-monitor-js')
        @stack('worst-20-js')
        @stack('achievement-js')
        @stack('network-capacity-js')
        @stack('performance-new-infra-js')
        @stack('weekly-report-js')
    </body>

    </html>