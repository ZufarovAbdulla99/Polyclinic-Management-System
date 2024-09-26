const ValidationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        // console.log(error, value)
        if(error){
            return res.status(400).send({
                name: "Validation error",
                message: error.message
            })
        }
        
        req.body = value

        next();
    }
}

module.exports = ValidationMiddleware