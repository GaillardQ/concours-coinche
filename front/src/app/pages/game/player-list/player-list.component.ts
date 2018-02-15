import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { JsonService } from '../../../shared/services/json.service';
import { PlayerListService } from './player-list.service';

import { Team } from '../../../shared/interfaces/team';

@Component({
    selector: 'player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

    protected addPlayerForm: FormGroup = null;
    protected playerList: Array<Team> = [];
    constructor(
        private formBuilder: FormBuilder,
        private jsonService: JsonService,
        private playerListService: PlayerListService
    ) { }

    ngOnInit() {
        this.createForm();
    }

    private createForm(): void {
        this.addPlayerForm = this.formBuilder.group({
            player1: ['', Validators.required],
            player2: ['', Validators.required]
        });
    }

    private addTeam(): void {
        let team: Team = this.map2PostData(this.addPlayerForm.value);
        this.playerList.push(team);
        this.playerListService.saveTeams(this.playerList).subscribe(
            data => console.log('Team ajoutée !'),
            error => console.log('Problème de l\'ajout d\'une équipe !')
        );
    }

    private map2PostData(form): Team {
        return {
            id: 0,
            player1: form.player1,
            player2: form.player2
        };
    }
}
