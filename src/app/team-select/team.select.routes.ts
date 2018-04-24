import { Routes } from '@angular/router';

import { TeamSelectComponent } from './team.select.component';
import { ContestSelectComponent } from './contestselect/contestselect.component';
export const TeamSelectRoutes: Routes = [{
    path: 'entercontest',
    component: ContestSelectComponent,
    children: [
        {path: ':contestId', component: TeamSelectComponent},
    ],
}];
