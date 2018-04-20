import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateContestRoutes } from './createcontest.routes';
import { CreateContestComponent} from './createcontest.component';
import { TeamDropdownComponent } from './team-dropdown/team-dropdown.component';

import {
  MatAutocompleteModule,
  MatInputModule,
  MatMenuModule,
  MatRippleModule,
  MatSortModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSortModule,
        RouterModule.forChild(CreateContestRoutes),
    ],
    declarations: [
        CreateContestComponent,
        TeamDropdownComponent,
    ]
})


export class CreateContestModule{ }
