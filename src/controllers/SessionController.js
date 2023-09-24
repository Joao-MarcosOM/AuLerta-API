const knex = require("../database/knex");

const AppError = require("../utils/AppError");

//Aqui eu estou puxando as configurações de autenticação
const authConfig = require("../configs/auth")
//Aqui eu to chamando um método sign
const { sign } = require("jsonwebtoken")

//Função do Bcrypt que compara duas senhas criptografadas e verifica se elas batem ou não 
const { compare } = require("bcryptjs");

class SessionController{
    async create(request, response){

        const { email, password } = request.body;

        const user = await knex("users").where({email}).first();

        if(!user){
            throw new AppError("E-mail e/ou senha incorreta", 401)
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
            
        }

        //Aqui, iremos gerar o token JWT utilizando a biblioteca json web token
        const {secret, expiresIn} = authConfig.jwt;
        const token = sign({} , secret, {
            subject: String(user.id),
            expiresIn
        })

        return  response.json({user, token});
    }

}

module.exports = SessionController;