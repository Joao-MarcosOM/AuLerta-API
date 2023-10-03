const knex = require("../database/knex");

const AppError = require("../utils/AppError");

const DiskStorage = require("../providers/DiskStorage");

class PetsImageController {
    async update(request , response){
        const { pet_id } = request.params;

        const imageProductFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const pet = await knex("pets").where({ id: pet_id }).first();

        if(!pet){
            throw new AppError("Esse pet não existe.", 401);
        }

        //Aqui eu verifico se o usuário já tem uma foto, se sim, eu deleto a antiga
        if(pet.image_url){
            await diskStorage.deleteFile(pet.image_url);
        }

        const filename = await diskStorage.saveFile(imageProductFilename);
        pet.image_url = filename;

        await knex("pets").update(pet).where({ id: pet_id});

        return response.json(pet);
    }
}

module.exports = PetsImageController;