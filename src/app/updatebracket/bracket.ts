export class Bracket {
    name: string;
    a: Bracket;
    b: Bracket;
    up: Bracket;
    positions: Bracket[];
    impossible = false;
    level: number;
    constructor(up: Bracket, positionNames: string[], level: number){
        this.up = up;
        this.level = level;
        if(this.up == null){
            this.positions= [];
        }
        if (level ===  64) {
            this.name = positionNames.shift();
        } else {
            this.name = "???";
            this.a = new Bracket(this, positionNames, level * 2);
            this.b = new Bracket(this, positionNames, level * 2);
        }
        this.register(this);
    }
    setName(name: string){
        this.name = name;
        this.validate();
    }
    validate(){
        if(this.name=='???'){
            this.impossible = false;
        }else if(this.a){
            this.impossible = this.name != this.a.name
            && this.name != this.b.name;
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
