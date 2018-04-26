import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
    public user = window['user'];

    private _signinURL = 'api/auth/signin';
    private _signupURL = 'api/auth/signup';

    constructor(private http: HttpClient) {
    }

    isLoggedIn(): boolean {
        return (!!this.user);
    }

    signin(credentials: any): Observable<any> {
        let body = JSON.stringify(credentials);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this._signinURL, body);
    }

    signup(user: any): Observable<any> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this._signupURL, body);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}   
