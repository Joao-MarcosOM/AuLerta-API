//Up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("medicines", table => {
    table.increments("id");
    table.text("name").notNullable;
    table.text("dose");
    table.text("frequency");
    
    table.enum("type", ["vacina","remedio"], {useNative: true, enumName: "roles"}).notNullable().defaultTo("remedio");

    table.integer("pet_id").references("id").inTable("pets").onDelete("CASCADE"); 
});

//Down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("medicines");