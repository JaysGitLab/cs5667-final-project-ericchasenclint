export class Bracket {
    name: string;
    a: Bracket;
    b: Bracket;
    up: Bracket;
    descendents: Bracket[];

    constructor(up: Bracket, teamNames: string[], level: number){
        this.up = up;
        if(this.up == null){
            this.descendents = [];
        }
        if (level >  8) {
            this.name = teamNames.shift();
            this.addDescendent(this);
            return;
        } else {
            this.name = "???";
        }
        this.a = new Bracket(this, teamNames, level * 2);
        this.b = new Bracket(this, teamNames, level * 2);
    }
    addDescendent(descendent: Bracket){
        if(this.up != null){
            this.up.addDescendent(descendent);
        }else{
            this.descendents.push(descendent);
        }
    }
}
