@php
    $requestSegment = request()->segment(count(request()->segments()));
    $segment = $requestSegment <> '' ? $requestSegment : 'visualization';
@endphp
<!doctype html>
<html lang="en"
    class="light-style layout-navbar-fixed layout-compact layout-menu-fixed layout-menu-collapsed"
    dir="ltr"
    data-theme="theme-default"
    data-assets-path="/assets/"
    data-template="vertical-menu-template-free"
    data-style="light"
    menu-collapse="true">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <title inertia>TRANS4MERS Dashboard</title>
    <meta name="description" content="Telco Performance Dashboard" />
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/logo/logo-icon.png') }}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/boxicons.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/core.css') }}" class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/theme-default.css') }}" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="{{ asset('assets/css/demo.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />
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
    @inertiaHead
    @vite(['resources/js/app.js'])
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
                        @inertia
                    </div>
                    <!-- / Content -->
                    <!-- Footer -->
                    <footer class="content-footer footer bg-footer-theme">
                        <div class="container-fluid">
                            <div class="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                                <div class="text-body">
                                    © <script>document.write(new Date().getFullYear())</script>, made with ❤️ by
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
    <script src="{{ asset('assets/js/main.js') }}"></script>
    <script>
        (function () {
            var layoutMenu = document.getElementById('layout-menu');
            var htmlTag = document.getElementsByTagName('html')[0];
            var appBrand = document.getElementsByClassName("app-brand")[0];
            if (!layoutMenu || !appBrand) return;

            layoutMenu.addEventListener("mouseenter", function () {
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    htmlTag.classList.add("layout-menu-hover");
                    appBrand.classList.remove("ps-0", "pe-0");
                    appBrand.querySelector("div").style.display = 'block';
                }
            });
            layoutMenu.addEventListener("mouseleave", function () {
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    htmlTag.classList.remove("layout-menu-hover");
                    appBrand.querySelector("div").style.display = 'none';
                    appBrand.classList.add("ps-0", "pe-0");
                }
            });
            appBrand.children[1].addEventListener("click", function () {
                if (htmlTag.getAttribute("menu-collapse") === "true") {
                    htmlTag.setAttribute("menu-collapse", "false");
                    htmlTag.classList.remove("layout-menu-collapsed");
                } else {
                    htmlTag.setAttribute("menu-collapse", "true");
                    htmlTag.classList.add("layout-menu-collapsed");
                }
                appBrand.querySelector("div").style.display = 'block';
            });
        })();
    </script>
</body>

</html>