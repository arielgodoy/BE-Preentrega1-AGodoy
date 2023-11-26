const { Router } = require('express');
const CartsManager = require('../managers/CartManager.js');
const cartsService = new CartsManager('./src/data/carts.json');
const router = Router();

// Ruta para crear un nuevo carrito
router

.get('/', async (req, res) => {
    try {
        await cartsService.readFile();                
        const allcarts = await cartsService.getCars();        
        res.send({
            status: 'success',
            payload: allcarts
          });        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
})

.post('/', async (req, res) => {
  try {
    const result = await cartsService.createCart();
    res.send({
      status: 'success',
      payload: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Error interno del servidor'
    });
  }
})



.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(parseInt(cid));
    if (typeof cart === 'string') {
      res.status(404).send({
        status: 'error',
        message: cart
      });
    } else {
      res.send({
        status: 'success',
        payload: cart
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Error interno del servidor'
    });
  }
})

// Ruta para agregar un producto al carrito
.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartsService.addProductToCart(parseInt(cid), parseInt(pid));
    if (typeof result === 'string') {
      res.status(404).send({
        status: 'error',
        message: result
      });
    } else {
      res.send({
        status: 'success',
        payload: result
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;

