let proxy = require('http-proxy-middleware');
let fallback = require('connect-history-api-fallback');
module.exports = {
    
    port: 8081,
    files: ["./client/**/*.{html,htm,css,js}"],
    // server: { "baseDir": ["./client/app", "./client/libraries"] },
    server: {
        baseDir: ["./client/app", "./client/libraries"],
        middleware: {
            1: proxy('/', {target: 'http://localhost:8080', changeOrigin: false }),
            2: fallback({index: './client/app/index.html', verbose: true})
        }
    },
};

