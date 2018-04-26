export class Bracket {
    name: string;
    a: Bracket;
    b: Bracket;
    up: Bracket;
    descendents: Bracket[];
    impossible = false;
    level: number;
    constructor(up: Bracket, teamNames: string[], level: number){
        this.up = up;
        this.level = level;
        if(this.up == null){
            this.descendents = [];
        }
        if (level >  32) {
            this.name = teamNames.shift();
            this.addDescendent(this);
        } else {
            this.name = "???";
            this.a = new Bracket(this, teamNames, level * 2);
            this.b = new Bracket(this, teamNames, level * 2);
        }
    }
    setName(name: string){
        this.name = name;
        this.validate();
    }
    validate(){
        if(this.a){
            this.impossible = this.name != this.a.name
            && this.name != this.b.name;
        }
        if(this.up){
            this.up.validate();
        }
    }
    addDescendent(descendent: Bracket){
        if(this.up != null){
            this.up.addDescendent(descendent);
        }else{
            this.descendents.push(descendent);
        }
    }
}
