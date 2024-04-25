const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        if(req.method == 'GET') {
            console.log("Its get Url")
        }
        res.write("Home Page");
        res.end()
    }else if(req.url === "/another") {
        res.write("Annome do another");
        res.end()
    }else {
        res.write(JSON.stringify({"data": "Test Response", "status": "OK"}));
        res.end();
    }
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})