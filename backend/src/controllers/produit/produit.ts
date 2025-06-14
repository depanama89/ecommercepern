import { RequestHandler } from "express";
import { productProps } from "../../utils/allInterfaces";
import createHttpError from "http-errors";
import { pool } from "../../db/db";

export const getAllproducts: RequestHandler = async (req, res, next) => {
  res.status(200).json("getAllproduct");
};
export const getProductById: RequestHandler = async (req, res, next) => {
  res.status(200).json("getAllproductbyiid");
};

export const createProduct: RequestHandler<
  unknown,
  unknown,
  productProps,
  unknown
> = async (req, res, next) => {
  const { label, description, pu, qte } = req.body;

  try {
    if (!(label || pu || qte)) {
      throw next(
        createHttpError(400, "veuillez remplir tous les champs vides")
      );
    }

    const productExist = await pool.query({
      text: "SELECT EXISTS (SELECT*FROM tblproduits WHERE label=$1) ",
      values: [label],
    });

    if (productExist.rows[0].exists) {
      throw next(createHttpError(400, "c'est produit existe déjà"));
    }

    const newProduct = await pool.query(
      `INSERT INTO tblproduits (label,description,pu,qte) VALUES($1,$2,$3,$4) RETURNING label,description,pu,qte`,
      [label, description, pu, qte]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
interface idProps {
  id: string;
}
export const updateProduct: RequestHandler<
  idProps,
  unknown,
  productProps,
  unknown
> = async (req, res, next) => {
try {
      const { id } = req.params;
  const { label, description, pu, qte } = req.body;

  const newLabel = label;
  const newDescription = description;
  const newPu = pu;
  const newQte = qte;

  const result = await pool.query({
    text: `UPDATE  tblproduits SET label=$1,description=$2,pu=$3,qte=$4 ,updatedat=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *`,
    values: [newLabel, newDescription, newPu, newQte, id],
  });

  const produits=result.rows[0]
  res.status(201).json({
    message:"mise à jour effectuer avec success",
    data:produits
  })
    
} catch (error) {
    console.log(error);
    next(error)
    
}
};
export const deleteProduct: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {};
