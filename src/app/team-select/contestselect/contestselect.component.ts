import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { ContestService } from "../../createcontest/createcontest.service";

@Component({
    selector: "contestselect",
    styleUrls: ["./contestselect.component.scss"],
    templateUrl: "./contestselect.component.html"
})
export class ContestSelectComponent{
    currentContests: any;

    constructor(
        private _router: Router,
        private _contestService: ContestService,
    ) {}

    ngOnInit() {
        this._contestService.list()
          .subscribe(
             contests => {
                 console.log(contests);

                 this.currentContests = contests.slice();
             },
             error => {
                 console.log("from team.component: " + error);
                 this._router.navigate(['/']);
             }
        );
    }

    selectcontest(contest){
        this._router.navigate(['/entercontest', contest.year, contest.gender]);
    }
}
