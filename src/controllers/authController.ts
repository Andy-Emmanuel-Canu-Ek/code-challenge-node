import { Request, Response } from 'express'
import UserModel, { User }  from '../models/userModel'

class AuthController{

    public login  (req: Request, res: Response) {
        res.send('hello')
    }

    public async createUser(req: Request, res: Response) {
        try{
            const {name, email, password} = req.body
            const user: User = new UserModel({
                name,
                email, 
                password
            })
    
            await user.save()
            
            res.status(201).json({
                ok: true,
                msg: "Usuario registrado correctamente",
                user
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Ocurrio un error. Por favor contactese con el administrador"
            })
        }
       
    }

    public renewToken(req: Request, res: Response) {
        res.send('hello')
    }

    

}

export const authController = new AuthController();