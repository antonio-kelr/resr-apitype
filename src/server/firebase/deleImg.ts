import { bucketInstance, BUCKET } from './buket';  

export const deleteImageFromFirebase = async (filePath: string): Promise<void> => {
    try {
        const file = bucketInstance.file(filePath);
        await file.delete();
        console.log('Imagem removida com sucesso do Firebase');
    } catch (error) {
        console.error('Erro ao remover imagem do Firebase:', error);
        throw new Error('Erro ao remover imagem do Firebase');
    }
};
