import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';

export const validateJWT = (req: Request, res: Response, next: any) => {
    //x-token
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        })
    }

    try{
        const payload: any = jwt.verify(
            token,
            process.env.JWT_SECRET || 'seed'
        )

        req.body.user_token_obj = payload;
        
        next();

    }catch(error){
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg: 'Token no válido'
        })
    }
    
}

