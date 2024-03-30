
class Kid {
    private age: number;
    private name: string;

    constructor(name: string, age: number) {
        this.age = age;
        this.name = name;
    }

    getAge(): number {
        return this.age;
    }

    getName(): string {
        return this.name;
    }

    toString(): string { 
        return `${this.name}:${this.age}`;
    }
}

class Trampoline {
    private waiting: Kid[] = [];
    private playing: Kid[] = [];

    constructor () {
        this.waiting = [];
        this.playing = [];
    }

    private removeFromList(name: string, list: Kid[]): Kid | null {
        for (let i = 0; i < list.length; i++) {
            if(list[i].getName() == name) {
                let kid = list[i];
                list.splice(i, 1);
                return kid;
            }
        }
        return null;
    }

    arrive(kid: Kid): void {
        this.waiting.unshift(kid);
    }

    enter(): void {
        if(this.waiting.length > 0) {
            let kid: Kid = this.waiting.pop()!;
            this.playing.unshift(kid);
        }
    }

    leave(): void {
        if(this.playing.length > 0) {
            let kid: Kid = this.playing.pop()!;
            this.waiting.unshift(kid);
        }
    }

    removeKid(name: string): Kid | null {
        
        let kidRemovePlay = this.removeFromList(name, this.playing);
        if(kidRemovePlay != null) 
            return kidRemovePlay;
        return this.removeFromList(name, this.waiting);

    }

    toString(): string {
        // return `[${this.waiting}] => [${this.playing}]`;
        let playing = this.playing.map(kid => kid == null ? "-----" : kid.toString()).join(", ");
        let waiting = this.waiting.map(kid => kid.toString()).join(", ");
        // map transforma uma coisa de um tipo em uma de outro tipo
        // join junta as coisas

        return "[" + waiting + "] => [" + playing + "]";
            
    }
}


let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let tr = new Trampoline();

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if      (args[0] == "end"   ) { break                                  }
        else if (args[0] == "show"  ) { write(tr.toString());                  }
        else if (args[0] == "arrive") { tr.arrive(new Kid(args[1], +args[2])); }
        else if (args[0] == "enter" ) { tr.enter();                            }
        else if (args[0] == "leave" ) { tr.leave();                            }
        else if (args[0] == "remove") { let kid = tr.removeKid(args[1]);       }
        else                          { write("fail: comando invalido");       }
    }
}

main();