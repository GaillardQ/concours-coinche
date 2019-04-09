<?php

namespace App\Http\Controllers;

use App\Presenters\TeamPresenter;
use App\Repositories\TeamRepository;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    private $teamRepo;
    private $teamPresenter;

    /**
     * TeamController constructor.
     *
     * @param TeamRepository $teamRepo
     * @param TeamPresenter $teamPresenter
     */
    public function __construct(
        TeamRepository $teamRepo,
        TeamPresenter $teamPresenter
    ) {
        $this->teamRepo = $teamRepo;
        $this->teamPresenter = $teamPresenter;
    }

    /**
     * Get all the teams of a contest
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getContestTeams()
    {
        $teams = $this->teamRepo->getAllTeams();
        $json = $this->teamPresenter->presentCollection($teams);
        return response()->json($json);
    }

    /**
     * @param Request $request
     */
    public function addContestTeam(Request $request)
    {
        $team = $this->teamPresenter->reversePresent($request->all());
        $this->teamRepo->saveTeam($team);
    }
}
