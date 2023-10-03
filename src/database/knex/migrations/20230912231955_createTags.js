//Up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("title").notNullable;
    table.integer("pet_id").references("id").inTable("pets").onDelete("CASCADE"); 
});

//Down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("tags");