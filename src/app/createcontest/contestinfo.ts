
export class ContestInfo {
    year: number;
    gender: string;
    private teams: string[][];

    constructor() {
        this.teams = [];
        for (var i: number = 0; i < 16; i++) {
            this.teams[i] = [];
        }
    }
    
    setTeam(region: string, seed: number, team: string){
       this.teams[seed][this.regions[region]] = team;
    }
    
    regions = {
      "North": 0,
      "South": 1,
      "East":  2,
      "West":  3,
    }


    public toString(): string {
        let obj : any = {
            "year": this.year,
            "gender": this.gender,
            "teams": this.teams
        }
        return JSON.stringify(obj);
    }
}
