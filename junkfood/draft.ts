
class Slot {
    nome: string;
    qtd: number;
    preco: number;

    constructor(nome: string = "empty", qtd: number = 0, preco: number = 0.0) {
        this.nome = nome;
        this.qtd = qtd;
        this.preco = preco;
    }

    getName(): string {
        return this.nome;
    }

    getQuantity(): number {
        return this.qtd;
    }

    getPrice(): number {
        return this.preco;
    }

    setName(nome: string): void {
        this.nome = nome;
    }

    setQuantity(qtd: number): void {
        this.qtd = qtd;
    }

    setPrice(preco: number): void {
        this.preco = preco;
    }

    toString(): string {
        return `[${this.nome.padStart(8)} :${this.qtd.toString().padStart(2)} U : ${this.preco.toFixed(2)} RS]`;
    }
}



class Machine {
    espirais: Slot[];
    saldo: number;
    lucro: number;

    constructor(qtd: number = 0) {
        this.espirais = [];
        this.saldo = 0;
        this.lucro = 0;
        for(let i = 0; i < qtd; i++) {
            this.espirais.push(new Slot());
        }
    }

    get(indice: number): Slot | null {
        if(indice >= 0 && indice < this.espirais.length) {
            return this.espirais[indice];
        }
        return null;
    }

    set(indice: number, name: string, qtd: number, price: number): void {
        if(indice >= 0 && indice < this.espirais.length) {
            let slot = this.espirais[indice];
            slot.setName(name);
            slot.setQuantity(qtd);
            slot.setPrice(price);
        }
        else {
            console.log("fail: indice nao existe")
            return;
        }
    }

    limpar(indice: number): void {
        if(indice >= 0 && indice < this.espirais.length) {
            let slot = this.espirais[indice];
            slot.setName("empty");
            slot.setQuantity(0);
            slot.setPrice(0);
        }
        return;
        
    }

    inserirDinheiro(value: number): void {
        if(value > 0) {
            this.saldo += value;
        }
    }

    pedirTroco(): number {
        let troco = this.saldo;
        this.saldo = 0;
        return troco;
    }

    comprar(ind: number): void {
        let slot = this.espirais[ind]

        if(ind < 0 || ind > this.espirais.length) {
            console.log("fail: indice nao existe");
        }
        else if(slot.getName() != "empty" && this.getSaldo() >= slot.getPrice() && slot.getQuantity() > 0) {
            slot.setQuantity(slot.getQuantity() -1);
            this.saldo -= slot.getPrice();
            console.log(`voce comprou um ${slot.getName()}`);
        }
        else if(this.getSaldo() < slot.getPrice()) {
            console.log("fail: saldo insuficiente");
        }
        else if(slot.getQuantity() <= 0) {
            console.log("fail: espiral sem produtos");
        }
    }
 
    getSaldo(): number {
        return this.saldo;
    }


    toString(): string {
        const espiralStr = this.espirais
            .map((slot, index) => `${index} ${slot.toString()}`)
            .join('\n');
        return `saldo: ${this.saldo.toFixed(2)}\n${espiralStr}`;
    }
}


let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);


function main() {
    let machine = new Machine(0);

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if (args[0] === "end") {
            break;
        } else if (args[0] === "show") {
            console.log(machine.toString());
        } else if (args[0] === "init") {
            machine = new Machine(+args[1]);
        } else if (args[0] === "limpar") {
            machine.limpar(+(args[1]));
        } else if (args[0] === "dinheiro") {
            machine.inserirDinheiro(+args[1]);
        } else if (args[0] === "comprar") {
            machine.comprar(+args[1]);
        } else if (args[0] === "set") {
            machine.set(+args[1], args[2], +(args[3]), +args[4]);
        } else if (args[0] === "troco") {
            console.log(`voce recebeu ${machine.pedirTroco().toFixed(2)} RS`);
        } else {
            console.log("comando invalido");
        }
    }
}

main();
