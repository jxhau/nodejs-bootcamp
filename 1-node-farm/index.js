const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./starter/modules/replaceTemplate.js')

/////////////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('file has been written')
//             })
//         });
//     });
// });
// console.log('Will read file');


/////////////////////////////////////////
// SERVER
const templateOverview = fs.readFileSync(
    `${__dirname}/starter/templates/template-overview.html`, 'utf-8'
    );
const templateCard = fs.readFileSync(
    `${__dirname}/starter/templates/template-card.html`, 'utf-8'
    );
const templateProduct = fs.readFileSync(
    `${__dirname}/starter/templates/template-product.html`, 'utf-8'
    );

const data = fs.readFileSync(
    `${__dirname}/starter/dev-data/data.json`, 'utf-8'
    );    
const productObj = JSON.parse(data);

// console.log(slugify('hi hello world', {lower: true}));

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // overview
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        const cardHtml = productObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

        res.end(output);
    

    // product
    } else if(pathname === '/product') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const prod = productObj[query.id];
        const output = replaceTemplate(templateProduct, prod);
        // console.log(output);
        res.end(output);
    

    // API
    } else if(pathname === '/api') {
        res.writeHead(200, { 'Content-Type':'application/json' });
        res.end(data);   
        
        
    // not found
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-header': 'hello world'
        });
        res.end('<h1>Page not found!</h1>');
    }

    // res.end('Hello from the server');
});

server.listen(8000, '127.0.0.1', (err) => {
    console.log('Listening on port 8000');
});