const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

//Possible application routes
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();
// Dictate where to first look for resources on request
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['athanasia7274']
  })
);

//tell express to use assigned routes on request
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter)
app.use(cartsRouter);

// port on which to listen for requests and responses
app.listen(3000, () => {
  console.log('Listening');
});
