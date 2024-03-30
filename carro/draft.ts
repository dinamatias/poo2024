class Car{
    pass: number; // Passageiros
    passMax: number; // limite de Passa

    constructor() {
        this.pass = 0;
        this.passMax = 2;
        this.gas = 0;
        this.gasMax = 100;
        this.km = 0;
    }

    enter(): void {
        if (this.pass < this.passMax) 
            this.pass += 1;
        else console.log("fail: limite de pessoas atingido");
    }

    leave(): void {
        if (this.pass > 0) 
            this.pass -= 1;
        else console.log("fail: nao ha ninguem no carro");
    }

    fuel(gas: number): void {
        this.gas += gas;
        if (this.gas > this.gasMax)
            this.gas = this.gasMax;
    }
    
    toString(): string {
        let texto: string = ("pass: " + this.pass + ", gas: " + this.gas + ", km: " + this.km);
        return texto;
    }
    
    drive (km: int): void {
        if (this.pass == 0)
            console.log("fail: nao ha ninguem no carro");
        else if (this.gas == 0)
                console.log("fail: tanque vazio");
        else if (this.gas < km) {
                console.log("fail: tanque vazio apos andar " + this.gas + " km");
                this.km += this.gas;
                this.gas = 0;
        }    
        else {
            this.gas -= km;
            this.km += km;
        }
    }
};


let _cin_: string[] = require("fs").readFileSync(0).toString().split("\n");
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let car = new Car();

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "show")  { write(car.toString());          }
        else if (args[0] === "enter") { car.enter();                    }
        else if (args[0] === "leave") { car.leave();                    }
        else if (args[0] === "fuel")  { car.fuel(+args[1]);             }
        else if (args[0] === "drive") { car.drive(+args[1]);            }
        else if (args[0] === "end")   { break;                          }
        else                          { write("fail: comando invalido");}
    }
}

main()