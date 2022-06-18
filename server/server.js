import http, { get } from "http";
import { getProducts, getProduct, createProduct, updateProduct, removeProduct } from "../controller/product.control.js";

export const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET" || req.url === "/api/products/" && req.method === "GET") {
    getProducts(req, res);
  }
  else if(req.url === "/api" && req.method === "GET"){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h1 class='text-2xl m-5'>API</h1><script src='https://cdn.tailwindcss.com'></script>");
    res.end("<ul class='m-5'><li><a href='/api/products'>- Products</a></li></ul>");
  }
  else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET"){
    const id = req.url.split("/")[3];
    getProduct(req, res, id)
  }else if(req.url === '/api/products' && req.method === 'POST'){
    createProduct(req, res);
  }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT"){
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  }
  else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE"){
    const id = req.url.split("/")[3];
    removeProduct(req, res, id);
  }  
    else{
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({error: "Not found"}));
  }
});
