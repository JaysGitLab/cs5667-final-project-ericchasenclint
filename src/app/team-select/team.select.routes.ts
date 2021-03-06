import { Routes } from '@angular/router';

import { TeamComponent } from './team.component';
import { TeamSelectComponent } from './team.select.component';
import { ContestSelectComponent } from '../contestselect/contestselect.component';
export const TeamSelectRoutes: Routes = [{
    path: 'entercontest',
    children: [
        {path: '', component: ContestSelectComponent, data:{msg: "Which contest would you like to enter?"}},
        {path: ':year/:gender', component: TeamComponent},
    ],
}];
