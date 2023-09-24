// O verify é uma função que está disponível dentro do jsonwebtoken
const { verify } = require("jsonwebtoken");

const AppError = require("../utils/AppError");

const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT Token não informado", 401);
    }

    const [ , token] = authHeader.split(" ");

    try{
        //Aqui eu verifico se o token é um jwt válido
        const { sub : user_id } = verify(token, authConfig.jwt.secret);
        request.user = {
            id: Number(user_id)
        }

        return next();

    }catch{
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;