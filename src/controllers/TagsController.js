const knex = require("../database/knex");

class TagsController{

    async index( request, response){
        const tags = await knex("tags").groupBy("title");//Aqui ele vai trazer todas as tags atreladas aquela usuário ordenada por ordem alfabética e não repetidos

        return response.json({
            tags
        });
    }

}

module.exports = TagsController;