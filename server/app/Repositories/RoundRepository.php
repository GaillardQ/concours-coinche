<?php

namespace App\Repositories;

use App\Models\Round;

class RoundRepository
{
    /**
     * Get all the teams of a contest
     *
     * @return Collection|static[]
     */
    function getAllRounds()
    {
        return Rounds::all();
    }
}