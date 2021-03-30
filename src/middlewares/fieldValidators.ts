import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validationFields = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}
