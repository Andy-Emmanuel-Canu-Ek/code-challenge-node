import { Request, Response } from "express";
import UserModel, { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import {handleError} from "../helpers/handleError";
import { generateJWT } from "../helpers/jwt";
class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      let user_exist: any = await UserModel.findOne({ email });
      if (!user_exist) {
        return res.status(400).json({
          ok: false,
          msg: "Usuario o contraseña invalida",
        });
      }

      const validPass = bcrypt.compareSync(password, user_exist.password);

      if (!validPass) {
        return res.status(400).json({
          ok: false,
          msg: "Usuario o contraseña invalido",
        });
      }

      const token = await generateJWT(user_exist._id, user_exist.name);

      res.json({
        ok: true,
        user_id: user_exist._id,
        name: user_exist.name,
        token,
      });
    } catch (error) {
      handleError(error, res);
    }
  }

  public async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
      let user_exist = await UserModel.findOne({ email });
      if (user_exist) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese correo",
        });
      }

      const user: User = new UserModel({
        name,
        email,
        password,
      });

      //Encriptar Pass
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();
      const token = await generateJWT(user._id, user.name);

      //Generar JWT

      res.status(201).json({
        ok: true,
        msg: "Usuario registrado correctamente",
        user_id: user._id,
        name: user.name,
        token,
      });
    } catch (error) {
      handleError(error, res);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.body;
    try {
      let user_exist: any = await UserModel.find({_id: id});
      console.log("user_exist", user_exist)
      if (user_exist.length > 0) {
        console.log("object", user_exist[0])
        await user_exist[0].remove();

        res.json({
          ok: true,
          msg: "Usuario eliminado correctamente",
        });

      } else {
        return res.status(400).json({
          ok: false,
          msg: "El usuario que intenta eliminar no existe",
        });
      }
    } catch (error) {
      handleError(error, res);
    }
  }

  public async renewToken(req: Request, res: Response) {
    const { user_id, name } = req.body.user_token_obj;

    const token = await generateJWT(user_id, name);

    res.status(201).json({
      ok: true,
      msj: "Token actualizado",
      user_id,
      name,
      token,
    });
  }
}

export const authController = new AuthController();
