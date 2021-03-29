import { Router } from "express";
import { validateDate } from "../helpers/validateDate";
import { validateJWT } from "../middlewares/validateJWT";
import { eventController } from "../controllers/eventController";
import { validationFields } from "../middlewares/fieldValidators";
import { check } from "express-validator";
const router: Router = Router();
router.use(validateJWT);

router.get("/", eventController.getEvents);
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start_date", "La fecha de inicio es invalida").custom(validateDate),
    check("end_date", "La fecha de fin es invalida").custom(validateDate),
    validationFields,
  ],
  eventController.saveEvent
);

router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
