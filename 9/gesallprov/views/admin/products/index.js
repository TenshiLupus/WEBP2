const layout = require('../layout');

module.exports = ({products}) => {
    const renderedProducts = products.map((product) => {
        return `
            <div>${product.title}</div>

        `
    }).join('');

    return layout({
        content: `
            <h1 class="Title">Products</h1>
            ${renderedProducts}
        `
    })
};