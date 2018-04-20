<?php

namespace App\Presenters;

use App\Models\Team;

class TeamPresenter
{
    /**
     * @param $teams
     *
     * @return array
     */
    public function presentCollection($teams)
    {
        $json = [];
        foreach ($teams as $t) {
            $json[] = $this->present($t);
        }

        return $json;
    }

    /**
     * @param Team $team
     *
     * @return array
     */
    public function present(Team $team)
    {
        $json = [
            'id' => $team->id,
            'player1' => $team->player1,
            'player2' => $team->player2
        ];

        return $json;
    }

    public function reversePresent($data)
    {
        $team = new Team();

        $team->player1 = $data['player1'];
        $team->player2 = $data['player2'];

        return $team;
    }
}
