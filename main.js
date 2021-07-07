const fs = require('fs');
const http=require('http')
let url = require('url');

http.createServer(function(req, res){
    let queryData = url.parse(req.url, true).query;
    if (!queryData){
        queryData.id= "Home.html";
    }
    console.log(queryData.id);
    fs.readdir('./data', (err, files)=> {
        let list='';
        files.forEach(file =>{
            list=list+`<ul><li><a href="/?id=${file}">${file.slice(0,-5)}</a></li></ul>`;
        });
        fs.readFile(`./data/${queryData.id}`,'utf8', (err, main_content)=>{
            let template =`
                <!DOCTYPE html>
                <html>
                <link rel="stylesheet" href="./design.css" type="text/css">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" "content"="IE=edge">
                    <meta name="viewport" "content"="width=device-width, initial-scale=1.0">
                    <title>김나연</title>
                </head>
                <nav>
                    ${list}
                </nav>
                <body>
                    ${main_content}
                </body>
                </html>
                `;
            res.writeHead(200);
            res.write(template);
            res.end();
            }
        )}
    )
}).listen(3000);