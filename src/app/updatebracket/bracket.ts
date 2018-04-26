export class Team {
    name: string;
    seed: number;
    region: string;
    constructor(name: string, seed: number, region: string){
        this.name = name;
        this.seed = seed;
        this.region = region;
    }
    static nullTeam: Team = new Team("???", 0, "");
}

export class Bracket {
    team: Team = Team.nullTeam;
    a: Bracket;
    b: Bracket;
    up: Bracket;
    positions: Bracket[];
    impossible = false;
    level: number;
    constructor(up: Bracket, teams: Team[], level: number){
        this.up = up;
        this.level = level;
        if(this.up == null){
            this.positions= [];
        }
        if (level ===  64) {
            this.team = teams.shift();
        } else {
            this.team == Team.nullTeam;
            this.a = new Bracket(this, teams, level * 2);
            this.b = new Bracket(this, teams, level * 2);
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
        }else if(this.a){
            this.impossible = this.team !== this.a.team
            && this.team !== this.b.team;
        }
        if(this.up){
            this.up.validate();
        }
    }
    register(position: Bracket){
        if(this.up != null){
            this.up.register(position);
        }else{
            this.positions.push(position);
        }
    }
}
