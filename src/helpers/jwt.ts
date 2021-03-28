import jwt from 'jsonwebtoken';

export const generateJWT = (user_id: String, name: String) => {
    return new Promise((resolve, reject)=>{
        const payload = { user_id, name };
        jwt.sign(payload, process.env.JWT_SECRET || 'seed', {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('Token no valido')
            }

            resolve(token)
        })
    })
}

