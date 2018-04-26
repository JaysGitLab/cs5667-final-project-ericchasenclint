import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { ContestService } from "../createcontest/createcontest.service";

@Component({
    selector: "contestselect",
    styleUrls: ["./contestselect.component.scss"],
    templateUrl: "./contestselect.component.html"
})
export class ContestSelectComponent{
    currentContests: any;
    message: string;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _contestService: ContestService,
    ) {}

    ngOnInit() {
        this._contestService.list()
          .subscribe(
             contests => {
                 this.currentContests = contests.slice();
             },
             error => {
                 console.log("from team.component: " + error);
                 this._router.navigate(['/']);
             }
        );
        this._route.data.subscribe(data => {
            this.message = data['msg'];
        });
    }

    selectcontest(contest){
        this._router.navigate([this._router.url, contest.year, contest.gender]);
    }
}
