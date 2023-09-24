//Up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("products", table => {
    table.increments("id");
    table.text("name");
    table.text("category");
    table.decimal("price", 10, 2); // Permitir valores float com até 10 dígitos no total e 2 dígitos após o ponto decimal
    table.text("description");
    table.text("image_url"); // Campo para armazenar a URL da imagem


    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

//Down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("notes");