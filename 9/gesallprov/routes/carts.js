const express = require('express');
const cartsRepo = require('../repository/carts');
const productsRepo = require('../repository/products')

const router = express.Router();

router.post('/cart/products', async (req, res) => {

    let cart; 
    if (!req.session.cartId){

        cart = await cartsRepo.create({items: []});
        req.session.cartId = cart.id;
    }else{
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    console.log();

    const existingItem = cart.items.find(item => item.id === req.body.productId);

    if(existingItem){
        existingItem.quantity++;
    }else{
        cart.items.push({id: req.body.productId, quantity: 1});
    }
    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    res.send('Product added to cart');
});

router.get('/cart', (req, res) => {
    if(!req.session.cartId){
        return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    for (let item of cart.items) {
         
    }
});

module.exports = router;