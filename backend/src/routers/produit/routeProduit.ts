import express from "express"
import * as produitControllers from "../../controllers/produit/produit"


const router=express.Router()

router.get("/",produitControllers.getAllproducts)
router.get("/shows/:id",produitControllers.getProductById)
router.post("/create",produitControllers.createProduct)
router.patch("/update/:id",produitControllers.updateProduct)


export default router