import { RequestHandler } from "express";
import { signupProps } from "../../utils/allInterfaces";
import createHttpError from "http-errors";
import { pool } from "../../db/db";
import { hashPassword } from "../../services/middlewares/passwordhash";

export const signUp: RequestHandler<
  unknown,
  unknown,
  signupProps,
  unknown
> = async (req, res, next) => {
  const { nom, prenom, email, adresse, phone, password, country } = req.body;

  try {
    if (!(nom || prenom || email || adresse || phone || password || country)) {
      throw next(createHttpError(404, "Veuillez remplir tous les champs"));
    }

    const userExiste = await pool.query({
      text: "SELECT EXISTS (SELECT*FROM tblusers WHERE email=$1)",
      values: [email],
    });

    if (userExiste.rows[0].exists) {
      throw next(createHttpError(400,"C'est utilisateur existe déja"));
    }

    const hashedPassword=await hashPassword({password})
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  res.status(200).send("methode effectuer");
};

export const usersDelete: RequestHandler = async (req, res, next) => {
  res.status(200).send("users delete");
};
