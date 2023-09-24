const knex = require("../database/knex");

const AppError = require("../utils/AppError");

const DiskStorage = require("../providers/DiskStorage");

class ProductImageController {
    async update(request , response){
        const { product_id } = request.params;

        const imageProductFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const product = await knex("products").where({ id: product_id }).first();

        if(!product){
            throw new AppError("Esse produto não existe.", 401);
        }

        //Aqui eu verifico se o usuário já tem uma foto, se sim, eu deleto a antiga
        if(product.image_url){
            await diskStorage.deleteFile(product.image_url);
        }

        const filename = await diskStorage.saveFile(imageProductFilename);
        product.image_url = filename;

        await knex("products").update(product).where({ id: product_id});

        return response.json(product);
    }
}

module.exports = ProductImageController;