<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SizeNameController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\ProductNamesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/sms/login', [SmsController::class, 'login']);
Route::post('/sms/sendmessage', [SmsController::class, 'sendmessage']);
Route::post('/sms/confirm', [SmsController::class, 'confirm']);


Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/user', [UserController::class, 'getUser']);
    Route::get('/logout', [UserController::class, 'logout']);
    Route::post('/passwordreset', [UserController::class, 'passwordReset']);

});




Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);

Route::apiResource('categories', CategoryController::class)->except(['show']);
Route::apiResource('sizenames', SizeNameController::class);
Route::apiResource('sizes', SizeController::class)->except(['show', 'index']);
Route::apiResource('productnames', ProductNamesController::class)->except(['show','destroy']);
Route::put('productnames/delete/{id}', [ProductNamesController::class, 'destroy']);


Route::apiResource('products', ProductController::class);


Route::apiResource('sells', SellController::class);


Route::post('/categories/sub', [CategoryController::class, 'storeSub']);