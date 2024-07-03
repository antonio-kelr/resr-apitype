import admin from "firebase-admin";
import { Request, Response, NextFunction } from 'express';

var serviceAccount = require("../../config/fiberese-key.json");
const BUCKET = 'animated-cinema-392321.appspot.com';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET
});

const bucketInstance = admin.storage().bucket();

interface UploadedFile extends Express.Multer.File {
    firebaseUrl?: string; 
}

export const uploadImg = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const image = req.file as UploadedFile; 
    const formattedFileName = new Date().getTime() + "." + image.originalname.split('.').pop(); // Melhorando a geração do nome do arquivo
    const file = bucketInstance.file(formattedFileName);
    
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype
        }
    });

    stream.on("error", (err) => {
        console.log(err);
        next(err); 
    });

    stream.on("finish", async () => {
        await file.makePublic();

        image.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${formattedFileName}`; 

        next(); 
    });

    stream.end(image.buffer);
};
