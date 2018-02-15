import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { UtilsService } from '../../../shared/services/utils.service';
import { JsonService } from '../../../shared/services/json.service';

import { Team } from '../../../shared/interfaces/team';
import { JSON_FILES } from '../../../shared/config/jsonFiles';

@Injectable()
export class PlayerListService {

    constructor(
        private http: Http,
        private utils: UtilsService,
        private jsonService: JsonService,
        private jsonFiles: JSON_FILES
    ) { }

    saveTeams(teams: Array<Team>): Observable<any> {
        return this.jsonService.setJSON(this.jsonFiles.file_teams, teams);
    }

    getTeams(): Observable<Array<Team>> {
        return this.jsonService.getJSON(this.jsonFiles.file_teams);
    }

}
