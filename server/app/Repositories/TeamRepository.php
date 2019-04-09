<?php

namespace App\Repositories;

use App\Models\Team;

class TeamRepository
{
    /**
     * Get all the teams of a contest
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAllTeams()
    {
        return Team::all();
    }

    public function saveTeam(Team $team)
    {
        $team->save();
    }
}