import fs from 'fs';
import { resolve } from 'path';

export function writeData(file, content){
    fs.writeFileSync(file, JSON.stringify(content), 'utf-8', (err) => {
        if(err){
            console.log(err)
        }
    });
}

export function getPostData(req, res){
    return new Promise((resolve, reject) => {
        try {
          let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString();
            })
            req.on('end', () => {
                resolve(body);
            })  
        } catch (error) {
            reject(error);
        }
})}