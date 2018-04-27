import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateContestRoutes } from './createcontest.routes';
import { CreateContestComponent} from './createcontest.component';
import { TeamDropdownComponent } from './team-dropdown/team-dropdown.component';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatRadioModule,
  MatRippleModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatInputModule,
        MatMenuModule,
        MatRadioModule,
        MatRippleModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterModule.forChild(CreateContestRoutes),
    ],
    declarations: [
        CreateContestComponent,
        TeamDropdownComponent,
    ]
})


export class CreateContestModule{ }
