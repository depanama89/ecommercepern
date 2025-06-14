import { RequestHandler } from "express";
import JWT from "jsonwebtoken";
import env from "../../utils/validateEnv";
import createHttpError from "http-errors";
import { pool } from "../../db/db";

// Extension du type Request d'Express
// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         userId: string;
//       };
//     }
//   }
// }
export const requiredSigning: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!(authHeader || authHeader?.startsWith("Bearer"))) {
      res.status(401).send({
        status: "auht_failed",
        message: "Authentication failed",
      });

      return;
    }

    const token = authHeader.split(" ")[1];

    const userToken = JWT.verify(token, env.JWT_SECRET) as { userId: string };

    if (!userToken.userId) {
      throw next(createHttpError(400, "token malformé"));
    }

    req.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    res.status(401).json({
      status: "auth_failed",
      message: "Tu n'es pas autorisé à accéder à cette resource",
    });
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!;
    const userCheck = await pool.query({
      text: `SELECT *FROM tblusers,tblroles,tbluser_roles WHERE tblusers.id=tbluser_roles.user_id and tblroles.id=tbluser_roles.role_id and tblusers.id=$1 `,
      values: [userId],
    });

    const user = await userCheck.rows[0];

    if (user.name !== "admin") {
      res.status(401).json({
        success: false,
        message: "tu n'es pas autaurisé d'access à ces resources",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};
