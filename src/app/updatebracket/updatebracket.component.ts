import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ContestService } from './createcontest.service';

@Component({
    selector: 'updatebracket',
    templateUrl: './updatebracket.component.html',
    styleUrls: ['updatebracket.component.scss'],
    providers: [ContestService]
})
export class UpdateBracketComponent implements OnInit{
    regions: string[] = ["North", "South", "East", "West"];
    seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    constructor (private _router: Router,
        private _contestService: ContestService) {
    }

    ngOnInit() {

    }


}

