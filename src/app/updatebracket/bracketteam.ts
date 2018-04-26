export class BracketTeam {
    parent: BracketTeam;
    round: number;
    team: Team;
    child1: BracketTeam;
    child2: BracketTeam;
    isValid(): boolean{
        if (this.round == 1){
            return true;
        }
        let thisOneValid = this.team == null
            || this.team.id == this.child1.team.id
            || this.team.id == this.child2.team.id;
        return thisOneValid
            && this.child1.isValid()
            && this.child1.isValid();
    }
}

export class Team {
    id: string;
    name: string;
    seed: number;
    region: string
}
