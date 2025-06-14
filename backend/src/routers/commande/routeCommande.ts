import express from "express"
import * as commandeControllers from "../../controllers/commande/commande"
import { requiredSigning } from "../../services/middlewares/authMiddleware"

const router=express.Router()

router.get("/",commandeControllers.getAllCommande)
router.post("/create",commandeControllers.createCommande)
router.post("/checkout",requiredSigning,commandeControllers.checkCommande)
router.patch("/update",commandeControllers.updateCommande)


export default router