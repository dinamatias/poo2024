class Pessoa {
    private nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }
    public getNome(): string {
        return this.nome;
    }
    public setNome (nome: string): void {
        this.nome = nome;
    }
    public toString(): string {
        return this.nome;
    }
}

class Mercantil {
    private caixas: Array<Pessoa | null>;
    private espera: Array<Pessoa>;

    constructor(nCaixas: number) {
        this.caixas = [];
        this.espera = [];
        for (let i = 0; i < nCaixas; i++) {
            this.caixas.push(null);
        }
    }

    chegar(pessoa: Pessoa): void {
        this.espera.push(pessoa);
    }

    chamar(index: number): void {
        if(this.espera.length == 0) {
            console.log("fail: sem clientes");
            return;
        } 
        if(this.caixas[index] != null) {
            console.log("fail: caixa ocupado");
            return;
        }

        this.caixas[index] = this.espera.shift()!; // "!" significa que já validei isso. 
    }

    finalizar(index: number): Pessoa | null {
        if (index < 0 || index >= this.caixas.length) {
            console.log("fail: caixa inexistente");
            return null;
        }
        if(this.caixas[index] == null) {
            console.log("fail: caixa vazio");
            return null;
        }

        let aux = this.caixas[index];
        this.caixas[index] = null;
        return aux;
    }

    toString(): string {
        let caixas = this.caixas.map(x => x == null ? "-----" : x.getNome()).join(", ");
        let espera = this.espera.map(x => x.getNome()).join(", ");
        // map transforma uma coisa de um tipo em uma de outro tipo
        // join junta as coisas

        return "Caixas: [" + caixas + "]\n"
             + "Espera: [" + espera + "]";
    }

    remover(nome: string): Pessoa | null {
        for (let i = 0; i < this.espera.length; i++) {
            if (this.espera[i].getNome() == nome) {
                let aux = this.espera[i];
                this.espera.splice(i, 1);
                return aux;
            }
        }
        for (let i = 0; i < this.caixas.length; i++) {
            if (this.caixas[i] != null) {
                if (this.caixas[i]!.getNome() == nome) {
                    let aux = this.caixas[i];
                    this.caixas[i] = null;
                    return aux;
                }
            }
        }
        return null;
    }

}




let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let merc = new Mercantil(0);

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if       (args[0] == "end")    { break;                            }
        else  if (args[0] == "init")   { merc = new Mercantil(+args[1]);   }
        else  if (args[0] == "show")   { write(merc.toString());           }
        else  if (args[0] == "arrive") { merc.chegar(new Pessoa(args[1])); }
        else  if (args[0] == "call")   { merc.chamar(+args[1]);            }
        else  if (args[0] == "finish") { merc.finalizar(+args[1]);         }
        else                           { write("fail: comando invalido");  }
    }
}
main() 
