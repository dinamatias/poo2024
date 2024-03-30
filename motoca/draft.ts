//Falta no rascunho buzinhar, comprarTempo e dirigir

class Pessoa {
    private age: number;
    private name: string;

    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public getAge(): number {
        return this.age;
    }
    public getname(): string {
        return this.name;
    }
    public toString(): string {
        return`${this.name}:${this.age}`;
    }
}

class Motoca {
    potencia:number = 1;
    time: number = 0;
    pessoa: Pessoa | null;

    constructor(potencia: number = 1) {
        this.potencia = potencia;
        this.time = 0;
        this.pessoa = null;
    }

    inserir(pessoa: Pessoa): boolean {
        if(this.pessoa != null) {
            console.log("fail: busy motorcycle");
            return false;
        }
        this.pessoa = pessoa;
        return true;
    }

    remover() : Pessoa | null {
        if(this.pessoa == null) {
            console.log("fail: empty motorcycle");
            return null;
        }
        let pessoa = this.pessoa;
        this.pessoa = null;
        return pessoa;
        }

    buyTime(time: number) {
        this.time += time;
    }

    drive(time: number) {
        if(this.time <= 0) {
            console.log("fail: buy time first");
            return;
        }
        if(this.pessoa == null) {
            console.log("fail: empty motorcycle");
            return;
        }
        if(this.pessoa.getAge() > 10) {
            console.log("fail: too old to drive");
            return;
        }
        let novoTempo = this.time - time;
        if(novoTempo <= 0) {
            console.log(`fail: time finished after ${this.time} minutes`);
            this.time = 0;
            return;
        }
        this.time -= time;
    }

    honk() {
        let buzina = "P";
        for(let i = 0; i < this.potencia; i++) {
            buzina += "e"; 
        }
        buzina += "m";
        console.log(buzina);
    }

    public toString(): string {
        let valor = this.pessoa === null ? "empty" : "" + this.pessoa;
        return `power:${this.potencia}, time:${this.time}, person:(${valor})`;
    }
}


let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let moto = new Motoca();

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "show")  { write(moto.toString());         }
        else if (args[0] === "buy")   { moto.buyTime(+args[1])          }
        else if (args[0] === "honk")  { moto.honk()          }
        else if (args[0] === "drive") { moto.drive(+args[1])            }
        else if (args[0] === "init")  { moto = new Motoca(+args[1]);    }
        else if (args[0] === "enter") { moto.inserir(new Pessoa(args[1], +args[2])); }
        else if (args[0] === "leave") { 
            let aux = moto.remover();
            if (aux !== null) {
                write(aux);
            }
        }
        else if (args[0] === "end")   { break;                          }
        else                          { write("fail: comando invalido");}
    }
}

main()