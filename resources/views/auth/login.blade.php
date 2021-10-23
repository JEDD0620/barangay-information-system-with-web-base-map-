@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card flex-column mt-5 mt-md-5 border-0">

                <div class="card-body">
                    <div class="row">
                        <div class="col-12 text-center mb-4 text-primary">
                            <img class="log-icon m-0 mb-3" src="/images/profile/user-circle-solid.svg" alt="">
                            <h2>Login User</h2>
                        </div>
                    </div>
                    <form method="POST" action="{{ route('login') }}">
                        <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">

                        <div class="form-group">
                            <!-- <label for="username" class="col-md-4 col-form-label text-md-right">{{ __('Username') }}</label> -->

                            <div class="col-md-12">
                                <input placeholder="enter username ..." id="username" type="username" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>

                                @error('username')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <!-- <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label> -->

                            <div class="col-md-12">
                                <input placeholder="enter password ..." id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label text-warning" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-0">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-block btn-success">
                                    {{ __('Login') }}
                                </button>

                            </div>
                        </div>

                        <div class="form-group mb-0">
                            <div class="col-md-12 ">
                                @if (Route::has('password.request'))
                                <a class="btn btn-link float-right p-0 mt-2" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a>
                                @endif

                                @if (Route::has('register'))
                                <a class="btn btn-link p-0 mt-2" href="{{ route('register') }}">{{ __('Register') }}</a>
                                @endif

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection