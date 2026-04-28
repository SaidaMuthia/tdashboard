<div class="col-md-6 col-lg-4" {{ $attributes }}>
    <div class="card h-100">
        <img class="card-img-top" src="../assets/img/elements/2.jpg" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">{{ $cardTitle }}</h5>
        <p class="card-text">{{ $cardText }}</p>
        <p>{{ $cardTitleCheck($cardTitle) ? 'Oke, CardTitle Equal' : 'Not yet' }}</p>
        {{-- <p>{{ $request }}</p> --}}
        <a href="javascript:void(0)" class="btn btn-outline-primary">Go somewhere</a>
        </div>
    </div>
</div>
