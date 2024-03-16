
function count(vet: number[], value: number): number {
    let count = 0;
    for(let i = 0; i < vet.length; i++) {
        if(vet[i] === value) {
            count ++;
        }
    }
    return count;
}

function sum(vet: number[]): number {
    let sum = 0;
    for(let i = 0; i < vet.length; i++) {
        sum += Math.abs(vet[i]);
    }
    return sum;
}

function average(vet: number[]): number {
    let average = sum(vet)/vet.length;
    return average;
}

function more_men(vet: number[]): string {
    let men: number[] = [];
    let women: number[] = [];

    for(let i = 0; i < vet.length; i++) {
        if(vet[i] > 0) {
            men.push(vet[i]);
        } 
        else {
            women.push(vet[i]);
        }
    }

    if(women.length > men.length) {
        return "women";
    } 
    if(women.length < men.length) {
        return "men";
    } 
    return "draw";
}

function half_compare(vet: number[]): string {
    let first: number[] = vet.slice(0, vet.length/2);
    let second: number[] = vet.slice(vet.length/2, vet.length);

    if(sum(first) > sum(second)) {
        return "first";
    }
    if(sum(first) < sum(second)) {
        return "second";
    }
    return "draw";

}

function sex_battle(vet: number[]): string {
    let men: number[] = [];
    let women: number[] = [];

    for(let i = 0; i < vet.length; i++) {
        if(vet[i] > 0) {
            men.push(vet[i]);
        } 
        else {
            women.push(vet[i]);
        }
    }

    if(average(men) > average(women)) {
        return "men";
    }
    if(average(men) < average(women)) {
        return "women";
    }
    return "draw";
}


// -------------------------- MAIN --------------------------

let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "end")          { break;                                                       }
        else if (args[0] === "count")        { write(count(to_vet(args[1]), +args[2]));                     }
        else if (args[0] === "sum")          { write(sum(to_vet(args[1])));                                 }
        else if (args[0] === "average")      { write(average(to_vet(args[1])).toFixed(2));                  }
        else if (args[0] === "more_men")     { write(more_men(to_vet(args[1])));                            }
        else if (args[0] === "half_compare") { write(half_compare(to_vet(args[1])));                    }
        else if (args[0] === "sex_battle")   { write(sex_battle(to_vet(args[1])));                          }
        else                                 { write("fail: comando invalido");                             }
    }
}

// Função auxiliar para converter de string para vetor
// "[1,2,3,4]" para [1, 2, 3, 4]
function to_vet(token: string): number[] {
    let size = token.length;
    let inside = token.substring(1, size - 1);
    return inside === "" ? [] : inside.split(",").map(x => +x)
}


main()

