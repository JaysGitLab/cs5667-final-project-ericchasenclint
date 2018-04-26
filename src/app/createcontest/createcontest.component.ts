import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TeamDropdownComponent} from './team-dropdown/team-dropdown.component';
import { ContestService } from './createcontest.service';

@Component({
    selector: 'createcontest',
    templateUrl: './createcontest.component.html',
    styleUrls: ['createcontest.component.scss'],
    providers: [ContestService]
})
export class CreateContestComponent implements OnInit{
    regions: string[] = ["South", "East", "West", "Midwest"];
    seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    showInvalidWarning = false;

    errorMessage: string;

    contestform: FormGroup;

    constructor (private fb: FormBuilder, private _router: Router,
        private _contestService: ContestService) {
    }

    ngOnInit() {
        let seedFormArrays = [];
        
        this.contestform = this.fb.group({
            year: this.fb.control((new Date()).getFullYear(), Validators.required),
            gender: this.fb.control(null, Validators.required),
        });
        for (let seed of this.seeds){
            for (let region of this.regions ){
                this.contestform.addControl(seed + region, TeamDropdownComponent.buildFormGroup());
            }
        }
    }

    genderClass(){
        if (!this.contestform.get('gender').valid && this.contestform.get('gender').dirty){
            return 'mat-input-invalid';
        } else {
            return '';
        }
    }

    prepareSaveContest(): any{
//        return JSON.stringify(this.contestform.getRawValue());
        let out = {};
        out["year"] = this.contestform.get('year').value;
        out["gender"] = this.contestform.get('gender').value;
        out["seeds"] = [];
        for (let seed of this.seeds){
            let seedObj = {};
            out["seeds"][seed] = seedObj;
            for (let region of this.regions ){
                let obj = {};
                obj["name"] = this.contestform.get(seed+region).get('teamFormCtrl').value;
                obj["wins"] = 0;
                obj["stillIn"] = true;
                seedObj[region] = obj;
            }
        }
        return out;
    }
    onSubmit() {
        if (this.contestform.valid) {
            this.showInvalidWarning = false;
            let contest = this.prepareSaveContest();
            this._contestService
                .create(contest)
                .subscribe(createdContest => this._router.navigate(['/']),
                        error => this.errorMessage = error);
        } else {
            this.showInvalidWarning = true;
            for (let parent in this.contestform.controls){
                let controlGrp = this.contestform.get(parent);
                if (controlGrp instanceof FormGroup){
                    for (let key in controlGrp.controls){
                        controlGrp.get(key).markAsDirty();
                    }
                }else {
                    console.log(controlGrp);
                    controlGrp.markAsDirty();
                }
            }
        }
    }

    yeargenderchange() {
        let year = this.contestform.get('year').value;
        let gender = this.contestform.get('gender').value;
        let overwritewarning = "A " + year + " " + gender + "'s contest "
            + "already exists.\n\nIf you submit a new one, it will "
            + "overwrite the old one.\n\nProceed with caution.";
        if (year && gender) {
            this._contestService
                .byYearAndGender(year, gender)
                .subscribe(oldContest => {
                    if(oldContest){
                        alert(overwritewarning);
                    }
                },
                error =>{})
        }
    }
}

