import express from 'express'
import { productManager } from './script2doEntregable.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts(req.query)
        if (!products) {
            res.status(400).json({ message: 'No products found' })
        } else {
            res.status(200).json({ message: 'Products found', products })
        }
    } catch (error) {
        res.status(500).json({ message: "error!" })
    }
})


app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const product = await productManager.getProductsById(+pid)
        if (!product) {
            res.status(400).json({ message: 'product no found wiht te id' })
        }
        else {
            res.status(200).json({ message: 'product found', product })
        }
    } catch (error) {

    }
})

app.post('/products', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.status(200).json({ message: 'Some data is missing' })
    }
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(200).json({ message: 'Product created', product: newProduct })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
)

app.post('/products/delete/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const deleteProduct = await productManager.deleteProductByID(+pid)
        if (deleteProduct === "no existe el producto") {
            res.status(400).json({ message: 'product no exists' })
        }
        else {
            res.status(200).json({ message: 'The product was delete', product: deleteProduct })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
)

app.post('/products/update/:pid', async (req, res) => {
    const { pid } = req.params
    const { title, description, price, thumbnail, stock } = req.body
    const updateProduct = await productManager.updateProductByID(+pid, req.body)
    try {
        if (updateProduct === "no existe el producto") {
            return res.status(400).json({ message: 'product no exists' })
        }
        else {
            return res.status(200).json({ message: 'product update succesfully' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}
)


app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})