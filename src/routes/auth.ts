import { Router } from "express";
import { authController } from "../controllers/authController";
import { check } from "express-validator";
import { validationFields } from '../middlewares/fieldValidators'
import { validateJWT } from '../middlewares/validateJWT'

const router: Router = Router();

router.delete("/:id", validateJWT, authController.deleteUser);

router.get("/", validateJWT, authController.renewToken);

router.get("/user_list", validateJWT, authController.getUsers);

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
