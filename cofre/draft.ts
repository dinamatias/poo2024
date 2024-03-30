/* 
Comecei a atividade sozinha e terminei com a ajuda do meu irmão. Tive dificuldade para entender que existia o throw Error e por isso não estava funcionando. 
*/

interface Valuable {
    getLabel(): string;
    getValue(): number;
    getVolume(): number;
}

class Coin implements Valuable {
    private label: string;
    private value: number;
    private volume: number;

    constructor(label: string, value: number, volume: number) {
        this.label = label;
        this.value = value;
        this.volume = volume;
    }

    static readonly C10 = new Coin("M10", 0.10, 1);
    static readonly C25 = new Coin("M25", 0.25, 2);
    static readonly C50 = new Coin("M50", 0.50, 3);
    static readonly C100 = new Coin("M100", 1.00, 4);

    getLabel(): string {
        return this.label;
    }

    getVolume(): number {
        return this.volume;
    }

    getValue(): number {
        return this.value;
    }

    toString(): string {
        return `${this.label}:${this.value.toFixed(2)}:${this.volume}`;
    }
}

class Item implements Valuable {
    private label: string;
    private value: number;
    private volume: number;

    constructor(label: string, value: number, volume: number) {
        this.label = label;
        this.value = value;
        this.volume = volume;
    }

    getLabel(): string {
        return this.label;
    }

    getVolume(): number {
        return this.volume;
    }

    getValue(): number {
        return this.value;
    }

    toString(): string {
        return `${this.label}:${this.value.toFixed(2)}:${this.volume}`;
    }
}

class Pig {
    private volumeMax: number;
    private broken: boolean;
    private valuables: Valuable[];

    constructor(volumeMax: number) {
        this.volumeMax = volumeMax;
        this.valuables = [];
        this.broken = false;
    }

    addValuable(val: Valuable): void {
        if(this.broken == true) {
            throw Error("fail: the pig is broken");
        }
        if(val.getVolume() > this.volumeMax - this.getVolume()) {
            throw Error("fail: the pig is full");
        } 
        this.valuables.push(val);
    }

    breakPig(): void {
        if(this.broken == false) {
            this.broken = true;
        }
    }

    extractCoins(): Coin[] {
        let coins: Coin[] = [];

        if(this.broken == false) {
            throw Error("fail: you must break the pig first");
        }
        
        for (let i = 0; i < this.valuables.length; i++) {
            let val = this.valuables[i];
    
            if (val instanceof Coin) {
                coins.push(val);
                this.valuables.splice(i, 1);
                i--;  
            }
        }
        return coins;
    }

    extractItems(): Item[] {
        let items: Item[] = [];
        
        if(this.broken == false) {
            throw Error("fail: you must break the pig first");
        }

        for (let i = 0; i < this.valuables.length; i++) {
            let val = this.valuables[i];
    
            if (val instanceof Item) {
                items.push(val);
                this.valuables.splice(i, 1);
                i--;  
            }
        }
        return items;
    }
    

    getVolume(): number {

        if(this.broken == true) {
            return 0;
        }

        let somaVolumes = 0;
        for(let i = 0; i < this.valuables.length; i++) {
            somaVolumes += this.valuables[i].getVolume();
        }
        return somaVolumes;
    }

    getValue(): number {
        let somaValores = 0;
        for(let i = 0; i < this.valuables.length; i++) {
            somaValores += this.valuables[i].getValue();
        }
        return somaValores;
    }
    toString(): string {
        const status = this.broken ? "broken" : "intact";
        const values = "[" + this.valuables.join(", ") + "]";
        return `${values} : ${this.getValue().toFixed(2)}$ : ${this.getVolume()}/${this.volumeMax} : ${status}`;
    }
}

let _cin_: string[] = require("fs").readFileSync(0).toString().split("\n");
let input = (): string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end: string = "\n") => process.stdout.write("" + text + end);

function main() {
    let pig = new Pig(0);

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);
        try {
            if (args[0] == "end") {
                break;
            }
            else if (args[0] == "init") {
                pig = new Pig(+args[1]);
            }
            else if (args[0] == "addCoin") {
                let value = parseInt(args[1]);
                if      (value == 10) { pig.addValuable(Coin.C10); } 
                else if (value == 25) { pig.addValuable(Coin.C25); } 
                else if (value == 50) { pig.addValuable(Coin.C50); }
                else if (value == 100) { pig.addValuable(Coin.C100); }
            }
            else if (args[0] == "addItem") {
                pig.addValuable(new Item(args[1], +args[2], +args[3]));
            }
            else if (args[0] == "break") {
                pig.breakPig();
            }
            else if (args[0] == "extractCoins") {
                let coins = pig.extractCoins();
                console.log("[" + coins.join(", ") + "]");
            }
            else if (args[0] == "extractItems") {
                let itens = pig.extractItems();
                console.log("[" + itens.join(", ") + "]");
            }
            else if (args[0] == "show") {
                console.log(pig.toString());
            }
            else {
                console.log("fail: invalid command");
            }
        } catch (e) {
            console.log(e.message);
        }
    }
}

main();
