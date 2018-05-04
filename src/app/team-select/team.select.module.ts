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
    MatInputModule
} from '@angular/material'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TeamSelectRoutes),
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        FormsModule
    ],
    declarations: [
        TeamComponent,
        ContestSelectComponent
    ]
})

export class TeamSelectModule { }
