import { Request, Response } from 'express'
import UserModel, { User }  from '../models/userModel'
import bcrypt from 'bcryptjs'
import {generateJWT} from '../helpers/jwt'
class AuthController{

    public async login(req: Request, res: Response) {
        const { email, password } = req.body

        try{
            let user_exist: any = await UserModel.findOne({email})
            if (!user_exist){
                return res.status(400).json({
                    ok: false,
                    msg: "Usuario o contraseña invalida",
                })
            }

            const validPass = bcrypt.compareSync(password, user_exist.password)

            if(!validPass){
                return res.status(400).json({
                    ok: false,
                    msg: "Usuario o contraseña invalido"
                })
            }

            const token = await generateJWT(user_exist._id, user_exist.name);

            res.json({
                ok: true,
                user_id: user_exist._id,
                name: user_exist.name,
                token
            })

        }catch(error){
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Ocurrio un error. Por favor contactese con el administrador"
            })
        }

    }

    public async createUser(req: Request, res: Response) {
        const {name, email, password} = req.body
        console.log(req.body)
        try{
            let user_exist = await UserModel.findOne({email})
            if (user_exist){
                return res.status(400).json({
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
            
            const token = await generateJWT(user._id, user.name);
        
            //Generar JWT
            
            res.status(201).json({
                ok: true,
                msg: "Usuario registrado correctamente",
                user_id: user._id,
                name: user.name,
                token
            })

        }catch(error){
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Ocurrio un error. Por favor contactese con el administrador"
            })
        }
       
    }

    public async renewToken(req: Request, res: Response) {
        const {user_id, name} = req.body.user_token_obj;
        
        const token = await generateJWT(user_id, name);

        res.status(201).json({
            ok: true,
            msj: "Token actualizado",
            user_id, 
            name, 
            token
        })
    }

    

}

export const authController = new AuthController();