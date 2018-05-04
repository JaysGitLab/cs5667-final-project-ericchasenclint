import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { ContestService } from "../createcontest/createcontest.service";

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


  constructor(
      private _router: Router,
      private _contestService: ContestService,
      private _route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.paramsObserver = this._route.params.subscribe(params => {
          let year = params['year'];
          let gender = params['gender'];
          this.loadContests(year, gender);
      });
  }

  loadContests(year, gender){
     this._contestService.byYearAndGender(year, gender)
         .subscribe(
             contest => {
                 console.log(contest);
                 this.year = contest["year"];
                 this.gender = contest["gender"];
                 let regions = contest["regions"];
                 for (var seed = 1; seed<=16; seed++){
                     this.teams[seed-1] = [];
                     for (var regionIdx = 0; regionIdx < 4; regionIdx++){
                        let region = regions[regionIdx];
                        let team = {
                            seed: seed,
                            region: region
                        }
                        this.teams[seed-1][regionIdx] = team;
                        team["name"] = contest
                            .seeds[seed][regions[regionIdx]].name;
                     }
                 }
                 this.teamsReady = true;
                 console.log
             },
             error => {
                 this._router.navigate(['/']);
             }
         );

  }

  addTeam(team, index) {
    this.selection[index] = team;
  }

  showSelectedTeam(team) {
    let t = this.selection.find(t => {
      return t === team;
    });
    return t;
  }

  submitSelection() {
      console.log(this.selection);
      if (this.validSelection()){
          alert("All teams are in!\nThat's a valid selection. \nWe need to store it in the db.");
      } else {
          alert("You must select one team for every seed");
      }
  }

  validSelection(){
      if (this.selection.length !== 16){
          return false;
      }
      for (var i=0; i<16; i++){
          if (!this.selection[i]){
              return false;
          }
      }
      return true;

  }
}
