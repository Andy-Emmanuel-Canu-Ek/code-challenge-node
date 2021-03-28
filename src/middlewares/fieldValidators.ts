import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validationFields = (req: Request, res: Response, next: any) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        res.status(400).json({
            ok: false,
            erros: erros.mapped()
        })
    }
    next();
}
