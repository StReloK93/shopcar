<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SizeNameController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\ProductNamesController;
use App\Http\Controllers\ProductController;
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


Route::apiResource('categories', CategoryController::class);
Route::apiResource('sizenames', SizeNameController::class);
Route::apiResource('sizes', SizeController::class);
Route::apiResource('productnames', ProductNamesController::class);
Route::apiResource('products', ProductController::class);
Route::post('/categories/sub', [CategoryController::class, 'storeSub']);