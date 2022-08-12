const Repository = require('./repository');

// Extends Repository class, inherint functionality from it
class ProductsRepository extends Repository{
    
}

module.exports = new ProductsRepository('Products', 'title, price, image, id');