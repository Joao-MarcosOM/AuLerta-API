const path = require("path")

//Multer é a biblioteca que utilizaremos para fazer o upload
const multer = require("multer");

//A biblioteca crypto será utilizada para gerar hashs aleatórios
const crypto = require("crypto")

//O tmp_folder é onde a imagem chega
const TMP_FOLDER = path.resolve(__dirname, "..", "..","tmp");

//O uploads_folder é onde de fato a imagem vai ficar
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
    storage: multer.diskStorage({
        //Aqui informamos para onde queremos mandar o arquivo
        destination: TMP_FOLDER,
        filename(request, file, callback){
            //Aqui eu gero um nome diferente para cada arquivo
            const fileHash = crypto.randomBytes(10).toString("hex");

            //Aqui eu passo o nome do arquivo
            const fileName = `${fileHash} - ${file.originalname}`;

            return callback(null, fileName);
        }
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}