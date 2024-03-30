abstract class Veiculo {
    private id: string;
    protected tipo: string;
    protected entrada: number;
    
    constructor(id: string) {
        this.id = id;
        this.tipo = "";
        this.entrada = 0;

    }
    setEntrada(entrada: number): void {
        this.entrada = entrada;
    }
    getEntrada(): number {
        return this.entrada;
    }
    getTipo(): string {
        return this.tipo;
    }
    getId(): string {
        return this.id;
    }
    toString(): string {
        return `${this.tipo.padStart(10, "_")} : ${this.id.padStart(10, "_")} : ${this.entrada}`
    }

    abstract calcularValor(saida: number): number;
}

class Bike extends Veiculo {
    constructor(id: string) {
        super(id);
        this.tipo = "Bike";
    }
    
    calcularValor(saida: number): number {
        return 3;
    }
}

class Moto extends Veiculo {
    constructor(id: string) {
        super(id);
        this.tipo = "Moto";
    }
    calcularValor(saida: number): number {
        let tempo = saida - this.getEntrada();
        return tempo/20;
    }
}

class Carro extends Veiculo {
    constructor(id: string) {
        super(id);
        this.tipo = "Carro";
    }
    calcularValor(saida: number): number {
        let tempo = saida - this.getEntrada();
        let valor = tempo/10;
        if(valor < 5) {
            valor = 5;
        }
        return valor;
    }
}

class Estacionamento {
    veiculos: Veiculo[];
    tempo: number;

    constructor() {
        this.tempo = 0;
        this.veiculos = [];
    }
    private procurarVeiculo(id: string): number {
        for(let i = 0; i < this.veiculos.length; i++) {
            if(this.veiculos[i].getId() == id) {
                return i;
            }
        }
        return -1;
    }
    
    estacionar(veiculo: Veiculo): void {
        veiculo.setEntrada(this.tempo);
        this.veiculos.push(veiculo);
    }

    pagar(id: string): void {
        let pos = this.procurarVeiculo(id);
        if(pos == -1) {
            console.log("fail: veiculo nao encontrado");
        }
        let veiculo = this.veiculos[pos];
        let valor = veiculo.calcularValor(this.tempo);
        console.log(veiculo.getTipo() + " chegou " + veiculo.getEntrada() 
                    + " saiu " + this.tempo
                    + ". Pagar R$ " + valor.toFixed(2));
    }

    sair(id: string): void {
        let pos = this.procurarVeiculo(id);
        if(pos == -1) {
            console.log("fail: veiculo nao encontrado");
            return;
        }
        this.veiculos.splice(pos, 1);
    }

    passarTempo(tempo: number): void {
        this.tempo += tempo;
    }

    toString(): string {
        let saida = "";
        for(let veiculo of this.veiculos) {
            saida += veiculo + "\n";
        }
        saida += "Hora atual: " + this.tempo;
        return saida;
    }
}

let _cin_: string[] = require("fs").readFileSync(0).toString().split("\n");
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let est = new Estacionamento();

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "end") { 
            break;                                                       
        }
        else if (args[0] === "show") { 
            console.log(est.toString());                                 
        }
        else if (args[0] === "bike") {
            est.estacionar(new Bike(args[1]));
        }
        else if (args[0] === "moto") {
            est.estacionar(new Moto(args[1]));
        }
        else if (args[0] === "carro") {
            est.estacionar(new Carro(args[1]));
        }
        else if (args[0] === "tempo") {
            est.passarTempo(+args[1]);
        }
        else if (args[0] === "pagar") {
            est.pagar(args[1]);
            est.sair(args[1]);
        }
        else {
            console.log("fail: omando invalido");
        }
    }
}

main();
