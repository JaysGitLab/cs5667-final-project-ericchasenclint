import { Component } from '@angular/core';
import { TeamDropdownComponent} from './team-dropdown/team-dropdown.component';

@Component({
    selector: 'createcontest',
    templateUrl: './createcontest.template.html',
    styleUrls: ['createcontest.component.scss']
})
export class CreateContestComponent {
    regions: string[] = ["North", "South", "East", "West"];

    seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
}
