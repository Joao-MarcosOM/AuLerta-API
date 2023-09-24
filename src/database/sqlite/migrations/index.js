const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationRun(){
    const schemas = [
       createUsers
    ].join("");
    //Aqui o que eu faço é pegar todas as migrations e usando o join para juntar todas elas

    sqliteConnection()
    .then( db => db.exec(schemas))
    .catch(error => console.log(error));

}

module.exports = migrationRun;