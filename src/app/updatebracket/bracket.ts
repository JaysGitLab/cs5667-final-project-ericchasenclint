export class Team {
    name: string;
    seed: number;
    region: string;
    stillIn: boolean = true;
    wins: number = 0;
    constructor(
        name: string,
        seed: number,
        region: string,
        stillIn: boolean,
        wins: number)
    {
        this.name = name;
        this.seed = seed;
        this.region = region;
        this.stillIn = stillIn;
        this.wins = wins;
    }
    static nullTeam: Team = new Team("???", 0, "", false, 0);
}

export class Bracket {
    team: Team = Team.nullTeam;
    a: Bracket;
    b: Bracket;
    up: Bracket;
    subtree: Bracket[];
    impossible = false;
    level: number;

    constructor(up: Bracket, teams: Team[], level: number, the64: Bracket[]){
        this.up = up;
        this.level = level;
        if(this.up == null){
            this.subtree= [];
        }
        if (level ===  64) {
            this.team = teams.shift();
            the64.push(this);
            let node: Bracket = this;
            for (let i = 0; i<this.team.wins; i++){
               node = node.up;
               node.setTeam(this.team);
            }
        } else {
            this.team == Team.nullTeam;
            this.a = new Bracket(this, teams, level * 2, the64);
            this.b = new Bracket(this, teams, level * 2, the64);
        }
        this.register(this);
    }
    setTeam(team: Team){
        this.team = team;
        this.validate();
    }
    validate(){
        if(this.team === Team.nullTeam){
            this.impossible = false;
        }else if(this.a && this.b){
            this.impossible = this.team !== this.a.team
            && this.team !== this.b.team;
        }
        if(this.up){
            this.up.validate();
        }
    }
    register(node: Bracket){
        if(this.up != null){
            this.up.register(node);
        }else{
            this.subtree.push(node);
        }
    }
}
