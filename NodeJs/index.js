const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url=='/home'){
        res.write("Welcome Home!")
    }else if(req.url == '/about'){
        res.write("Welcome to about Us page!")
    }else if(req.url == '/node'){
        res.write("Welcome to my Node js project!")
    }
    res.end()
})

server.listen(4000,console.log("server is listening on port 4000..."))