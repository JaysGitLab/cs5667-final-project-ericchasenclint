import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

import { TeamSelectRoutes } from './team.select.routes.ts';
import { TeamComponent } from "./team/team.component.ts";
import { TeamSelectComponent } from"./team.select.component.ts"; 

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TeamSelectRoutes)
    ],
    declarations: [
        TeamComponent,
        TeamSelectComponent
    ]
})
export class TeamSelectModule { }
