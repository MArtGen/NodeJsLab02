const http = require('http');
const fs = require('fs-extra');
const shop = require('./classes/shop.ts');
const buyer = require('./classes/buyer.ts');

const METHODS = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const PORT = 3000;
const HOST = '127.0.0.1';
const FILENOTFOUND = "File not found";
const PATH = "./files/";
const BUYER = 'buyer';
const SHOP = 'shop';
let date = new Date();

// Для теста
let tempbuyer = {
    orders: [{
                order_date: date.toDateString().replace(/\s+/g, '-'),
                order_cost: 148
            },
            {
                order_date: date.toDateString().replace(/\s+/g, '-'),
                order_cost: 259
            }]
};

let tempshop = {
    buyers: [{
                id: 1,
                buyer: tempbuyer
            }]
};

let file_buyer = BUYER + '-' +
                 date.toDateString().replace(/\s+/g, '-') + '.txt';

let file_shop  = SHOP + '-' +
                 date.toDateString().replace(/\s+/g, '-') + '.txt';

const server = http.createServer((req, res) => {
    if (req.method === METHODS.GET) {
        switch(req.url) {
            case '/api/buyer': return readTodo('buyer', res);
            case '/api/shop': return readTodo('shop', res);
            case '/api/newfile/buyer': return createTodo('buyer', res);
            case '/api/newfile/shop': return createTodo('shop', res);
        };
     } else if (req.method === METHODS.POST) {
        let body = '';
        req.on('data', (data: { toString: () => string; }) => body += data.toString());
        switch(req.url) {
            case '/api/buyer': req.on('end', () => writeTodo(file_buyer, body)); break;
            case '/api/shop': req.on('end', () => writeTodo(file_shop, body)); break;
            case '/api/cancord': req.on('end', () => cancelOrder(body)); break;
            default: res.end('Please check the url');
            };
    } else if (req.method === METHODS.PUT) {
        let body = '';
        req.on('data', (data: { toString: () => string; }) => body += data.toString());
        if (req.url === '/api') {
            req.on('end', () => updTodo(body));
            res.end('Done. Please check the log');
        };
    } else if (req.method === METHODS.DELETE) {
        if (req.url === '/api') {
            return deleteTodo(res);
        };
    };
    return notFoundError(res);
});

server.listen(PORT, HOST, () => console.log('Running'));

function notFoundError(res: { end: (arg0: string) => void; }) {
    res.end('404 not found. Please check the request.');
}

function createTodo(classname: string, res: { end: { (arg0: string): void; (arg0: string): void; (arg0: string): void; (arg0: string): void; }; }) {
    if (!fs.existsSync(PATH)) fs.mkdirSync(PATH);
    if (classname == 'buyer') {
        if (!fs.existsSync(PATH + file_buyer)) {
            fs.closeSync(fs.openSync(PATH + file_buyer, 'w'));
            fs.writeFileSync(PATH + file_buyer, JSON.stringify(tempbuyer));
            res.end(file_buyer + ' was created');
        }
        else res.end(file_buyer + ' already exists');
    } else if (classname == 'shop') {
        if (!fs.existsSync(PATH + file_shop)) {
            fs.closeSync(fs.openSync(PATH + file_shop, 'w'));
            fs.writeFileSync(PATH + file_shop, JSON.stringify(tempshop));
            res.end(file_shop + ' was created');
        }
        else res.end(file_shop + ' already exists');
    } else notFoundError(res);
};

function readTodo(classname: string, res: { end: { (arg0: any): void; (arg0: string): void; (arg0: any): void; (arg0: string): void; }; }) {
    if (classname == 'buyer') {
        if (fs.existsSync(PATH + file_buyer)) {
            let fileContent = JSON.parse(fs.readFileSync(PATH + file_buyer, 'utf8'))
            if (typeof fileContent.orders !== 'undefined') {
                var somebuyer = new buyer(fileContent.orders);
                console.log(somebuyer.readOrders(date.getMonth() + 1));
                res.end(somebuyer.readOrders(date.getMonth() + 1));
            } else console.log("Wrong content: " + JSON.stringify(fileContent));
        } else res.end(FILENOTFOUND);
    } else if (classname == 'shop') {
        if (fs.existsSync(PATH + file_shop)) {
            let fileContent = JSON.parse(fs.readFileSync(PATH + file_shop, 'utf8'));
            if (typeof fileContent.buyers !== 'undefined') {
                var someshop = new shop(fileContent.buyers);
                console.log(someshop.readBuyers(date.getMonth() + 1));
                res.end(someshop.readBuyers(date.getMonth() + 1));
            } else console.log("Wrong content: " + JSON.stringify(fileContent));
        } else res.end(FILENOTFOUND);
    } else notFoundError(res);
};

 function writeTodo(file_name: string, body: string) {
    let text: { orders: any; buyers: any; };
    try { 
        text = JSON.parse(body); 
    }
    catch(e) { 
        console.log ('Error of JSON.parse. Please check the data');
        return;
    };
    if (fs.existsSync(PATH + file_name)) {
        if (file_name.indexOf('buyer') !== -1) {
            if ((typeof text.orders !== 'undefined')) {
                fs.writeFileSync(PATH + file_name, JSON.stringify(text));
                console.log("Text was added into the file.");
            } else console.log("Wrong text. Check the form of text.");
        } else if (file_name.indexOf('shop') !== -1) {
            if ((typeof text.buyers !== 'undefined')) {
                fs.writeFileSync(PATH + file_name, JSON.stringify(text));
                console.log("Text was added into the file.");
            } else console.log("Wrong text. Check the form of text.");
        } else console.log(FILENOTFOUND);
    };
};

function deleteTodo(res: { end: { (arg0: string): void; (arg0: string): void; }; }) {
    fs.readdir(PATH, function(err: any, files: { length: any; }) {
        if (err) {
            if (err) throw err;
        }
        else {
            if (!files.length) {
                res.end(FILENOTFOUND);
            }
            else {
                fs.remove(PATH, (err: any) => {
                    if (err) throw err;
                    res.end('Files were deleted');
                    console.log('Files were deleted.');
                });
            }
        }
    });
};

function cancelOrder(body: string) {
    let text: { order_num: any; buyer_id: any; };
    try { 
        text = JSON.parse(body); 
    }
    catch(e) { 
        console.log ('Error of JSON.parse. Please check the data');
        return;
    };
    if (fs.existsSync(PATH + file_buyer) && fs.existsSync(PATH + file_shop)) {
        let fileBuyerContent = JSON.parse(fs.readFileSync(PATH + file_buyer, 'utf8'));
        var cancbuyer = new buyer(fileBuyerContent.orders);
        cancbuyer.cancelOrder(text.order_num);
        let fileShopContent = JSON.parse(fs.readFileSync(PATH + file_shop, 'utf8'));
        var cancshop = new shop(fileShopContent.buyers);
        for (let i = 0; i < cancshop.buyers.length; i++) {
            if (cancshop.buyers[i].id === text.buyer_id) {
                cancshop.buyers[i].buyer.orders.splice(text.order_num - 1, 1);
            };
        };
        fs.writeFileSync(PATH + file_buyer, JSON.stringify(cancbuyer));
        fs.writeFileSync(PATH + file_shop, JSON.stringify(cancshop));
        console.log("Order was canceled. Check the files.")
    } else console.log("Nothing was canceled.");
};

function updTodo(body: string) {
    let newOrder: any;
    console.log(body);
    try { 
        newOrder = JSON.parse(body); 
    }
    catch(e) { 
        console.log ('Error of JSON.parse. Please check the data');
        return;
    };
    if (fs.existsSync(PATH + file_buyer) && fs.existsSync(PATH + file_shop)) {
        let fileBuyerContent = JSON.parse(fs.readFileSync(PATH + file_buyer, 'utf8'));
        var newbuyer = new buyer(fileBuyerContent.orders);
        newbuyer.newOrder(newOrder);
        let fileShopContent = JSON.parse(fs.readFileSync(PATH + file_shop, 'utf8'));
        var newBuyerShop = new shop(fileShopContent.buyers);
        for (let i = 0; i < newBuyerShop.buyers.length; i++) {
            newBuyerShop.buyers[i].buyer.orders.push(newOrder);
        };
        console.log(newbuyer);
        console.log(newBuyerShop);
        fs.writeFileSync(PATH + file_buyer, JSON.stringify(newbuyer));
        fs.writeFileSync(PATH + file_shop, JSON.stringify(newBuyerShop));
        console.log("Order was added. Check the files.")
    } else console.log("Nothing was added.");
}