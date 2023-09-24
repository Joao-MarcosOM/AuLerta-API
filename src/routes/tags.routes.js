const { Router } = require("express");

const TagsController = require("../controllers/TagsController");
//Aqui eu importo o controller

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const tagsRoutes = Router();


const tagsController = new TagsController();

tagsRoutes.get("/" , ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar