import { Request, Response, NextFunction } from 'express';
import { CoberturaImagensProvider } from '../database/providers/coberturaImagens';
import { bucketInstance, BUCKET } from './buket'; 



interface UploadedFile extends Express.Multer.File {
    firebaseUrl?: string;
}

type UploadFirebase = {
    firebaseUrl:string
    name: string
}

export const uploadImg = async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as UploadedFile[];
    const coberturaId = parseInt(req.body.cobertura_id); 

    console.log('Arquivos recebidos:', files);
    console.log('cobertura_id:', coberturaId);

    if (!files || files.length === 0) {
        console.log('Nenhum arquivo enviado.');
        return next();
    }

    let resultUploadFirebase: UploadFirebase = {} as UploadFirebase;

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log('Processando arquivo:', file.fieldname);
            console.log('Nome do arquivo:', file.originalname);

            const formattedFilename = `${Date.now()}_${i}.${file.originalname.split('.').pop()}`;
            const fileUpload = bucketInstance.file(formattedFilename);

            const stream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            await new Promise<void>((resolve, reject) => {
                stream.on('error', (err) => {
                    console.error('Erro ao fazer o upload do arquivo:', err);
                    reject(err);
                });

                stream.on('finish', async () => {
                    try {
                        await fileUpload.makePublic();
                        const firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${formattedFilename}`;

                        resultUploadFirebase = { firebaseUrl: firebaseUrl, name: file.mimetype };
                        file.firebaseUrl = firebaseUrl;

                        resolve();
                    } catch (err) {
                        console.error('Erro ao tornar o arquivo público:', err);
                        reject(err);
                    }
                });

                stream.end(file.buffer);
            });

            const result = await CoberturaImagensProvider.create({
                titulo: file.originalname,
                url: resultUploadFirebase.firebaseUrl, 
                cobertura_id: coberturaId,
            });
            
            if (result instanceof Error) {
                throw result;
            }
        }

        console.log('Todos os arquivos foram enviados com sucesso.');
        res.locals.uploadedUrls = resultUploadFirebase;
        console.log('URLs carregadas:', resultUploadFirebase);
        
    } catch (err) {
        console.error('Erro durante o processo de upload:', err);
        next(err);
    }
};
