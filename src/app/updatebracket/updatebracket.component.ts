import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bracket, Team } from './bracket';

import { ContestService } from '../createcontest/createcontest.service';

@Component({
    selector: 'updatebracket',
    templateUrl: './updatebracket.component.html',
    styleUrls: ['updatebracket.component.scss'],
    providers: [ContestService]
})
export class UpdateBracketComponent implements OnInit{
    teamsReady = false;
    bracket: Bracket;
    regions: any[] = ["South", "East", "West", "Midwest"];
    seeds: number[] = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];
    year: number;
    gender: string;

    constructor(
        private _router: Router,
        private _contestService: ContestService,
        private _route: ActivatedRoute
    ) {}
  
    ngOnInit() {
        let teams = [];
        this._route.params.subscribe(params => {
            let year = params['year'];
            let gender = params['gender'];
            this.loadContests(year, gender);
        });
    }

    isValid(){
        for (let position of this.bracket.positions){
            if (position.impossible){
                return false;
            }
        }
        return true;
    }

    onSubmit(){
        if (this.isValid()){

        }else{
            alert("Somewhere you've got an impossible configuration. It will have a red background");
        }
    }

  onContestLoaded(contest){
        this.year = contest["year"];
        this.gender = contest["gender"];

        let teams: Team[] = [];
        for (let i=0; i<4; i++){
            for (let j=0; j<16; j++){
                let team = new Team("", this.seeds[j], this.regions[i]);
                team.name = contest.seeds[team.seed][team.region].name;
                teams.push(team);
            }
            this.regions[i] = {name: this.regions[i]};
        }
        this.bracket = new Bracket(null, teams, 1);
        this.regions[0].bracket = this.bracket.a.a;
        this.regions[1].bracket = this.bracket.a.b;
        this.regions[2].bracket = this.bracket.b.a;
        this.regions[3].bracket = this.bracket.b.b;
        this.teamsReady = true;


  }
  loadContests(year, gender){
     this._contestService.byYearAndGender(year, gender)
         .subscribe(contest => this.onContestLoaded(contest),
             error => {
                 this._router.navigate(['/']);
             }
         );

  }

}

