import express from "express"
import * as authControllers from "../../controllers/auth/auth"
const router = express.Router()

router.post("/signup",authControllers.signUp)
router.post("/login",authControllers.login)
router.delete("/delete/:id",authControllers.usersDelete)


export default router