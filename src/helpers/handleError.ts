import {Response} from 'express'

export const handleError = (error: Error, res: Response) => {
    console.log(error)
    return res.status(500).json({
        ok: false,
        error,
        msg: "Ocurrio un error. Por favor contactese con el adminsitrador"
    })
}