import bcrypt from "bcrypt"

interface HashedPassword{
    password:string
}

interface ComparedPassword{
    userPassword:string
    password:string
}

export const hashPassword=async({password}:HashedPassword)=>{
    if(password ===undefined || password===null){
        throw new Error("le mot de passe obligatoire")
    }

    try {
        const hashedPassword=await bcrypt.hash(password,15)

        if(!hashedPassword){
            throw new Error('Erreur lors de la génération du mot de passe')
        }

        return hashedPassword
        
    } catch (error) {
        throw new Error("Echec du cryptage du mot de passe")
    }
}


export const comparePassword=async({userPassword,password}:ComparedPassword)=>{
    try {
        const isMatch=await bcrypt.compare(password,userPassword)

        return isMatch
    } catch (error) {
        console.log(error);
        
        throw new Error("Le mot de passe ne sont pas identique")
    }

}