import http from 'node:http';
const items=[{id:'1',name:'Silver fern',quantity:12},{id:'2',name:'Clay pot',quantity:8}];
http.createServer(async(req,res)=>{
 let status=200;let value;
 try{
  if(req.url==='/health')value={ok:true,service:'stockroom-api',release:1};
  else if(req.url==='/items'&&req.method==='GET')value={items};
  else if(req.url==='/items'&&req.method==='POST'){
   let raw='';for await(const chunk of req)raw+=chunk;
   const data=JSON.parse(raw);
   if(typeof data.name!=='string'||!data.name.trim()||!Number.isInteger(data.quantity)||data.quantity<0){status=422;value={error:'name and nonnegative integer quantity required'};}
   else{const item={id:String(items.length+1),name:data.name,quantity:data.quantity};items.push(item);status=201;value=item;}
  }else{status=404;value={error:'not found'};}
 }catch(error){status=400;value={error:String(error)};}
 console.info('stockroom-api',req.method,req.url,status);
 res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify(value));
}).listen(Number(process.env.PORT||8221),'0.0.0.0');
