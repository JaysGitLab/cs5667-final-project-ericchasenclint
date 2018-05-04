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
  name: string = "";
  email: string = "";
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
     let regions = ["South", "East", "West", "Midwest"];
     this._contestService.byYearAndGender(year, gender)
         .subscribe(
             contest => {
                 console.log(contest);
                 this.year = contest["year"];
                 this.gender = contest["gender"];
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
          let entry = {
              name: this.name,
              email: this.email,
              RegionsBySeed: []
          }
          for (let i=0; i<16; i++){
              entry.RegionsBySeed[i] = this.selection[i].region;
          }
          console.log(entry);
          this._contestService.addEntry(this.year, this.gender, entry)
              .subscribe(
                  entry => {
                      console.log(entry);
                      alert("Thanks for your entry!");
                  },
                  error => {
                      console.log("from team.component: " + error);
                      this._router.navigate(['/']);
                  }
              );

      } else {
          alert("You must select one team for every seed, and input your name and email address.");
      }
  }
  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  validSelection(){
      if (this.name.length == 0) return false;
      if (!this.validateEmail(this.email)) return false;
      
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
