import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

import { TeamSelectRoutes } from './team.select.routes.ts';
import { TeamComponent } from "./team.component.ts";
import { ContestSelectComponent } from "../contestselect/contestselect.component";

import {
    MatButtonModule,
    MatRippleModule
} from '@angular/material'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TeamSelectRoutes),
        MatButtonModule,
        MatRippleModule
    ],
    declarations: [
        TeamComponent,
        ContestSelectComponent
    ]
})

export class TeamSelectModule { }
