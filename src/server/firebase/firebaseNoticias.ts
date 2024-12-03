import { Request, Response, NextFunction } from 'express';
import { bucketInstance, BUCKET } from './buket';  

interface UploadedFile extends Express.Multer.File {
    firebaseUrl?: string;
}

export const uploadSingleImg = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as UploadedFile;
    console.log('Arquivo recebido:', file);

    if (!file) {
        console.log('Nenhum arquivo enviado, continuando para o próximo middleware.');
        return next(); // Continua para o próximo middleware sem erro
    }

    try {
        const folderPath = `uploads_noticias/`;
        const formattedFilename = `${folderPath}${Date.now()}_${file.originalname}`;
        const fileUpload = bucketInstance.file(formattedFilename);

        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        await new Promise<void>((resolve, reject) => {
            stream.on('error', (err) => {
                console.error('Erro ao fazer upload do arquivo:', err);
                reject(err);
            });

            stream.on('finish', async () => {
                try {
                    await fileUpload.makePublic();
                    const firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${formattedFilename}`;
                    file.firebaseUrl = firebaseUrl;
                    console.log('URL do Firebase:', firebaseUrl);
                    req.body.url = firebaseUrl; // Adiciona a URL da imagem ao req.body para uso posterior
                    resolve();
                } catch (err) {
                    console.error('Erro ao tornar o arquivo público:', err);
                    reject(err);
                }
            });

            stream.end(file.buffer);
        });

        // Chama o próximo middleware ou controlador
        next();
    } catch (err) {
        console.error('Erro geral:', err);
        next(err);
    }
};
