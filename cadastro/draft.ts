/* 
Comecei a atividade sozinha, mas foi muito difícil implementar os métodos da agência. Acho que ainda estou tentando
entender como funciona o conceito de herança, mas no fim pedi ajuda ao meu irmão e deu tudo certo. 
*/
class AccountException extends Error {
    constructor(message: string) {
        super(message);
    }
}

abstract class Account {
    protected id: number;
    protected balance: number;
    protected clientId: string;
    protected type: string; // "CC" or "CP"

    constructor(id: number, clientId: string) {
        this.id = id;
        this.clientId = clientId;
        this.balance = 0;
    }

    abstract monthlyUpdate(): void;

    withdraw(value: number): void {
        if(this.balance >= value) {
            this.balance -= value;
        }
        else {
            console.log("fail: saldo insuficiente");
        }
    }

    deposit(value: number): void {
        this.balance += value;
    }

    transfer(other: Account, value: number): void {
        this.withdraw(value);
        other.deposit(value);
        
    }

    toString(): string {
        return `${this.id}:${this.clientId}:${this.balance.toFixed(2)}:${this.type}`;
    }

    getId(): number {
        return this.id;
    }

    getBalance(): number {
        return this.balance;
    }

    getClientId(): string {
        return this.clientId;
    }

    getType(): string {
        return this.type;
    }
}

class CheckingAccount extends Account {
    constructor(id: number, clientId: string) {
        super(id, clientId);
        this.type = "CC";
    }

    monthlyUpdate(): void {
        this.balance -= 20;
    }
}

class SavingsAccount extends Account {
    constructor(id: number, clientId: string) {
        super (id, clientId);
        this.type = "CP";
    }

    monthlyUpdate(): void {
        let taxa = (1/100) * this.balance;
        this.balance += taxa;
    }
}

class Client {
    private clientId: string;
    private accounts: Account[];

    constructor(clientId: string) {
        this.clientId = clientId;
        this.accounts = [];
    }

    addAccount(account: Account): void {
        this.accounts.push(account);
    }

    toString(): string {
        return `${this.clientId} [${this.accounts[0].getId()}, ${this.accounts[1].getId()}]`;
    }

    getClientId(): string {
        return this.clientId;
    }

    setClientId(clientId: string): void {
        this.clientId = clientId;
    }

    getAccounts(): Account[] {
        return this.accounts;
    }

    setAccounts(accounts: Account[]): void {
        this.accounts = accounts;
    }
}

class BankAgency {
    private clients: Client[];
    private accounts: Account[];
    private nextAccountId: number;

    constructor() {
        this.clients = [];
        this.accounts = [];
        this.nextAccountId = 0;
    }

    private getAccount(id: number): Account {
        for(let i = 0; i < this.accounts.length; i++) {
            let account = this.accounts[i]
            if(account.getId() === id) {
                return account;
            }
        }
        throw new AccountException ("fail: conta nao encontrada");
    }

    addClient(clientId: string): void {
        
        for (let client of this.clients) {
            if (client.getClientId() === clientId) {
                console.log("fail: cliente ja existe")
                return;
            }
        }
  
        let client = new Client(clientId);
        let checkingAccount = new CheckingAccount(this.nextAccountId++, clientId);
        let savingsAccount = new SavingsAccount(this.nextAccountId++, clientId);
            
        client.addAccount(checkingAccount);
        client.addAccount(savingsAccount);
        
        this.clients.push(client);
        this.accounts.push(checkingAccount, savingsAccount);
    }

    withdraw(idConta: number, value: number): void {
        let account = this.getAccount(idConta);
        account.withdraw(value);
    }

    deposit(idConta: number, value: number): void {
        let account = this.getAccount(idConta);
        account.deposit(value);
    }

    transfer(contaDe: number, contaPara: number, value: number): void {
        let accountFrom = this.getAccount(contaDe);
        let accountTo = this.getAccount(contaPara);
        accountFrom.transfer(accountTo, value);
    }

    monthlyUpdate(): void {
        for(let i = 0; i < this.accounts.length; i++) {
            this.accounts[i].monthlyUpdate();
        }
    }

    toString(): string {
        const clientsStr = this.clients.map(client => client.toString()).join("\n");
        const accountsStr = this.accounts.map(account => account.toString()).join("\n");
        return `- Clients\n${clientsStr}\n- Accounts\n${accountsStr}`;
    }
}


let _cin_: string[] = require("fs").readFileSync(0).toString().split("\n");
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main(): void {
    let agency = new BankAgency();
    while (true) {
        try {
            const line = input();
            const args = line.split(" ");
            write("$" + line);

            if (line === "end") {
                break;
            } else if (args[0] === "show") {
                write("" + agency);
            } else if (args[0] === "addCli") {
                agency.addClient(args[1]);
            } else if (args[0] === "saque") {
                agency.withdraw(+args[1], +args[2]);
            } else if (args[0] === "deposito") {
                agency.deposit(+args[1], +args[2]);
            } else if (args[0] === "transf") {
                agency.transfer(+args[1], +args[2], +args[3]);
            } else if (args[0] === "update") {
                agency.monthlyUpdate();
            } else {
                write("fail: comando invalido");
            }
        } catch (e) {
            write(e.message);
        }
    }
}

main();
