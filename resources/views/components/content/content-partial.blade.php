
@switch($segment)
    {{-- new site monitoring page --}}
    @case('new-site-monitoring')
        @include('new-site-monitoring')
        @break
    {{-- worst page --}}
    @case('worst-20')
        @include('worst-20')
        @break
    {{-- achievement page --}}
    @case('achievement')
        @include('achievement')
        @break
    {{-- network capacity --}}
    @case('network-capacity')
        @include('network-capacity')
        @break
    {{-- performance new infra --}}
    @case('performance-new-infra')
        @include('performance-new-infra')
        @break
    {{-- site trend performance --}}
    @case('site-trend-performance')
        @include('site-trend-performance')
        @break
    {{-- pdf viewer page --}}
    @case('pdf')
        @include('pdf-viewer')
        @break
    {{-- weekly report --}}
    @case('weekly-report')
        @include('weekly-report')
        @break
    {{-- rci dashboard page --}}
    @case('rci-dashboard')
        <x-embed >
            <x-slot:title>RCI Dashboard</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/NPACA4-RCIPamasuka/RCI' width='1600' height='940' hide-tabs toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('rci-prioritazion')
        <x-embed>
            <x-slot:title>RCI Prioritazion</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/RCIPRIORITY/RCIPRIO' width='1600' height='940' hide-tabs toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('2g-utilization')
        <x-embed>
            <x-slot:title>2G Utilization</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/NPACA4-2GTCHUtil/2GTCHUTIL' width='1600' height='940' hide-tabs toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('4g-utilization')
        <x-embed>
            <x-slot:title>4G Utilization</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/NPACA4-4GUtilization_17300948740290/4GUtilization' width='1600' height='963' toolbar='bottom' ></tableau-viz>
        </x-embed>
    @case('availability-dpg')
        <x-embed>
            <x-slot:title>Availability DPG</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/05_Availability/Availability' width='1600' height='940' hide-tabs toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('red-transport')
        <x-embed>
            <x-slot:title>Red Transport</x-slot:title>
            <script type='module' src='https://tableau.network.telkomsel.co.id/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://tableau.network.telkomsel.co.id/views/NPACA4-RedTransport/Dashboard1' width='1600' height='940' hide-tabs toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('post-implementation-analysis')
        <x-embed>
            <x-slot:title>Post Implementation Analysis</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/18_PostImplementationAnalysis/PIADashboard' width='1600' height='940' hide-tabs toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('network-benchmark')
        <x-embed>
            <x-slot:title>Network Benchmark</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/15_CompetitorMarket/CompetitorMarketBranchLevel3' width='1600' height='963' toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('customer-experience')
        <x-embed>
            <x-slot:title>Customer Experience</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/NPACA4-TutelaScore/MapTutela' width='1600' height='963' toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('packet-loss')
        <x-embed>
            <x-slot:title>Packet Loss</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/NPACA4-RedTransport/Dashboard1' width='1600' height='940' hide-tabs toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('new-infra')
        <x-embed>
            <x-slot:title>New Infra</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/17_PIANewInfra/NewInfraProductivity' width='1600' height='963' toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('enterprise-dashboard')
        <x-embed>
            <x-slot:title>Enterprise Dashboard</x-slot:title>
        </x-embed>
        @break

    @case('payload-achievement')
        <x-embed>
            <x-slot:title>Payload Achievement</x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/AchievementPayloadKabupaten/RawData' width='2108' height='1091' toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break

    @case('new-infra-mv-non-kkst')
        <x-embed>
            <x-slot:title>New Infra MV Non </x-slot:title>
            <script type='module' src='https://avp.network.telkomsel.co.id:8065/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://avp.network.telkomsel.co.id:8065/views/MVNONKKST/Dashboard1/2408fe1a-c755-4c1e-b896-edf002327cfa/741a548d-65f5-4cda-8c05-29b72afb9daa' width='1600' height='940' hide-tabs toolbar='bottom' ></tableau-viz>
        </x-embed>
        @break


    @default
        @include('source-monitor')
        @break

@endswitch
