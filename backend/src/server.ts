import dotenv from "dotenv";
import app from "./app";
import env from "./utils/validateEnv";
import { pool } from "./db/db";
dotenv.config();

pool
  .connect()
  .then(() => console.log("Connecté à PostgresSql avec succès"))
  .catch((err) => console.log("Erreur de connexion à PostgresSql", err));
const Port = env.PORT;
app.listen(Port, () => {
  console.log("the server is running to port :", Port);
});
