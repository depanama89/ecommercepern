import { RequestHandler } from "express";
import { LoginProps, signupProps } from "../../utils/allInterfaces";
import createHttpError from "http-errors";
import { pool } from "../../db/db";
import { comparePassword, createJwt, hashPassword } from "../../services/middlewares/passwordhash";

export const signUp: RequestHandler<
  unknown,
  unknown,
  signupProps,
  unknown
> = async (req, res, next) => {
  const { firstname, lastname, email, phone, password, country } = req.body;

  try {
    if (!(lastname|| firstname|| email  || phone || password || country)) {
      throw next(createHttpError(404, "Veuillez remplir tous les champs"));
    }

    const userExiste = await pool.query({
      text: "SELECT EXISTS (SELECT*FROM tblusers WHERE email=$1)",
      values: [email],
    });

    if (userExiste.rows[0].exists) {
      throw next(createHttpError(400, "C'est utilisateur existe déja"));
    }

    const hashedPassword = await hashPassword({ password });
    const newUser = await pool.query(
      `INSERT INTO tblusers(email,lastname,firstname,phone,password,country) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,email,lastname,firstname,phone,password,country`,
      [
        email,
        lastname,
        firstname,
        phone,
        hashedPassword,
        country,

      ]
    );

    res.status(201).json(newUser.rows[0])
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

export const login: RequestHandler<unknown,unknown,LoginProps,unknown> = async (req, res, next) => {
 
    const {email,password}=req.body
    try {
        if(!(email||password)){
            throw createHttpError(400,"Email and password sont obligatoire")
        }

        const result=await pool.query({
            text:`SELECT*FROM tblusers WHERE email=$1`,
            values:[email]
        })
        const user=result.rows[0]

        if(!user){
            throw createHttpError(404,"email et mot de passe sont incorrects")
        }

        const isMatch = await comparePassword({
            userPassword:user.password,
            password:password
        })
        
        if(!isMatch){
            throw createHttpError(401,"mot de passe ne correspond pas")
        }

        const token=createJwt({id:user.id})


        res.cookie('token',token,{
           httpOnly:true,
           secure:true,
           sameSite:'strict',
           maxAge:86400*1000
            
        })

        user.password=undefined
        res.status(200).json({
            message:"login successfully",
            user,token
        })
    } catch (error) {
      console.log(error);
        
    }
};

export const usersDelete: RequestHandler = async (req, res, next) => {
  res.status(200).send("users delete");
};
