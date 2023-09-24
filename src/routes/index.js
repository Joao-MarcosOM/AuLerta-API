// A missão do index.js é de reunir todas as rotas da aplicação que estarão separadas por arquivos
const { Router } = require("express");

const usersRouter = require("./user.routes")

const productRoutes = require("./product.routes")

const tagsRoutes = require("./tags.routes")

const sessionRoutes = require("./session.routes")

const routes = Router();

routes.use("/users", usersRouter);
//Toda vez que alguém acessar a url /users, vai ser redirecionado para o usersRouter

routes.use('/session', sessionRoutes);

routes.use('/products', productRoutes);
//Toda vez que alguém acessar a url /notes, vai ser redirecionado para o notesRouter

routes.use('/tags', tagsRoutes);
//Toda vez que alguém acessar a url /tags, vai ser redirecionado para o tagsRoutes


module.exports = routes;