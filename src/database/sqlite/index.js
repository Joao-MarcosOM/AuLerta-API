const sqlite3 = require("sqlite3"); // Esse é o drive de fato que vai estabelecer a comunicação com minha base de dados
const sqlite = require("sqlite"); // Esse é responsável por conectar

//Aqui importaremos a biblioteca path, que é utilizada para resolver problemas de rota de arquivo
const path = require("path");

async function sqliteConnection(){
    //Aqui estou abrindo uma conexão
    const database = await sqlite.open({
        //Aqui agora eu vou mostrar onde quero salvar o arquivo do BD
        //O __dirname pega automático aonde eu estou no meu projeto
        //Depois eu volto uma pasta e crio um arquivo chamado database.db
        filename: path.resolve(__dirname, "..", "database.db"),

        //Agora eu preciso dizer qual vai ser o drive de conexão que eu devo utilizar
        driver: sqlite3.Database
    });

    return database
    
}

module.exports = sqliteConnection