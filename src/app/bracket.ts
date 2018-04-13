export class Bracket {
    name: string;
    a: Bracket;
    b: Bracket;
    up: Bracket;
    descendents: Bracket[];

    constructor(up: Bracket, path: string, depth: number){
        this.up = up;
        if(this.up == null){
            this.descendents = [];
        }
        if (depth > 3) {
            this.name = path;
            this.addDescendent(this);
            return;
        } else {
            this.name = "???";
        }
        this.a = new Bracket(this, path + "a", depth + 1);
        this.b = new Bracket(this, path + "b", depth + 1);
    }
    addDescendent(descendent: Bracket){
        if(this.up != null){
            this.up.addDescendent(descendent);
        }else{
            this.descendents.push(descendent);
        }
    }
}
