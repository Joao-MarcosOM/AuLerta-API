//Up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("pets", table => {
    table.increments("id");
    table.text("name");
    table.integer("age");
    table.integer("weight");
    table.text("race");
    table.text("specie");
    table.text("image_url"); // Campo para armazenar a URL da imagem

    table.enum("sex", ["male","female"], {useNative: true, enumName: "roles"}).notNullable().defaultTo("male");

    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE"); //

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

//Down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("pets");