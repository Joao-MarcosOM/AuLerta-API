//Up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("title").notNullable;
    table.integer("product_id").references("id").inTable("products").onDelete("CASCADE"); //onDelete("CASCADE") significa que se eu deletar a nota em que essa tag está vinculada, automaticamente essa tag será deletada também
});

//Down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("tags");