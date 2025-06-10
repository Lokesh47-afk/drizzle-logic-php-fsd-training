<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



 //use App\Http\Controllers\Api\UserController;
 Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::get('{id}', [UserController::class, 'show']);
    Route::put('{id}', [UserController::class, 'update']);
    Route::delete('{id}', [UserController::class, 'destroy']);

 });

    Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'indexs']);
    Route::post('/', [ProductController::class, 'stores']);
    Route::get('{id}', [ProductController::class, 'shows']);
    Route::put('{id}', [ProductController::class, 'updates']);
    Route::delete('{id}', [ProductController::class, 'destroys']);
    });

    Route::prefix('orders')->group(function () {
    Route::get('/', [ProductController::class, 'indexs']);
    Route::post('/', [ProductController::class, 'stores']);
    Route::get('{id}', [ProductController::class, 'shows']);
    Route::put('{id}', [ProductController::class, 'updates']);
    Route::delete('{id}', [ProductController::class, 'destroys']);
    });