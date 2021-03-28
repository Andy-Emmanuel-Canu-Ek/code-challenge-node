import { Router, Request, Response } from "express";
import { authController } from "../controllers/authController";
import { check } from "express-validator";
import { validationFields } from '../middlewares/fieldValidators'
import { validateJWT } from '../middlewares/validateJWT'

const router: Router = Router();

router.get("/", validateJWT, authController.renewToken);

router.post(
  "/",
  [
    check("email", "Email invalido").isEmail(),
    check(
      "password",
      "La contraseña debe tener un mínimo de 6 caracteres"
    ).isLength({ min: 6 }),
    validationFields
  ],
  authController.login
);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Email invalido").isEmail(),
    check(
      "password",
      "La contraseña debe tener un mínimo de 6 caracteres"
    ).isLength({ min: 6 }),
    validationFields
  ],
  authController.createUser
);

export default router;
