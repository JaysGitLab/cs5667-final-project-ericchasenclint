import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TeamDropdownComponent} from './team-dropdown/team-dropdown.component';
import { ContestService } from './createcontest.service';

import { ContestInfo } from './contestinfo'

@Component({
    selector: 'createcontest',
    templateUrl: './createcontest.component.html',
    styleUrls: ['createcontest.component.scss'],
    providers: [ContestService]
})
export class CreateContestComponent implements OnInit{
    regions: string[] = ["North", "South", "East", "West"];
    seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    showInvalidWarning = false;

    errorMessage: string;
    contestinfo : ContestInfo = new ContestInfo();

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
        for (let seed of this.seeds){
            for (let region of this.regions ){
                out[seed+region] = this.contestform.get(seed+region).get('teamFormCtrl').value;
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
//                .subscribe(createdContest => this._router.navigate(['/select', createdContest._id]),
//                        error => this.errorMessage = error);
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
}
