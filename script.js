
class ProductManager {

    constructor() {
        this.productos = [
        ]
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let validaCode = this.productos.find(e => e.code === code)
        if (validaCode) {
            return "ya existe el producto"
        }

        if ((!title) || (!description) || (!price) || (!thumbnail) || (!code) || (!stock)) {
            return "falta información por enviar"
        }
        const product = {
            id: this.productos.length ? this.productos[this.productos.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.productos.push(product)
    }
    getProducts() {
        const totalProducts = this.productos
        return totalProducts
    }

    getProductsByID(idUser) {
        let productFind = this.productos.find(e => e.id === idUser)
        if (!productFind) {
            return "not found"
        }
        else {
            return productFind
        }
    }
}





//------------------ TESTEOS-------------------//
// const k = new ProductManager()
// console.log('getproducts', k.getProducts())
// k.addProduct('producto1', 'descripcion1', 'sin foto', 200, 'abc123', 200, 200)
// console.log('getproducts', k.getProducts())
// k.addProduct('producto1', 'descripcion1', 'sin foto', 200, 'abc124', 200, 200)
// console.log('getproducts', k.getProducts())
// k.addProduct('producto1', 'descripcion1', 'sin foto', 200, 'abc124', 200, 200)
// console.log("getProdbyID", k.getProductsByID(1))
//---------------------------------------------//