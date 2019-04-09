<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\RoundRepository;

class RoundController extends Controller
{
    private $teamRepo;

    /**
     * TeamController constructor.
     * @param TeamRepository $teamRepo
     */
    public function __construct(
        RoundRepository $roundRepo
    ) {
        $this->roundRepo = $roundRepo;
    }

    /**
     * Get all the rounds of a contest
     *
     * @return Response
     */
    public function getContestRounds()
    {
        $rounds = $this->roundRepo->getAllTeams();

        return response()->json(['name' => 'Abigail', 'state' => 'CA']);
    }
}