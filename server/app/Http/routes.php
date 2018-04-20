<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function () {
    Route::group(['prefix' => 'teams'], function () {
        Route::get('/all', ['uses' => 'TeamController@getContestTeams', 'as' => 'api.teams.all']);
        Route::post('/add', ['uses' => 'TeamController@addContestTeam', 'as' => 'api.teams.add']);
    });
    Route::group(['prefix' => 'rounds'], function () {
        Route::get('/all', ['uses' => 'RoundController@getContestRounds', 'as' => 'api.rounds.all']);
    });
});
