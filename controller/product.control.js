import {create,findAll,update, findById, remove } from "../model/product.model.js";
import { getPostData } from "../utils.js";

export async function getProducts(req, res) {
    try {
        const products = await findAll();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(products));
        }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getProduct(req, res, id) {
    try {
        if (!id) {
            res.status(400).json({ error: "Bad request" });
        }else{
            const product = await findById(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(product));
    }
    }
    catch (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: err.message}));    
    }
}

export async function createProduct(req, res) {
    try {
        const body = await getPostData(req, res);
        const {category, trademark, price, entrydate, description, quantity, expire, image} = JSON.parse(body);
        const product = {
                category, 
                trademark, 
                price, 
                description, 
                entrydate,
                quantity,
                image,
                expire
            };

            const newProduct = await create(product);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newProduct));
    } catch (error) {
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}

export async function updateProduct(req, res, id) {
    try {
        const product = await findById(id);
        if (!product) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "Product not found"}));
        }else{
            const body = await getPostData(req, res);
            const {category, trademark, price, entrydate, description, quantity, expire, image} = JSON.parse(body);
            const newProduct = {
                category: category || product.category, 
                trademark: trademark || product.trademark, 
                price: price || product.price,
                description: description || product.description,
                entrydate: entrydate || product.entrydate,
                quantity: quantity || product.quantity,
                image: image || product.image,
                id: id || product.id,
                expire: expire || product.expire
            };

            const updProduct = await update(id, newProduct);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newProduct));
        }
    } catch (error) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}

export async function removeProduct(req, res, id) {
    try {
        const product = await findById(id);
        if (!product) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "Product not found"}));
        }else{
            const delProduct = await remove(id);
            res.writeHead(204, {"Content-Type": "application/json"});
            res.end();
        }
    } catch (error) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}