var shop = require ('./classes/shop.ts');
var buyer = require ('./classes/buyer.ts');
var fs = require ('fs-extra');

const FILENOTFOUND = "File not found";
const PATH = "./buyers/";
const BUYER = 'buyer';
const FILE_SHOP  = './shop.txt';
let date = new Date();

let text: { id: number, orders:{ order_date: Date, order_cost: number }[] };

//Для теста
/* let tempbuyer = {
    id: 1,
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
}; */

let file_buyer = BUYER + '-' +
                 date.toDateString().replace(/\s+/g, '-') + '.txt';


function notFoundError(res: { end: (arg0: string) => void; }) {
    res.end('404 not found. Please check the request.');
}

function createTodo(body) {
    try { 
        text = JSON.parse(body); 
    }
    catch(e) { 
        console.log ('Error of JSON.parse. Please check the data.' + '\n' + e);
        return;
    };
    if (!fs.existsSync(PATH)) fs.mkdirSync(PATH);
    if (!fs.existsSync(PATH + file_buyer)) {
        let shop = {
            buyers: [{
                        id: text.id,
                        buyer: text
                    }]
        };
        fs.closeSync(fs.openSync(PATH + file_buyer, 'w'));
        fs.writeFileSync(PATH + file_buyer, JSON.stringify(text));
        fs.writeFileSync(FILE_SHOP, JSON.stringify(shop));
        console.log('New buyer was added into the ' + FILE_SHOP);
    } else {
        console.log('Files already exists');
    };
};

function readTodo(classname: string, res) {
    if (classname == 'buyer') {
        if (fs.existsSync(PATH + file_buyer)) {
            let fileContent = JSON.parse(fs.readFileSync(PATH + file_buyer, 'utf8'))
            if (typeof fileContent.orders !== 'undefined') {
                var somebuyer = new buyer.Buyer(fileContent.orders);
                console.log(somebuyer.readOrders(date.getMonth() + 1));
                res.end(somebuyer.readOrders(date.getMonth() + 1));
            } else console.log("Wrong content: " + JSON.stringify(fileContent));
        } else console.log(FILENOTFOUND);
    } else if (classname == 'shop') {
        let fileContent = JSON.parse(fs.readFileSync(FILE_SHOP, 'utf8'));
        if (typeof fileContent.buyers !== 'undefined') {
            var someshop = new shop.Shop(fileContent.buyers);
            console.log(someshop.readBuyers(date.getMonth() + 1));
            res.end(someshop.readBuyers(date.getMonth() + 1));
        } else console.log("Wrong content: " + JSON.stringify(fileContent));
    } else notFoundError(res);
};

 function writeTodo(body: string) {
    try { 
        text = JSON.parse(body); 
    }
    catch(e) { 
        console.log ('Error of JSON.parse. Please check the data.' + '\n' + e);
        return;
    };
    if (fs.existsSync(PATH + file_buyer)) {
        let fileBuyerContent = JSON.parse(fs.readFileSync(PATH + file_buyer, 'utf8'));
        var wrbuyer = new buyer.Buyer(fileBuyerContent.orders);
        let fileShopContent = JSON.parse(fs.readFileSync(FILE_SHOP, 'utf8'));
        var wrshop = new shop.Shop(fileShopContent.buyers);
        for (let i = 0; i < wrshop.buyers.length; i++) {
            if (wrshop.buyers[i].id === text.id) {
                wrshop.buyers[i].buyer.orders.push(text.orders);
            } else {
                wrshop.buyers[text.id].push(text);
            };
        };
        fs.writeFileSync(PATH + file_buyer, JSON.stringify(wrbuyer));
        fs.writeFileSync(FILE_SHOP, JSON.stringify(wrshop));
    } else console.log(FILENOTFOUND);
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
                });
                fs.closeSync(fs.openSync(FILE_SHOP, 'w'));
                res.end('Buyers were deleted. File of shop is empty.');
                console.log('Buyers were deleted. File of shop is empty.');
            }
        }
    });
};

function cancelOrder(body) {
    let canctext: { order_num: number; buyer_id: any; };
    try { 
        canctext = JSON.parse(body); 
    }
    catch(e) { 
        console.log ('Error of JSON.parse. Please check the data');
        return;
    };
    if (fs.existsSync(PATH + file_buyer)) {
        let fileBuyerContent = JSON.parse(fs.readFileSync(PATH + file_buyer, 'utf8'));
        var cancbuyer = new buyer.Buyer(fileBuyerContent.orders);
        console.dir(cancbuyer);
        cancbuyer.cancelOrder(canctext.order_num);
        let fileShopContent = JSON.parse(fs.readFileSync(FILE_SHOP, 'utf8'));
        var cancshop = new shop.Shop(fileShopContent.buyers);
        for (let i = 0; i < cancshop.buyers.length; i++) {
            if (cancshop.buyers[i].id === canctext.buyer_id) {
                cancshop.buyers[i].buyer.orders.splice(canctext.order_num - 1, 1);
            };
        };
        fs.writeFileSync(PATH + file_buyer, JSON.stringify(cancbuyer));
        fs.writeFileSync(FILE_SHOP, JSON.stringify(cancshop));
        console.log("Order was canceled. Check the files.")
    } else console.log("Nothing was canceled.");
};

function updTodo(body: string) {
    try { 
        text = JSON.parse(body); 
    }
    catch(e) { 
        console.log ('Error of JSON.parse. Please check the data');
        return;
    };
    if (fs.existsSync(PATH + file_buyer)) {
        let fileBuyerContent = JSON.parse(fs.readFileSync(PATH + file_buyer, 'utf8'));
        var newbuyer = new buyer.Buyer(fileBuyerContent.orders);
        for (let i = 0; i < text.orders.length; i++)
            newbuyer.newOrder(text.orders[i]);
        let fileShopContent = JSON.parse(fs.readFileSync(FILE_SHOP, 'utf8'));
        var newBuyerShop = new shop.Shop(fileShopContent.buyers);
        for (let i = 0; i < newBuyerShop.buyers.length; i++) {
            if (newBuyerShop.buyers[i].buyer.id === text.id) {
                for (let j = 0; j < text.orders.length; j++)
                    newBuyerShop.buyers[i].buyer.orders.push(text.orders[j]);
            };
        };
        fs.writeFileSync(PATH + file_buyer, JSON.stringify(newbuyer));
        fs.writeFileSync(FILE_SHOP, JSON.stringify(newBuyerShop));
        console.log("Order was added. Check the files.")
    } else console.log("Nothing was added.");
}

module.exports = {
    file_buyer: file_buyer,
    file_shop: FILE_SHOP,
    notFoundError: notFoundError,
    createTodo: createTodo,
    readTodo: readTodo,
    writeTodo: writeTodo,
    deleteTodo: deleteTodo,
    updTodo: updTodo,
    cancelOrder: cancelOrder
}