const { resolve } = require('path')
module.exports = {
    build: {
        rollupOptions: {
            input: {
                main: resolve('/', 'index.html'),
                portfolio: resolve('/', 'portfolio.html'),
            }
        }
    }
}
