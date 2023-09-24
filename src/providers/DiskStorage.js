//Biblioteca do próprio node utilizada para a manipulação de arquivos
const fs = require("fs");

//Biblioteca do próprio node utilizada para navegar entre os diretórios
const path = require("path");

const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file){
        //Aqui eu estou mudando o arquivo de lugar
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
        try{
            await fs.promises.stat(filePath);
        }catch{
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;