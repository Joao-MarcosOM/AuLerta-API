//O AppError será utilizado para padronizar qual é o tipo de mensagem que vai aparecer quando tiver algum tipo de exceção

class AppError{
    message;
    statusCode;

    //O método construtor é o método que é chamado toda vez que a classe for instanciada 
    constructor(message,statusCode = 400){
        //Quando eu uso o this, eu to pegando a variável message que eu recebo pelo construtor da classe e eu repasso ela para o message que faz parte do contexto global
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;