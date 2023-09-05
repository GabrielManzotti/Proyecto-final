const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(info)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts()
            let validaCode = products.find(e => e.code === code)
            if (validaCode) {
                return "ya existe el producto"
            }
            if ((!title) || (!description) || (!price) || (!thumbnail) || (!code) || (!stock)) {
                return "falta información por enviar"
            }
            const product = {
                id: products.length ? products[products.length - 1].id + 1 : 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            products.push(product)

            await fs.promises.writeFile(this.path, JSON.stringify(products))

        } catch (error) {
            return error
        }
    }

    async getProductsById(idUser) {
        try {
            const products = await this.getProducts()
            const product = products.find(e => e.id === idUser)
            if (!product) {
                return "no existe el producto"
            }
            else {
                return product
            }
        } catch (error) {
            error
        }
    }

    async updateProductByID(id, actualizacion) {
        try {
            let products = await this.getProducts()
            let validaCode = products.find(e => e.id === id)
            const indiceElemento = products.findIndex(e => e.id === id)
            let nuevoProducts = [...products]
            nuevoProducts[indiceElemento] = { ...nuevoProducts[indiceElemento], title: actualizacion.title, description: actualizacion.description, price: actualizacion.price, thumbnail: actualizacion.thumbnail, code: validaCode.code, stock: actualizacion.stock }
            products = nuevoProducts
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } catch (error) {
            error
        }
    }

    async deleteProductByID(id) {
        try {
            let products = await this.getProducts()
            let validaId = products.find(e => e.id === id)
            if (!validaId) {
                return "no existe el producto"
            }
            else {
                const newArrayProducts = products.filter(u => u.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
            }
        } catch (error) {
            return error
        }
    }
}

// -----------------------TESTING-------------------------------------------
// ---- objeto para actualizar en updateProductByID
// let actualizacion = {
//     title: "producto3",
//     description: "descripcion cambiada!",
//     price: 204,
//     thumbnail: "sin foto",
//     stock: 199
// }

////-------se crea la instancia "k" de la clase
// const k = new ProductManager('productos.json')

//se crea la funcion asincrónica
// async function test() {
    //-------1) se adhieren 5 productos más un adicional que debe fallar por falta de datos
    // ------a su vez el producto5 tampoco se graba ya que repite el code "abc124"
    // await k.addProduct('producto1', 'descripcion1', 'sin foto', 200, 'abc121', 200, 200)
    // await k.addProduct('producto2', 'descripcion1', 'sin foto', 200, 'abc122', 200, 200)
    // await k.addProduct('producto3', 'descripcion1', 'sin foto', 200, 'abc123', 200, 200)
    // await k.addProduct('producto4', 'descripcion1', 'sin foto', 200, 'abc124', 200, 200)
    // await k.addProduct('producto5', 'descripcion1', 'sin foto', 200, 'abc124', 200, 200)
    // await k.addProduct('sin foto', 200, 'abc125', 200, 200)
    // ------ se llama a getProducts para corroborar
    // const getProd2 = await k.getProducts()
    // console.log(getProd2)

    // ------ 2) se llama a getProductById... en este caso al del indice 2
    // const getProduct = await k.getProductsById(2);
    // console.log(getProduct)

    //------ 3) se llama a uptdateProductByID donde se le pasa el índice del producto y el objeto "actualización" que imaginariamente se podría
    //          estar llamando desde un input. Actualiza todos los campos menos ID y Code
    // k.updateProductByID(3, actualizacion)

    //------ 4) se llama a deleteProdByID pasandole el índice 1 y luego se llama a getProducts para corroborar
    // const deleteProd = await k.deleteProductByID(1)
    // console.log(deleteProd)
    // const getProd = await k.getProducts()
    // console.log(getProd)
// }
// test()
