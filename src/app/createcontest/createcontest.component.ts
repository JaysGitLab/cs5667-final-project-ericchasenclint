import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TeamDropdownComponent} from './team-dropdown/team-dropdown.component';
//import { CreateContestService } from './createcontest.service';

import { ContestInfo } from './contestinfo'

@Component({
    selector: 'createcontest',
    templateUrl: './createcontest.component.html',
    styleUrls: ['createcontest.component.scss']
})
export class CreateContestComponent {
    regions: string[] = ["North", "South", "East", "West"];
    seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    year: number = 1999;

    errorMessage: string;
    contestinfo : ContestInfo = new ContestInfo();

    constructor () {
        this.year = (new Date()).getFullYear();
    }
    /*constructor (private _createcontestService: CreateContestService,
                 private _router: Router) { }

    createcontest() {
        this._createcontestService.createcontest(this.contestinfo)
                .subscribe(
                    result => this._router.navigate(['/']),
                    error  => this.errorMessage - error );
                );
    }*/
}
