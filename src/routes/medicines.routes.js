const { Router } = require("express");

const MedicinesController = require("../controllers/MedicinesController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const medicinesRoutes = Router();

const medicinesController = new MedicinesController();

medicinesRoutes.use(ensureAuthenticated);

medicinesRoutes.post("/:id" , medicinesController.create);

medicinesRoutes.put("/:id", medicinesController.update);

medicinesRoutes.get("/:id" , medicinesController.show);

medicinesRoutes.delete("/:id" , medicinesController.delete);

module.exports = medicinesRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar