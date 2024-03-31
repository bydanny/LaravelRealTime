@extends('layouts.app')
@push('styles')
    <style type="text/css">
        @keyframes rotate {
            from {
                transform: rotate(0deg)
            }
            to {
                transform: rotate(360deg)
            }
        }

        .refresh {
            animation: rotate 1.5s linear infinite;
        }
    </style>
@endpush
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Game</div>

                <div class="card-body">
                    <div class="text-center">
                        <img src="{{ asset('img/circle.png')}}" id="circle" width="250" height="250">
                        
                        <p id="winner" class="display-1 d-none text-primary"></p>
                        <hr>

                        <div class="text-center">
                            <label class="fonr-weight-bold h5">Your bet</label>
                            <select id="bet" class="form-select">
                                <option selected >Not in</option>
                                @foreach(range(1, 12) as $number)
                                    <option value=""> {{$number}} </option>
                                @endforeach
                            </select>
                            <hr>
                            <p  class="fonr-weight-bold h5">Remaining Time</p>
                            <p id="timer"  class="h5 text-danger">Waiting to start</p>
                            <hr>
                            <p id="result" class="h1"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

{{-- 
@push('scripts')
<script>
    const circleElement = document.getElementById('circle');
    const timerElement = document.getElementById('timer');
    const winnerElement = document.getElementById('winner');
    const betElement = document.getElementById('bet');
    const resultElement = document.getElementById('result');

    Echo.channel('game')
    .listen('RemainingTimeChanged', (e) => {
        timerElement.innerText = e.time;
        // Girar ruleta
        circleElement.classList.add('refresh');
        // Ocultar numero ganador
        winnerElement.classList.add('d-none');

        resultElement.innerText = '';

        winnerElement.classList.remove('text-success');
        winnerElement.classList.remove('text-danger'); 

        
    })
    .listen('WinnerNumberGenerated', (e) =>{

    });

</script>
@endpush 
--}}