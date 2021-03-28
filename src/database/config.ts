import mongoose from 'mongoose';

export default async () => {
    try{
        await mongoose.connect(process.env.DB_CNN || "", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('conectado a base de datos ')
    }
    catch(error){
        console.log(error)
        throw new Error('Error al inicializar db')
    }
}

