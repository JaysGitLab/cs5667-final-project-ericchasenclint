import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateContestRoutes } from './createcontest.routes';
import { CreateContestComponent} from './createcontest.component';

import { SortablejsModule } from 'angular-sortablejs';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
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
        MatCardModule,
        MatInputModule,
        MatMenuModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterModule.forChild(CreateContestRoutes),
        SortablejsModule.forRoot({ animation: 150 }),
    ],
    declarations: [
        CreateContestComponent,
    ]
})


export class CreateContestModule{ }
