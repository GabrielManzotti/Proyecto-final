import { log } from 'console'
import fs from 'fs'

class CartsManager {

    constructor(path) {
        this.path = path
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(info)
            }
            else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createCart() {
        try {
            const carts = await this.getCarts()
            let id
            let products
            if (!carts.length) {
                id = 1
                products = []
                const newCart = { id, products }
                carts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return newCart
            }
            else {
                id = carts[carts.length - 1].id + 1
                products = []
                const newCart = { id, products }
                carts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return newCart
            }
        } catch (error) {
            error
        }
    }

    async getCartByID(idCart) {
        try {
            const carts = await this.getCarts()
            const cart = carts.find(e => e.id === idCart)
            if (!cart) {
                return "no cart"
            }
            else {
                return cart
            }
        } catch (error) {
            error
        }
    }

    async addToCart(idCart, idProduct) {
        try {
            let carts = await this.getCarts()
            const cart = carts.find(e => e.id === idCart)
            if (!cart) {
                return "no cart"
            } else {
                const foundProductIndex = cart.products.findIndex(e => e.product === +idProduct)
                if (foundProductIndex === -1) {
                    cart.products.push({
                        product: +idProduct,
                        quantity: 1,
                    })
                } else {
                    cart.products[foundProductIndex].quantity += 1;
                }
                const foundCartIndex = carts.findIndex((cart) => cart.id === +idCart);
                carts[foundCartIndex] = cart;
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return cart
            }
        } catch (error) {
            error
        }
    }
}

export const cartManager = new CartsManager('cart.json')