import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PersistenceService, StorageType } from 'angular-persistence';

import { Observable } from 'rxjs/Observable';

import { UtilsService } from './utils.service';

@Injectable()
export class JsonService {

    private host = 'http://api.coinche.local';

    constructor(
        private http: Http,
        private utils: UtilsService,
        private persistenceService: PersistenceService
    ) { }

    getJSON(fileName: string): Observable<any> {
        return this.http.get("../../../json/" + fileName)
            .map((res:any) => res.json())
            .catch(this.utils.handleWsError.bind(this.utils));
    }
    setJSON(fileName: string, data: any): Observable<any> {
        return this.http
            .post(this.host + '/write.php', { data: JSON.stringify(data), fileName: fileName })
            .map((res) => res.json())
            .catch(this.utils.handleWsError.bind(this.utils));
    }
}
