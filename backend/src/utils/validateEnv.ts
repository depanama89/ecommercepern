import { cleanEnv } from "envalid";
import {port , str} from "envalid/dist/validators"


export default cleanEnv(process.env,{
    POSTGRES_URL:str(),
    PORT:port(),
    JWT_SECRET:str(),
    
})