const http = require('http');
const port = 3000;
const host = 'localhost';

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Powered-By', 'Node.js');
    response.statusCode = 404;

    // response.end('<h1>Hello World!</h1>');
    // response.end(JSON.stringify({
    //     message: 'Halaman Tidak ditemukan'
    // }));
    const {method, url} = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini halaman utama'
            }))
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`
            }));
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Halaman About'
            }))
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Halo, ${name}`
                }))
            });
        } else {
            response.statusCode = 400;
            // response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`
            }));
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan'
        }));
    }

    // if (method === 'GET') {
    //     response.end('<h1>Hello World!</h1>');
    // }

    // if (method === 'POST') {
    //     // response.end('<h1>Ini POST</h1>');
    //     let body = [];

    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const { name } = JSON.parse(body);
    //         response.end(`<h1>Halo, ${name}!</h1>`);
    //     });
    // }

    // if (method === 'PUT') {
    //     response.end('<h1>Ini PUT</h1>');
    // }

    // if (method === 'DELETE') {
    //     response.end('<h1>Ini DELETE</h1>');
    // }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
})

// console.log('Hello, saya akan belajar mambuat server');