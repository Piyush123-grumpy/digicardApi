import multer from 'multer'
import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesFolderPath = path.join(__dirname, '..', 'images');

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(imagesFolderPath)
        cb(null,imagesFolderPath)
    },
    filename:(req,file,cb)=>{
        console.log(req,'hello')
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

export const upload =multer({storage:storage})