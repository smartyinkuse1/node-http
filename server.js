const http = require('http')
const todos = [
    {id: 1, text: "I wanna do"},
    {id:2, text: "Yeah with you"}
]

const server = http.createServer((req, res)=>{
    const {url, method } = req
    let body = []
    
    req.on('data', chunk =>{
        body.push(chunk)
    }).on('end', ()=> {
        body = Buffer.concat(body).toString()
        let status = 404;
        const response = {
            success: false,
            data: null
        }
        if(method === 'GET' && url ==='/todos') {
            status = 200;
            response.success = true
            response.data = todos
        }else if(method === 'POST' && url === '/todos') {
            const{ id, text } = JSON.parse(body)
            if (!id || !text) {
              status = 400  
            } else {
                todos.push({id,text})
                status = 201;
                response.success = true
                response.data = todos
            }
        }

        res.writeHead(status, {
            'Content-Type':'application/json',
            'X-Powered-By': 'NodeJs'
        })
        res.end(JSON.stringify(response))
    })
})
server.listen(3000, ()=> console.log(`Server running on port 3000`))