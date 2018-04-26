import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bracket } from './bracket';

import { ContestService } from '../createcontest/createcontest.service';

@Component({
    selector: 'updatebracket',
    templateUrl: './updatebracket.component.html',
    styleUrls: ['updatebracket.component.scss'],
    providers: [ContestService]
})
export class UpdateBracketComponent implements OnInit{
    bracket: Bracket;
    regions: any[] = ["South", "East", "West", "Midwest"];
    seeds: number[] = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];

    constructor (private _router: Router,
        private _contestService: ContestService) {
    }

    ngOnInit() {
        let teams = [];
        for (let i=0; i<4; i++){
            for (let j=0; j<16; j++){
                teams.push(this.seeds[j] + this.regions[i]);
            }
            this.regions[i] = {name: this.regions[i]};
        }
        this.bracket = new Bracket(null, teams, 1);
        this.regions[0].bracket = this.bracket.a.a;
        this.regions[1].bracket = this.bracket.a.b;
        this.regions[2].bracket = this.bracket.b.a;
        this.regions[3].bracket = this.bracket.b.b;


    }


}

