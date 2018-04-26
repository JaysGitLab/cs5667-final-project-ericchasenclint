import { Routes } from '@angular/router';

import { TeamComponent } from './team/team.component';
import { TeamSelectComponent } from './team.select.component';
import { ContestSelectComponent } from './contestselect/contestselect.component';
export const TeamSelectRoutes: Routes = [{
    path: 'entercontest',
    component: TeamSelectComponent,
    children: [
        {path: '', component: ContestSelectComponent},
        {path: ':year/:gender', component: TeamComponent},
    ],
}];