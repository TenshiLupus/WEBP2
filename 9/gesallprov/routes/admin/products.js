const express = require('express');  
const multer = require ('multer');

const {handleErrors, requireAuth} = require('./middleware'); 
const productsRepo = require('../../repository/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const {requireTitle, requirePrice} = require('./validators');

const router = express.Router();
const upload = multer({storage: multer.memoryStorage() });

//Routes that will only be used by the administrator of the site

router.get('/admin/products', requireAuth, async (req, res) => {
    const products =  await productsRepo.getAll();
    res.send(productsIndexTemplate({products}));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({}));
});

//Route section to create an new product and add it to the existing repositories
router.post('/admin/products/new', 
requireAuth,
upload.single('image'), 
[requireTitle, requirePrice],
handleErrors(productsNewTemplate),
async (req, res) => {  
  
    const image = req.file.buffer.toString('base64');   
    const {title, price} = req.body;
    await productsRepo.create({title, price, image}); 
    
    res.redirect('/admin/products');
});

//Get the details of the products that is about to get updated
router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
    const product = await productsRepo.getOne(req.params.id);

    if(!product){
        return res.send('product not found');
    }

    res.send(productsEditTemplate({product}));
})

//Update product with new requested details
router.post('/admin/products/:id/edit', 
requireAuth, 
upload.single('image'),
[requireTitle, requirePrice],
handleErrors(productsEditTemplate, async req => {
    const product = productsRepo.getOne(req.params.id);
    return {product};
}), 
async (req, res) => {
    const changes = req.body;
    if (req.file){
        // convert uploaded image to a base64 format for storage
        changes.image = req.file.buffer.toString('base64');
    }
    // handle yielded error when no item with the specified id was found
    try{
    await productsRepo.update(req.params.id, changes);
    }catch (err){
        return res.send('could not find item');
    }

    res.redirect('/admin/products');
});

//route section for when an item is requested to be deleted from the repository
router.post('/admin/products/:id/delete', requireAuth, async (req,res) => {
    await productsRepo.delete(req.params.id);

    res.redirect('/admin/products')
});
module.exports = router;