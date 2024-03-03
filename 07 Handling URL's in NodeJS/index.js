const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        return res.end()
    }
    const myData = `${Date.now()}: New Request Received from ${req.url}\n`

    // now our http module doesn't handle query parameter of url so we install a package called url
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    // With console.log(myUrl) we are getting an object Url {  protocol: null,  slashes: null,  auth: null,  host: null,  port: null,  hostname: null,  hash: null,  search: '?name=Jay',  query: 'name=Jay',  pathname: '/contact',  path: '/contact?name=Jay',  href: '/contact?name=Jay' }

    fs.appendFile("logs.txt", myData, (error, data) => {
        // res.end("Hello From Server Again")
        // now we are sending res according to endpoint 

        switch (myUrl.pathname) {
            case '/':
                res.end("Hello From Home")
                break;
            case '/about':
                const userName = myUrl.query.myname;
                res.end(`Hi, ${userName}`) // now the username will match with passed query to url
                // res.end("My name is jay")
                break;
            case '/search':
                const searchedValue = myUrl.query.search_query;
                res.end(`You search result for ${searchedValue}`)
                // Url {  protocol: null,  slashes: null,  auth: null,  host: null,  port: null,  hostname: null,  hash: null,  search: '?search_query=ReactJs+TypeScript+Redux',  query: [Object: null prototype] { search_query: 'ReactJs TypeScript Redux' },  pathname: '/search',  path: '/search?search_query=ReactJs+TypeScript+Redux',  href: '/search?search_query=ReactJs+TypeScript+Redux'}
                break;
            case '/contact':
                res.end("Hello From contact")
                break;

            default:
                break;
        }
        // switch (req.url) {
        //     case '/':
        //         res.end("Hello From Home")
        //         break;
        //     case '/about':
        //         res.end("Hello From about")
        //         break;
        //     case '/contact':
        //         res.end("Hello From contact")
        //         break;

        //     default:
        //         break;
        // }
    })
})

server.listen(8000, () => {
    console.log("Server is started at port http://localhost:8000");
})