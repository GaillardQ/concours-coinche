import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilsService {

    constructor() { }

    handleWsError(error: Response | any): Observable<{ code: number, message: string }> {
        let errObject: { code: number, message: string };
        let code = 500;
        let message = '';
        try {
            if (error instanceof Response) {
                const body = error.json() || {};
                code = body.statusCode || 0;
                message = body.errorMessage || '';
            } else {
                message = JSON.stringify(error) || '';
            }
        } catch (e) {
        }

        errObject = {
            code: code,
            message: message
        };

        return Observable.throw(errObject);
    }
}
