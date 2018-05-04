import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'

import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';

@Injectable()
export class ContestService {
    private _baseURL = 'api/contests';
    
    constructor(private _http: Http){
    }

    create(contest: any): Observable<any>{
        let body = JSON.stringify(contest);
        return this._http.post(this._baseURL, contest)
            .map((res : Response)  => res.json())
            .catch(this.handleError);
    }
    list(): Observable<any> {
        return this._http
            .get(`${this._baseURL}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    read(contestId: string): Observable<any> {
        return this._http
            .get(`${this._baseURL}/${contestId}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    byYearAndGender(year, gender): Observable<any> {
        return this._http
            .get(this._baseURL + "/" + year + "/" + gender)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    addEntry(year, gender, entry): Observable<any>{
        return this._http
            .post(`${this._baseURL}/enter/${year}/${gender}`, entry)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }


    private handleError(error: Response ) {
        console.log("---Error from createcontest.server: " + error.json().message);
        return Observable.throw(error.json().message || 'Server error');
    }
};
