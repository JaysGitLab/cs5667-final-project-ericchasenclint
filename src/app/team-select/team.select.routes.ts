import { Routes } from '@angular/router';

import { TeamSelectComponent } from './team.select.component';

export const TeamSelectRoutes: Routes = [{
    path: 'entercontest',
    component: TeamSelectComponent,
    children: [
        {path: ':contestId', component: TeamSelectComponent}
    ],
}];
