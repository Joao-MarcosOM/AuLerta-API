require("dotenv/config");
//Aqui eu faço a importação da biblioteca dotenv para que eu tenha acesso as variáveis de ambiente

require("express-async-errors")
//Aqui importamos a biblioteca para tratar os erros

const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");

const uploadConfig = require("./configs/upload");

const express = require("express");
// É como se eu tivesse pegando todas as funcionalidades da pasta express e colocando dentro da constante express

const routes = require("./routes")
//Por padrão, se a gente nao diz qual arquivo queremos acessar de uma pasta, ele buscará o index

migrationsRun();

//Aqui eu importo a biblioteca cors que vai habilitar que o frontend consuma as requisições do backend
const cors = require("cors");

const app = express();
//Essa variável é criada para que eu inicialize o express para poder utilizar ele

//Aqui eu habilito o meu backend de forma que consiga atender as requisições do frontend
app.use(cors());

app.use(express.json());
//Essa linha vai mostrar para a aplicação que estaremos trocando informações em formato JSON

//Aqui estou criando a rota /files que utilizara o método static para enviar arquivos estáticos
app.use("/files",express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes)

app.use((error , request, response, next) => {
    //Isso daqui é para verificar se o erro foi por parte do cliente
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    //Se não for do lado do cliente o erro, emitiremos um erro padrão
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const PORT = process.env.PORT || 3333;
//Porta onde o express ficará observando os pedidos


app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
//Aqui eu estou informando que a aplicação deve ficar monitorando a porta que eu escolhi