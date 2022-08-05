const express = require('express');
const cartsRepo = require('../repository/carts');
const productsRepo = require('../repository/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// make sure that the user has a cart item assigned to the sessions when making a post request
router.post('/cart/products', async (req, res) => {

    // setup a temporary reference for the cart object
    let cart; 
    if (!req.session.cartId){
        // if the session does not have a cart create a new cart and assign it to the session
        cart = await cartsRepo.create({items: []});
        req.session.cartId = cart.id;
    }else{
        //retrieve the the cart corresponding to the id of the current session
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    //assert whether requested item already exists in the cart
    const existingItem = cart.items.find(item => item.id === req.body.productId);

    if(existingItem){
        // increment 
        existingItem.quantity++;
    }else{
        cart.items.push({id: req.body.productId, quantity: 1});
    }
    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
    
    if(!req.session.cartId){
        return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    for (let item of cart.items) {
         const product = await productsRepo.getOne(item.id);

         item.product = product;
    }

    res.send(cartShowTemplate({items: cart.items}))
});

router.post('cart/products/delete', async (req, res) => {
    const {itemId} = req.body;
    const cart = await cartsRepo.getOne(req.session.cardId);

    const items = cart.items.filter(item => item.id !== itemId);

    await cartsRepo.update(req.session.cartId, {items});

    res.redirect('/cart');
});

module.exports = router;