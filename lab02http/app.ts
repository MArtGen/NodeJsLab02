var helper = require('../helper.ts');
var http = require('http');

const METHODS = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const PORT = 3000;
const HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
    if (req.method === METHODS.GET) {
        switch(req.url) {
            case '/api/buyer': return helper.readTodo('buyer', res);
            case '/api/shop': return helper.readTodo('shop', res);
        };
     } else if (req.method === METHODS.POST) {
        let body = '';
        req.on('data', (data: { toString: () => string; }) => body += data.toString());
        switch(req.url) {
            case '/api/newbuyer': req.on('end', () => helper.createTodo(body)); break;
            case '/api/cancord': req.on('end', () => helper.cancelOrder(body)); break;
            default: res.end('Please check the url');
            };
    } else if (req.method === METHODS.PUT) {
        let body = '';
        req.on('data', (data: { toString: () => string; }) => body += data.toString());
        if (req.url === '/api/neworders') {
            req.on('end', () => helper.updTodo(body));
            res.end('Done. Please check the log');
        };
    } else if (req.method === METHODS.DELETE) {
        if (req.url === '/api/') {
            return helper.deleteTodo(res);
        };
    };
    return helper.notFoundError(res);
});

server.on('request', function(res: { headers: { host: string; connection: string; }; }) {
    console.dir(res.headers.host + ' ' + res.headers.connection);
})

server.listen(PORT, HOST, () => console.log('Running'));