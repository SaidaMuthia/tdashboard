<nav
    class="container-xxl layout-navbar navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme"
    id="layout-navbar">
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
        <a class="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
            <i class="bx bx-menu bx-md"></i>
        </a>
    </div>
    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <!-- Search -->
        <div class="navbar-nav align-items-center">
            <div class="nav-item d-flex align-items-center">
                <i class="bx bx-search bx-md"></i>
                <input id="name-city-id-1" type="text" data-bs-toggle="dropdown" class="form-control border-0 shadow-none ps-1 ps-sm-2 text-uppercase w-px-700" placeholder="pencarian kota/kabupaten/kordinat/site id"
                    aria-label="Search" />
                <div class="dropdown-menu p-0" id="list-group-1" style="position:absolute;top: 4.5rem; max-height: 480px;">
                    <ul class="list-group" id="list-group-list-1"></ul>
                </div>
            </div>
        </div>
        <!-- /Search -->
        <ul class="navbar-nav flex-row align-items-center ms-auto">
            <!-- Place this tag where you want the button to render. -->
            
            <li class="nav-item lh-1 me-4"> </li>
            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <a class="nav-link dropdown-toggle hide-arrow p-0" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online">
                        <img src="<?php echo e(asset('assets/img/avatars/avatar-pace-1.jpg')); ?>" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <a class="dropdown-item" href="#">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <div class="avatar avatar-online">
                                        <img src="<?php echo e(asset('assets/img/avatars/avatar-pace-1.jpg')); ?>" alt
                                            class="w-px-40 h-auto rounded-circle" />
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="mb-0"><?php echo e(session('additional_u_info')); ?></h6>
                                    
                                    <small class="text-muted">Admin</small>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <div class="dropdown-divider my-1"></div>
                    </li>
                    <li>
                        <a class="dropdown-item" href="/logout">
                            <i class="bx bx-power-off bx-md me-3"></i><span>Log Out</span>
                        </a>
                    </li>
                </ul>
            </li>
            <!--/ User -->
        </ul>
    </div>
</nav><?php /**PATH D:\MAIN\COLLEGE LIFE\Kerja Praktik atau Magang\Tsel\code\tdashboard\resources\views/components/navbar.blade.php ENDPATH**/ ?>