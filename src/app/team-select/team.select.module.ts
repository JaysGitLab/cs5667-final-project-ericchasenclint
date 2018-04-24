import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';


import { TeamComponent } from "./team/team.component.ts";
import { TeamSelectComponent } from"./team.select.component.ts"; 

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TeamComponent,
        TeamSelectComponent
    ]
})
export class TeamSelectModule { }
