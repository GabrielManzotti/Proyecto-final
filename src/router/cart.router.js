import { Router } from 'express'
import { cartManager } from '../entities/cart.js'
const router = Router()

router.get('/', async (req, res) => {
    const cart = await cartManager.getCarts()
    try {
        if (cart === "no info") {
            res.status(400).json({ message: "no info" })
        } else {
            res.status(200).json({ message: "carts", cart })
        }
    } catch (error) {
        error
    }
})

router.post('/', async (req, res) => {
    const cart = await cartManager.createCart()
    try {
        res.status(200).json({ message: "cart created", cart })
    } catch (error) {
        error
    }
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartManager.getCartByID(+cid)
        if (cart === "no cart") {
            res.status(400).json({ message: "cart no found" })
        }
        else {
            res.status(200).json({ message: "cart founded", cart })
        }
    } catch (error) {
        error
    }
})

router.post('/:cid/product/:pid', async (req, res) => {

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