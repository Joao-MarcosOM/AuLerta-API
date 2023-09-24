const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

//Ele recebe uma string que é o nome do grupo de testes - Nesse caso serão os testes de serviço de usuário
describe("UserCreateService", () => {
    let userRepositoryInMemory = null;
    let userCreateService = null;

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
    
        userCreateService = new UserCreateService(userRepositoryInMemory);
    })

    //Aqui dentro eu posso ter vários it
    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123"
        };
    
        const userCreated = await userCreateService.execute(user);
    
        //Aqui eu espero que o userCreated tenha uma propriedade chamada id
        expect(userCreated).toHaveProperty("id");
    
    });

    it("user not should be created with exists email", async() => {
        const user1 ={
            name: "User Test 1",
            email: "user@test.com",
            password: "123"
        };

        const user2 ={
            name: "User Test 2",
            email: "user@test.com",
            password: "456"
        }

        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
    });

})

