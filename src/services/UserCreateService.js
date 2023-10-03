const { hash } = require("bcryptjs");
// O hash é a função que vai gerar a criptografia
// O compare é utilizado para comparar dados criptografados

const AppError = require("../utils/AppError");

class UserCreateService{
    constructor(userRepository){
        this.userRepository = userRepository;
        //Isso significa que o this é o contexto global da classe e to pegando o parametro que eu recebo e deixando ele disponível na classe toda
    }

    async execute({name, email, password, ct_emergency}){
        const checkUserExists = await this.userRepository.findByEmail(email);
        
        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso.");
        }

        const hashedPassword = await hash(password, 8);
        //Primeiro passamos o que queremos criptografar e depois o grau de complexidade

        const userCreated = await this.userRepository.create({name,email, password: hashedPassword, ct_emergency})

        return userCreated;

    }
}

module.exports = UserCreateService;

