const { Router } = require("express");

const usersRouter = require("./user.routes")

const petsRoutes = require("./pet.routes")

const tagsRoutes = require("./tags.routes")

const medicinesRoutes = require("./medicines.routes")

const sessionRoutes = require("./session.routes")

const routes = Router();

routes.use("/users", usersRouter);

routes.use('/session', sessionRoutes);

routes.use('/pets', petsRoutes);

routes.use('/medicines', medicinesRoutes);

routes.use('/tags', tagsRoutes);

module.exports = routes;