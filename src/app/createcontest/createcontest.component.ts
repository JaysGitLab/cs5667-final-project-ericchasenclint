import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TeamDropdownComponent} from './team-dropdown/team-dropdown.component';
//import { CreateContestService } from './createcontest.service';

import { ContestInfo } from './contestinfo'

@Component({
    selector: 'createcontest',
    templateUrl: './createcontest.component.html',
    styleUrls: ['createcontest.component.scss']
})
export class CreateContestComponent implements OnInit{
    regions: string[] = ["North", "South", "East", "West"];
    seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    showInvalidWarning = false;

    errorMessage: string;
    contestinfo : ContestInfo = new ContestInfo();

    contestform: FormGroup;

    constructor (private fb: FormBuilder) {
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

    
    
    onSubmit() {
        if (this.contestform.valid) {
            alert("form is valid");
            this.showInvalidWarning = false;
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
