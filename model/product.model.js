import products from "../data/index.json" assert { type: "json" };
import { writeData } from "../utils.js";

export function create(product) {
  return new Promise((resolve, reject) => {
    const id = (products.length + 1).toString();
    const newProduct = { ...product, id: id };
    products.push(newProduct);
    writeData("data/index.json", products);
    resolve(newProduct);
  });
}

export async function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

export function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

export function update(id, product){
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      reject(new Error("Product not found"));
    } else {
      products[index] = product;
      writeData("data/index.json", products);
      resolve(product[index]);
    }
  });
}

export function remove(id){
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      reject(new Error("Product not found"));
    } else {
      products.splice(index, 1);
      writeData("data/index.json", products);
      resolve();
    }
  });
}
