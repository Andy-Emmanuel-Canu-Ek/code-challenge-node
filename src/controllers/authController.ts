import { Request, Response } from 'express'
import UserModel, { User }  from '../models/userModel'
import bcrypt from 'bcryptjs'

class AuthController{

    public login  (req: Request, res: Response) {
        res.send('hello')
    }

    public async createUser(req: Request, res: Response) {
        const {name, email, password} = req.body
        console.log(req.body)
        try{
            let user_exist = await UserModel.findOne({email})
            if (user_exist){
                res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese correo",
                })
            }

            const user: User = new UserModel({
                name,
                email, 
                password
            })

            //Encriptar Pass
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);
    
            await user.save()
            
            res.status(201).json({
                ok: true,
                msg: "Usuario registrado correctamente",
                user_id: user._id,
                user_name: user.name
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