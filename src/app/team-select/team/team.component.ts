import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { ContestService } from "../../createcontest/createcontest.service";

import { seedText } from "./data/data";

@Component({
  selector: "team", // <team></team>
  styleUrls: ["./team.component.scss"],
  templateUrl: "./team.component.html"
})
export class TeamComponent {
  paramsObserver: any;
  teamsReady = false;
  teams = [];
  seedText = seedText;
  selection = [];
  year = false;
  gender = false;

  @Output() sendSelections = new EventEmitter<any>();

  constructor(
      private _router: Router,
      private _contestService: ContestService,
      private _route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.paramsObserver = this._route.parent.params.subscribe(params => {
          let contestId = params['contestId'];
          console.log("contestId from TeamComponent: " + contestId);
      });
      this.loadContests("5add3d037ab5003ee77c7d4e");
  }

  loadContests(contestId: string){
     let regions = ["North", "South", "East", "West"];
     this._contestService.read(contestId)
         .subscribe(
             contest => {
                 this.year = contest["year"];
                 this.gender = contest["gender"];
                 for (var seed = 0; seed<16; seed++){
                     this.teams[seed] = [];
                     for (var regionIdx = 0; regionIdx < 4; regionIdx++){
                        this.teams[seed][regionIdx] = contest[(seed+1)+regions[regionIdx]];
                     }
                 }
                 this.teamsReady = true;
             },
             error => {
                 console.log("from team.component: " + error);
                 this._router.navigate(['/']);
             }
         );

  }

  addTeamAndSend(team, index) {
    this.selection[index] = team;
    this.sendSelections.emit(this.selection);
  }

  showSelectedTeam(team) {
    let t = this.selection.find(t => {
      return t === team;
    });
    return t;
  }
}
