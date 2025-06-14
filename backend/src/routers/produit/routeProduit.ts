import express from "express"
import * as produitControllers from "../../controllers/produit/produit"
import { isAdmin, requiredSigning } from "../../services/middlewares/authMiddleware"


const router=express.Router()

router.get("/",produitControllers.getAllproducts)
router.get("/shows/:id",produitControllers.getProductById)
router.post("/create",requiredSigning,isAdmin,produitControllers.createProduct)
router.patch("/update/:id",produitControllers.updateProduct)


export default router