import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StartEndRoutes } from './start.end.routes';
import { StartEndComponent } from './start.end.component';

import {
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterModule.forChild(StartEndRoutes),
    ],
    declarations: [
        StartEndComponent
    ]
})

export class StartEndModule{}
