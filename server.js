const http=require("node:http"),fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"public"),types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml"};
http.createServer((req,res)=>{let p;try{p=decodeURIComponent(new URL(req.url,"http://localhost").pathname)}catch{res.writeHead(400).end("Bad request");return}
const f=path.resolve(root,"."+(p==="/"?"/index.html":p));if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403).end("Forbidden");return}
fs.readFile(f,(e,d)=>{if(e){res.writeHead(404).end("Not found");return}res.writeHead(200,{"Content-Type":types[path.extname(f)]||"application/octet-stream","X-Content-Type-Options":"nosniff"});res.end(d)})}).listen(4175,"127.0.0.1",()=>console.log("Favicon Forge: http://127.0.0.1:4175"));
