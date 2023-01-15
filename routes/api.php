<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('categories', CategoryController::class)->except(['show']);
Route::apiResource('sizenames', SizeNameController::class);
Route::apiResource('sizes', SizeController::class)->except(['show', 'index']);
Route::apiResource('productnames', ProductNamesController::class)->except(['show']);
Route::apiResource('products', ProductController::class);


Route::apiResource('sells', SellController::class);


Route::post('/categories/sub', [CategoryController::class, 'storeSub']);