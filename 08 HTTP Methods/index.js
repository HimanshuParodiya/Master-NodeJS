const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        return res.end()
    }
    const myData = `${Date.now()}: New Request Received from ${req.url} with ${req.method} method\n`

    // now our http module doesn't handle query parameter of url so we install a package called url
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    // With console.log(myUrl) we are getting an object Url {  protocol: null,  slashes: null,  auth: null,  host: null,  port: null,  hostname: null,  hash: null,  search: '?name=Jay',  query: 'name=Jay',  pathname: '/contact',  path: '/contact?name=Jay',  href: '/contact?name=Jay' }
    fs.writeFile('/log.txt', "This write file Async the second argument", (error) => { })

    fs.appendFile("log.txt", myData, (error, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end("Hello From Home")
                break;
            case '/about':
                const userName = myUrl.query.myName;
                res.end(`Hi, ${userName}`) // now the username will match with passed query to url
                break;
            case '/search':
                const searchedValue = myUrl.query.search_query;
                res.end(`You search result for ${searchedValue}`)
                break;
            case '/contact':
                res.end("Hello From contact")
                break;
            case '/signup':
                if (req.method === "GET") {
                    res.end("This is a signup form")

                }
                else if (req.method === "POST") {
                    // DB query
                    res.end("Success");
                }
                break;

            default:
                res.end("404 Not Found")
                break;
        }
    })
})

server.listen(8000, () => {
    console.log("Server is started at port http://localhost:8000");
})

// now you might be think how TDS work in future we will use ExpressJs