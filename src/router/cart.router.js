import { Router } from 'express'
import { cartManager } from '../cart.js'
const router = Router()

router.get('/cart', async (req, res) => {
    const cart = await cartManager.getCarts()
    try {
        if (cart === "no info") {
            res.status(400).json({ message: "no info" })
        } else {
            res.status(200).json({ message: cart })
        }
    } catch (error) {
        error
    }
})

router.post('/cart', async (req, res) => {
    const cart = await cartManager.createCart()
    try {
        res.status(200).json({ message: "carrito creado", cart })
    } catch (error) {
        error
    }
})

router.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartManager.getCartByID(+cid)
        if (cart === "no cart") {
            res.status(400).json({ message: "carrito no encontrado" })
        }
        else {
            res.status(200).json({ message: "carrito encontrado", cart })
        }
    } catch (error) {
        error
    }
})

router.post('/cart/:cid/product/:pid', async (req, res) => {

    let cartId = req.params.cid
    let productId = req.params.pid
    try {
        const cart = await cartManager.addToCart(+cartId, +productId)
        res.status(200).json(cart)
    } catch (error) {
        error
    }
})

export default router