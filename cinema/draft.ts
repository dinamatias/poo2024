/*
Havia feito essa questão há alguns meses, mas formatei o computador e perdi os códigos que ainda não havia enviado no moodle. 
Percebi que tive bastante dificuldade para refazê-la. Ainda acho muito difícil algumas coisas sobre pegar informações de uma classe
e utilizar em outra classe. O toString foi todo feito por meio de for, porque não sei usar operadores ternários.
Levei cerca de duas horas para refazer a questão.  
*/


class Client {
    private id: string;
    private fone: string;

    constructor(id: string, fone: string) {
        this.id = id;
        this.fone = fone;
    }

    toString(): string {
        return `${this.id}:${this.fone}`;
    }

    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getFone(): string {
        return this.fone;
    }

    setFone(fone: string): void {
        this.fone = fone;
    }
}

class Sala {
    private cadeiras: (Client | null)[];

    constructor(capacidade: number) {
        //this.cadeiras = new Array(capacidade).fill(null);
        // O método fill(null) é utilizado para preencher todos os elementos do array recém-criado com o valor null.

        this.cadeiras = [];
        for (let i = 0; i < capacidade; i++) {            
            this.cadeiras.push(null);
        } 
    }

    procurar(nome) {
        for(let i = 0; i < this.cadeiras.length; i++) {
            if (this.cadeiras[i] !== null && this.cadeiras[i]!.getId() === nome) {                
                return i;
            }        
        return -1;
        }
    }

    verificarIndice(indice): boolean {
        if(indice >= 0 && indice < this.cadeiras.length) {
            return true;
        }
        return false;
    }

    getCadeiras(): (Client | null)[] {
       return this.cadeiras;
    }

    reservar(id: string, fone: string, ind: number): boolean {
        if(this.verificarIndice(ind) == false) {
            console.log("fail: cadeira nao existe");
            return false;
        }
        if (this.cadeiras[ind] !== null) {
            console.log ("fail: cadeira ja esta ocupada");            
            return false;
        }
        if(this.procurar(id) != -1) {            
            console.log ("fail: cliente ja esta no cinema");
            return false;        
        }
        
        let cliente = new Client(id, fone);
        this.cadeiras[ind] = cliente;
        return true;
    }

    cancelar(id: string): void {
        if (this.procurar(id) === -1) {
            console.log ("fail: cliente nao esta no cinema");        
        }
        this.cadeiras[this.procurar(id)!] = null;   
    }

    toString(): string {
        let cadeirasOcupadas = ""
        for(let i = 0; i < this.cadeiras.length; i++) {
            if(this.cadeiras[i] !== null) {
                cadeirasOcupadas += this.cadeiras[i]!.toString() + " ";
            }
            else {
                cadeirasOcupadas += "- "
            }
        }
        return `[${cadeirasOcupadas.slice(0, -1)}]`;


        //let cadeiras = this.cadeiras.map (x => x === null ? "-" : x.toString()).join(" ");        
        //return `[${cadeiras}]`;
    }
}


let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let sala = new Sala(0);

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if      (args[0] == "end")      { break; }
        else if (args[0] == "init")     { sala = new Sala(+args[1]); }
        else if (args[0] == "show")     { write(sala.toString()); }
        else if (args[0] == "reservar") { sala.reservar(args[1], args[2], +args[3]); }
        else if (args[0] == "cancelar") { sala.cancelar(args[1]); }
        else if (args[0] == "procurar") { sala.procurar(args[1]); }
        else                            { console.log("fail: comando invalido"); }
    }
}



main();