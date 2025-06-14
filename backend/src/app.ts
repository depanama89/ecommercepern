import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
// import { isHttpErrors } from "http-errors"
import authRouter from "./routers/auth/routeAuth"
import productRouter from "./routers/produit/routeProduit"
import commandeRouter from "./routers/commande/routeCommande"


const app = express();

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

// cette ligne permet à express de lire le donnes provenant du formulaire avec req.body

app.use(express.urlencoded({ extended: true }));
app.use("/api-v1/auth",authRouter)
app.use("/api-v1/products",productRouter)
app.use("/api-v1/commandes",commandeRouter)

// route de test
app.get('/',(req,res)=>{
    res.status(200).send("coucou là bas ")
})



app.use((req, res, next) => {
  next(createHttpError(404, "la route n'existe pas"));
});


app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({error:errorMessage})
});

export default app;
