
class Coin {
    private value: number;
    private volume: number;
    private label: string;
    
    public static C10 = new Coin(0.10, 1, "C10");
    public static C25 = new Coin(0.25, 2, "C25");
    public static C50 = new Coin(0.50, 3, "C50");
    public static C100 = new Coin(1.0, 4, "C100");

    private constructor(value: number, volume: number, label: string) {
        this.value = value;
        this.volume = volume;
        this.label = label;
    }
    public toString(): string {
        return `${this.value.toFixed(2)}:${this.volume}`;
    }
    public getValue(): number {
        return this.value;
    }
    public getVolume(): number {
        return this.volume;
    }
    public getLabel(): string {
        return this.label;
    }
}


class Item {
    private label: string;
    private volume: number;

    public constructor(label: string, volume: number) {
        this.label = label;
        this.volume = volume;
    }
    public getLabel(): string {
        return this.label;
    }
    public getVolume(): number {
        return this.volume;
    }
    public setVolume(volume: number): void {
        this.volume = volume;
    }
    public setLabel(label: string): void {
        this.label = label;
    }
    public toString(): string {
        return `${this.label}:${this.volume}`;
    }
}

class Pig {
    private items: Item[];
    private coins: Coin[];
    volumeMax: number;
    broken: boolean;

    public constructor(volumeMax: number) {
        this.volumeMax = volumeMax;
        this.broken = false;
        this.items = [];
        this.coins = [];
    }

    public addCoin(coin: Coin): boolean {
        if(this.isBroken()) {
            console.log("fail: the pig is broken"); 
        }
        if(coin.getVolume() + this.getVolume() > this.volumeMax) {
            console.log("fail: the pig is full");
        }
        if(!this.isBroken() && coin.getVolume() + this.getVolume() <= this.volumeMax) {
            this.coins.push(coin);
            return true;
        }
        return false;
    }

    public addItem(item: Item): boolean {
        if(this.isBroken()) {
            console.log("fail: the pig is broken"); 
        }
        if(item.getVolume() + this.getVolume() > this.volumeMax) {
            console.log("fail: the pig is full");
        }
        if(!this.isBroken() && item.getVolume() + this.getVolume() <= this.volumeMax) {
            this.items.push(item);
            return true;
        }
        return false;
    }

    public getVolume(): number {
        if(this.isBroken()) {
            return 0;
        }

        let volume = 0;
        for(let i = 0; i < this.coins.length; i++) {
            volume += this.coins[i].getVolume();
        }

        for (let i = 0; i < this.items.length; i++) {
            volume += this.items[i].getVolume();
        }
        
        return volume;

    }

    public getValue(): number {
        let soma = 0;
        for(let i = 0; i < this.coins.length; i++) {
            soma += this.coins[i].getValue();
        }
        return soma;
    }

    public breakPig(): boolean {
        if(this.isBroken()) {
            return false;
        }
        this.broken = true;
        return true;
    }

    public extractCoins(): Coin[] {
        if(!this.isBroken()) {
            console.log("fail: you must break the pig first");
            return [];
        }

        let aux = this.coins;
        this.coins = [];
        return aux;
        
    }

    public extractItems(): Item[] {
        if(!this.isBroken()) {
            console.log("fail: you must break the pig first");
            return [];
        }

        let aux = this.items;
        this.items = [];
        return aux;
    }

    public isBroken(): boolean {
        return this.broken;
    }




    public toString(): string {
        let state = this.broken ? "broken" : "intact";
        let coins = "[" + this.coins.map(coin => coin.toString()).join(", ") + "]";
        let items = "[" + this.items.map(item => item.toString()).join(", ") + "]";
        return `state=${state} : coins=${coins} : items=${items}` + 
                ` : value=${this.getValue().toFixed(2)}` + 
                ` : volume=${this.getVolume()}/${this.volumeMax}`;
    }
}

let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let pig = new Pig(10);

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "end")   { break;                                                       }
        else if (args[0] === "init")  { pig = new Pig(Number(args[1]));                              }
        else if (args[0] === "show")  { write(pig.toString());                                       }
        else if (args[0] === "add")   { pig.addItem(new Item(args[1], Number(args[2])));             }
        else if (args[0] === "addCoin")  {
            if      (args[1] === "10")  { pig.addCoin(Coin.C10); }
            else if (args[1] === "25")  { pig.addCoin(Coin.C25); }
            else if (args[1] === "50")  { pig.addCoin(Coin.C50); }
            else if (args[1] === "100") { pig.addCoin(Coin.C100);}
        }
        else if (args[0] === "addItem")  { pig.addItem(new Item(args[1], Number(args[2])));          }
        else if (args[0] === "extractItems") { 
            let output = "[" + pig.extractItems().map(item => item.toString()).join(", ") + "]";
            write(output);
        }
        else if (args[0] === "extractCoins") { 
            let output = "[" + pig.extractCoins().map(item => item.toString()).join(", ") + "]";
            write(output);
        }
        else if (args[0] === "break")    { pig.breakPig();                                           }
        else                             { write("fail: comando invalido");                          }
    }
}

main();


