<?php
//
$menus = [
[
'id' => 1,
'type' => [
'level' => 'main-menu',
'belongTo' => null,
'hasSubmenu' => false,
],
'title' => 'Dashboard',
'slug' => 'dashboard',
'link' => url('/'),
'icon' => [
'enable' => true,
'content' => 'bx bx-home-smile',
],
],
[
'id' => 2,
'type' => [
'level' => 'main-menu',
'belongTo' => null,
'hasSubmenu' => false,
],
'title' => 'Viz (Columns)',
'slug' => 'visualization',
'link' => url('/visualization'),
'icon' => [
'enable' => true,
'content' => 'bx bx-bar-chart-alt-2',
],
],
[
'id' => 3,
'type' => [
'level' => 'main-menu',
'belongTo' => null,
'hasSubmenu' => false,
],
'title' => 'Viz (Rows)',
'slug' => 'visualization-rows',
'link' => url('/visualization-rows'),
'icon' => [
'enable' => true,
'content' => 'bx bx-bar-chart',
],
],
[
'id' => 4,
'type' => [
'level' => 'main-menu',
'belongTo' => null,
'hasSubmenu' => false,
],
'title' => 'Viz (Upgraded)',
'slug' => 'visualization-upgraded',
'link' => url('/visualization-upgraded'),
'icon' => [
'enable' => true,
'content' => 'bx bx-bar-chart-square',
],
]
];
//
function mainMenuToggle($menuArray, $menuId) {
//
$filterSubMenu = array_filter($menuArray, function($ele) use ($menuId){
return $ele['type']['level'] == 'sub-menu' && $ele['type']['belongTo'] == $menuId;
});
//
$transformSubMenu = array_map(function($ele) {
return $ele['slug'];
}, $filterSubMenu);
//
return $transformSubMenu;
}
?>
<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme d-fixed">
  <div class="app-brand demo ps-0 pe-0">
    <a href="<?php echo e(url('/')); ?>" class="app-brand-link">
      <img width="100%" height="30px" src="<?php echo e(asset('assets/img/logo/logo-icon.png')); ?>" />
      <div style="font-size: 20px; font-weight: 700; padding-left: 5px;display: none;">RANSFORMERS</div>
    </a>
    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
      <i class="bx bx-chevron-right bx-sm d-flex align-items-center justify-content-center"></i>
    </a>
  </div>
  <div class="menu-inner-shadow"></div>
  <ul class="menu-inner py-1">
    <?php $__currentLoopData = $menus; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $menu): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <?php if($menu['type']['level'] == 'main-menu'): ?>
    <li class="<?php echo \Illuminate\Support\Arr::toCssClasses([ 'menu-item' , 'active'=> in_array($segment, array_merge([$menu['slug']], mainMenuToggle($menus, $menu['id']))),
      'open' => in_array($segment, array_merge([$menu['slug']], mainMenuToggle($menus, $menu['id']))),
      ]); ?>">
      <a href="<?php echo e($menu['link']); ?>" target="_self" class="<?php echo \Illuminate\Support\Arr::toCssClasses([ 'menu-link' , 'menu-toggle'=> $menu['type']['hasSubmenu'] == true,
        ]); ?>">
        <i class="<?php echo \Illuminate\Support\Arr::toCssClasses(['menu-icon', 'tf-icons' , $menu['icon']['content']]); ?>"></i>
        <div class="text-truncate" data-i18n="<?php echo e($menu['title']); ?>"><?php echo e($menu['title']); ?></div>
      </a>
      <?php if($menu['type']['level'] == 'main-menu' && $menu['type']['hasSubmenu'] == true): ?>
      <ul class="menu-sub">
        <?php $__currentLoopData = $menus; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $submenu): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php if($submenu['type']['level'] == 'sub-menu' && $submenu['type']['belongTo'] == $menu['id']): ?>
        <li class="<?php echo \Illuminate\Support\Arr::toCssClasses([ 'menu-item' , 'active'=> $segment == $submenu['slug']
          ]); ?>" >
          <a href="<?php echo e($submenu['link']); ?>" target="_self" class="menu-link">
            <div class="text-truncate" data-i18n="<?php echo e($submenu['title']); ?>">
              <?php echo e($submenu['title']); ?>

            </div>
            
          </a>
        </li>
        <?php endif; ?>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
      </ul>
      <?php endif; ?>
    </li>
    <?php endif; ?>
    
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <!-- Layouts -->
    
  </ul>
</aside><?php /**PATH /home/laboge/new-transformers-template/resources/views/components/menu.blade.php ENDPATH**/ ?>