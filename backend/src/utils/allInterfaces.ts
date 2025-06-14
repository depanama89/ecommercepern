export interface signupProps{
    id:number,
    firstname:string;
    lastname:string;
    email:string;
    phone:string;
    password:string;
    country:string
}

export interface LoginProps{
    email:string,
    password:string
}

export interface productProps{
    id:number
    label:string
    description:string
    pu:string
    qte:number
}