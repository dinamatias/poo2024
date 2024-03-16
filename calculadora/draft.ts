/*Levei 11 minutos. Não consultei o código anterior. */

class Calculator {
    batteryMax: number;
    battery: number;
    display: number;

    constructor(batteryMax: number) {
        this.battery = 0;
        this.batteryMax = batteryMax;
        this.display = 0;
    }

    chargeBattery(value: number): void {
        this.battery += value;
        if(this.battery > this.batteryMax) {
            this.battery = this.batteryMax;
        }
    }

    useBattery(): boolean {
        if(this.battery === 0) {
            console.log("fail: bateria insuficiente");
            return false;
        }
        this.battery -=1;
        return true;
    }

    sum(a: number, b: number): void { 
        if(!this.useBattery()) {
            return;
        }
        this.display = a + b;
    }

    division(num: number, den: number): void {
        if(!this.useBattery()) {
            return;
        }
        if(den === 0) {
            console.log("fail: divisao por zero");
            return;
        }
        this.display = num/den;
    }
    toString(): string {
        return "display = " + this.display.toFixed(2) + ", battery = " + this.battery;
    }
}


let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);


function main() {
    let calc = new Calculator(0);

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);
        
        if (args[0] == "show") {
            write("" + calc);
        }
        else if (args[0] == "init") {
            calc = new Calculator(+args[1]);
        }
        else if (args[0] == "charge") {
            calc.chargeBattery(+args[1]);
        }
        else if (args[0] == "sum") {
            calc.sum(+args[1], +args[2]);
        }
        else if (args[0] == "div") {
            calc.division(+args[1], +args[2]);
        }
        else if (args[0] === "end") {
            break;
        }
        else {
            write("fail: comando não encontrado");
        }
    }
}

main()