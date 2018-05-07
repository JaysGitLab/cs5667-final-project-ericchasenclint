import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bracket, Team } from './bracket';

import { ContestService } from '../createcontest/createcontest.service';

import { LocalStorage } from 'ngx-store';

@Component({
    selector: 'updatebracket',
    templateUrl: './updatebracket.component.html',
    styleUrls: ['updatebracket.component.scss'],
    providers: [ContestService]
})
export class UpdateBracketComponent implements OnInit{
    teamsReady = false;
    regions = [];
    the64: Bracket[] = [];
    bracket: Bracket;
    seeds: number[] = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];
    year: number;
    gender: string;
    errorMessage: string;
    @LocalStorage('user') user: any;  
    
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
        for (let node of this.bracket.subtree){
            if (node.impossible){
                return false;
            }
        }
        return true;
    }

    onSubmit(){
        if (!this.isValid()){
            alert("Somewhere you've got an impossible configuration. It will have a red background");
            return;
        }
        let contest = {
            year: this.year,
            gender: this.gender,
            seeds: []
        }
        for (let i = 1; i <= 16; i++){
            contest.seeds[i] = {};
        }
        for (let node of this.the64){
            let team: Team = node.team;
            team.wins = 0;
            while(node.up && node.up.team === team){
                node = node.up;
                team.wins++;
            }
            if(node.up && node.up.team != Team.nullTeam){
                team.stillIn = false;
            }
            contest.seeds[team.seed][team.region] = {
                name: team.name,
                wins: team.wins,
                stillIn: team.stillIn
            }
        }
        console.log(contest);
        this._contestService.create(contest).subscribe(
            createdContest => this._router.navigate(['/']),
                error => {
                    this.errorMessage = error;
                    console.log(this.errorMessage);
                }
            );
    }

  onContestLoaded(contest){
        this.year = contest["year"];
        this.gender = contest["gender"];
        this.regions = contest["regions"];

        let teams: Team[] = [];
        for (let i=0; i<4; i++){
            for (let j=0; j<16; j++){
                let seed = this.seeds[j];
                let region = contest.regions[i];
                let contestteam = contest.seeds[seed][region];
                let team: Team = new Team(contestteam.name,
                    seed,
                    region,
                    contestteam.stillIn,
                    contestteam.wins
                );

                teams.push(team);
            }
            contest.regions[i] = {name: contest.regions[i]};
        }
        this.bracket = new Bracket(null, teams, 1, this.the64);
        contest.regions[0].bracket = this.bracket.a.a;
        contest.regions[1].bracket = this.bracket.a.b;
        contest.regions[2].bracket = this.bracket.b.a;
        contest.regions[3].bracket = this.bracket.b.b;
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

