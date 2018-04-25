import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TeamSelectRoutes } from './team.select.routes.ts';
import { TeamComponent } from "./team.component.ts";
import { ContestSelectComponent } from "../contestselect/contestselect.component";

import {
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule
} from '@angular/material'

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatExpansionModule,
        FormsModule,
        RouterModule.forChild(TeamSelectRoutes)
    ],
    exports: [TeamSelectComponent], //Unsure if this is needed?
    declarations: [TeamComponent, ContestSelectComponent]
})

export class TeamSelectModule { }
