<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/members', function () use ($router) {
    $members = App\Models\Member::with('subscription:id,name,price')->get();
    return response()->json(['error' => false, 'data' => $members]);
});

$router->get('/app', function () use ($router) {
    return view('app');
});
