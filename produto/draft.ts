
interface IProduct {
    getPrice(): number;
    getLabel(): string;
}

// Produto concreto
class Product implements IProduct {
    private nome: string;
    private preco: number;

    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
    }

    getPrice(): number {
        return this.preco;
    }

    getLabel(): string {
        return this.nome;
    }
}

// Pacote (Composto)
class Bundle implements IProduct {
    private products: IProduct[] = [];

    constructor(produtos: IProduct[] = []) {
        this.products = produtos;
    }

    addProduct(product: IProduct): void {
        for(let i = 0; i < this.products.length; i++) {
            this.products.push(product);
        }
    }

    getPrice(): number {
        let soma = 0;
        for(let product of this.products) {
            soma += product.getPrice();
        }
        return soma;
    }

    getLabel(): string {
        let labels = this.products.map(product => product.getLabel());
        return `[${labels.join(", ")}]`;
    }
}

// Decorator
class DescountedProduct implements IProduct {
    private product: IProduct;
    private discount: number;

    constructor(product: IProduct, discount: number) {
        this.product = product;
        this.discount = discount;
    }

    getPrice(): number {
        let desconto = this.discount * this.product.getPrice() / 100;
        let novoPreco = this.product.getPrice() - desconto;
        return novoPreco;
    }

    getLabel(): string {
        return `${this.product.getLabel()}(${this.discount}% OFF)`;
    }
}

class Manager {
    private products: IProduct[] = [];

    constructor() {
        this.products = [];
    }

    addProduct(label: string, price: number) {
        let product = new Product(label, price);
        this.products.push(product);
    }

    addBundle(indexes: number[]) {
        let bundleProducts: IProduct[] = [];
        for(let i = 0; i < indexes.length; i++) {
            let index = indexes[i];
            if(index >= 0 && index < this.products.length) {
                let product = this.products[index];
                bundleProducts.push(product);
            }
        }
        let bundle = new Bundle(bundleProducts);
        this.products.push(bundle);
    }

    addDiscount(index: number, discount: number) {
        let product = this.products[index];
        let produtoComDesconto: DescountedProduct = new DescountedProduct(product, discount);
        // this.products.splice(index)
        this.products.push(produtoComDesconto);
    }

    toString() {
        let index = 0;
        for (let product of this.products) {
            console.log(String(index).padStart(2, "0") + ":" + product.getLabel() + ":" + product.getPrice().toFixed(2));
            index++;
        }
    }
}

let _cin_: string[] = require("fs").readFileSync(0).toString().split("\n");
let input = (): string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end: string = "\n") => process.stdout.write("" + text + end);

function main() {
    let manager = new Manager();

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if (args[0] === "end") {
            break;
        }
        else if (args[0] === "add") {
            let label = args[1];
            let preco = +args[2];
            manager.addProduct(label, preco);
        }
        else if (args[0] === "addPacote") {
            let indexes = args.slice(1).map(x => +x);
            manager.addBundle(indexes);
        }
        else if (args[0] === "addDesconto") {
            let index = +args[1];
            let desconto = +args[2];
            manager.addDiscount(index, desconto);
        }
        else if (args[0] === "show") {
            manager.toString();
        }
        else {
            write("fail: comando invalido");
        }
    }
}

main();
