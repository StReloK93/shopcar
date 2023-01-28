<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Http;
use DB;
use Carbon\Carbon;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // $response = Http::post('notify.eskiz.uz/api/auth/login', [
        //     'email' => 'strelok0493@gmail.com',
        //     'password' => 'ExCXlP1uvq5SagqkiEYccDySbuBKosqOl1tVoZge',
        // ]);

        // $token = json_decode($response)->data->token;

        // DB::table('smstoken')
        // ->updateOrInsert(
        //     ['id' => 1],
        //     ['token' => $token, 'updated_at' => Carbon::now()],
        // );
    }
}
