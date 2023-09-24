const knex = require("../database/knex");

class ProductsController{
    async create(request, response){
        const {name , category, price,  description, tags} = request.body;

        const [product_id] = await knex("products").insert({
            name,
            category, 
            price,
            description
        });


        const tagsInsert = tags.map(title => {
            return {
                product_id,
                title
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json(product_id);
    }

    async show( request, response){
        const { id } = request.params;

        const product = await knex("products").where({id}).first();//Aqui ele vai trazer o primeiro registro de nota que ele encontrar
        const tags = await knex("tags").where({product_id: id}).orderBy("title"); //Aqui ele vai trazer todas as tags atreladas aquela nota ordenada por ordem alfabética


        return response.json({
            ...product, //Aqui eu to puxando todo o objeto atrelado na constante note
            tags,
        });
    }

    async update(request, response){
        const {name, category, price, description, tags} = request.body;
        const { id } = request.params;
        
        const product = await knex("products").where({ id: id }).first();

        if(!product){
            throw new AppError("Produto não encontrado")
        }

        product.name = name ?? product.name;
        product.category = category ?? product.category;
        product.price = price ?? product.price;
        product.description = description ?? product.description;

        await knex("products").update(product).where({ id: id});

        const existingTags = await knex("tags").where({product_id: id});

        existingTags.map( async (tag) => {
            await knex("tags").where({id: tag.id}).delete()
        })

        const tagsInsert = tags.map(title => {
            return {
                product_id: id,
                title
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.status(200).json();

    }

    async delete(request, response){
        const {id} = request.params;

        await knex("products").where({id}).delete(); //Aqui eu estou usando a própria função de delete na nota selecionada

        return response.json();

    }

    async index(request, response){
        const {name, tags} = request.query;

        let products;

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim()); //Aqui eu converto o meu texto de tags em um array
            products = await knex("tags").select([
                "products.id",
                "products.name",
                "products.price",
                "products.description",
                "products.image_url",
                "products.category"
            ]).whereLike("products.name", `%${name}%`).whereIn("title" , filterTags).innerJoin("products", "products.id","tags.product_id").groupBy("products.name").orderBy("products.name")//Aqui eu to realizando a pesquisa apenas de produtos que possuem a tag específica caso eu mande ela no query da requisição


        }else{
            products = await knex("products").whereLike("name", `%${name}%`).orderBy("name") //Aqui eu to puxando todas as notas criadas pelo usuário do id passado pela query da URL e organizando por ordem, alfabética
        }


        const getTags = await knex("tags");
        const productsWithTags = products.map(product => {
            const productTags = getTags.filter(tag => tag.product_id === product.id);

            return {
                ...product,
                tags: productTags
            }
        })
 

        return response.json(productsWithTags);
    }

}

module.exports = ProductsController;