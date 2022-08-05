// set of router handlers that will be visible to all users of the application

//use express as the routing middleware
const express = require('express');
const productsRepo = require('../repository/products');
const productsIndexTemplate = require('../views/products/index');


//create an express routing handler 
const router = express.Router();

//root request to the user home page
router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({products}));
});

module.exports = router;