const { Router } = require("express");

const PetsController = require("../controllers/PetsController");
//Aqui eu importo o controller

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

//Utilizaremos a biblioteca Multer para carregar essa imagem
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);
const PetsImageController = require("../controllers/PetsImageController");

const petsImageController = new PetsImageController();

const petRoutes = Router();


const petsController = new PetsController();

petRoutes.use(ensureAuthenticated);

petRoutes.get("/" , petsController.index);

petRoutes.post("/:id" , petsController.create);

petRoutes.put("/:id", petsController.update);

petRoutes.get("/:id" , petsController.show);

petRoutes.delete("/:id" , petsController.delete);

//Aqui eu estou utilizando o patch para subir a imagem do usuário
petRoutes.patch("/image/:pet_id", ensureAuthenticated, upload.single("image_url"), petsImageController.update)


module.exports = petRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar