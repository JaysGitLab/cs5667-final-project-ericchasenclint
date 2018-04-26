import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContestService {
    private _baseURL = 'api/contests';

    constructor(private _http: HttpClient) {
    }

    create(contest: any): Observable<any> {
        let body = JSON.stringify(contest);
        console.log("from createcontest.server: " + body);
        return this._http.post(this._baseURL, contest);
    }
    read(contestId: string): Observable<any> {
        return this._http
            .get(`${this._baseURL}/${contestId}`);
    }


    private handleError(error: Response) {
        console.log("---Error from createcontest.server: " + error);
        return Observable.throw(error || 'Server error');
    }
};
