const { Router } = require("express");

const ProductsController = require("../controllers/ProductsController");
//Aqui eu importo o controller

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

//Utilizaremos a biblioteca Multer para carregar essa imagem
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);
const ProductImageController = require("../controllers/ProductImageController");

const productImageController = new ProductImageController();

const productRoutes = Router();


const productsController = new ProductsController();

productRoutes.use(ensureAuthenticated);

productRoutes.get("/" , productsController.index);

productRoutes.post("/" , productsController.create);

productRoutes.put("/:id", productsController.update);

productRoutes.get("/:id" , productsController.show);

productRoutes.delete("/:id" , productsController.delete);

//Aqui eu estou utilizando o patch para subir a imagem do usuário
productRoutes.patch("/image/:product_id", ensureAuthenticated, upload.single("image_url"), productImageController.update)


module.exports = productRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar