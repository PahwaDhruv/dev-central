import { object, number } from 'yup';

export const validate = (schema, handler) =>{
    return async (req, res) => {
        if(['POST'].includes(req.method)){
            try{
                const newSchema = req.method === 'POST' ? schema : schema.concat(object({id: number().required().positive()}))
                req.body = await newSchema.validate(req.body, {abortEarly: false})
            } catch(err) {
                return res.status(400).json({errors: err.errors})
            }
        }
        await handler(req, res);
    }
}