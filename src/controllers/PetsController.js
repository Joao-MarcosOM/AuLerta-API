const knex = require("../database/knex");

class PetsController{
    async create(request, response){
        const {name , age, weight, race, specie, sex, tags} = request.body;
        const { id } = request.params;

        const [pet_id] = await knex("pets").insert({
            name,
            age, 
            weight,
            race, 
            specie, 
            sex,
            user_id: id
        });


        const tagsInsert = tags.map(title => {
            return {
                pet_id,
                title
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json(pet_id);
    }

    async show( request, response){
        const { id } = request.params;

        const pet = await knex("pets").where({id}).first();
        const tags = await knex("tags").where({pet_id: id}).orderBy("title");


        return response.json({
            ...pet, //Aqui eu to puxando todo o objeto atrelado na constante note
            tags,
        });
    }

    async update(request, response){
        const {name , age, weight, race, specie, sex, tags} = request.body;
        const { id } = request.params;
        
        const pet = await knex("pets").where({ id: id }).first();

        if(!pet){
            throw new AppError("Pet não encontrado")
        }

        if(name){
            pet.name = name;
        }
        if(age){
            pet.age = age;
        }
        if(weight){
            pet.weight = weight;
        }
        if(race){
            pet.race = race;
        }
        if(specie){
            pet.specie = specie;
        }
        if(sex){
            pet.sex = sex;
        }

        await knex("pets").update(pet).where({ id: id});

        const existingTags = await knex("tags").where({pet_id: id});

        existingTags.map( async (tag) => {
            await knex("tags").where({id: tag.id}).delete()
        })

        const tagsInsert = tags.map(title => {
            return {
                pet_id: id,
                title
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.status(200).json();

    }

    async delete(request, response){
        const {id} = request.params;

        await knex("pets").where({id}).delete(); //Aqui eu estou usando a própria função de delete na nota selecionada

        return response.json();

    }

    async index(request, response){
        const {name, tags} = request.query;

        let pets;

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim()); //Aqui eu converto o meu texto de tags em um array
            pets = await knex("tags").select([
                "pets.id",
                "pets.name",
                "pets.age",
                "pets.weight",
                "pets.race",
                "pets.specie",
                "pets.image_url",
                "pets.sex"
            ]).whereLike("pets.name", `%${name}%`).whereIn("title" , filterTags).innerJoin("pets", "pets.id","tags.pet_id").groupBy("pets.name").orderBy("pets.name")//Aqui eu to realizando a pesquisa apenas de produtos que possuem a tag específica caso eu mande ela no query da requisição


        }else{
            pets = await knex("pets").whereLike("name", `%${name}%`).orderBy("name") //Aqui eu to puxando todas as notas criadas pelo usuário do id passado pela query da URL e organizando por ordem, alfabética
        }


        const getTags = await knex("tags");
        const petsWithTags = pets.map(pets => {
            const petsTags = getTags.filter(tag => tag.pet_id === pet.id);

            return {
                ...pets,
                tags: petsTags
            }
        })
 

        return response.json(petsWithTags);
    }

}

module.exports = PetsController;