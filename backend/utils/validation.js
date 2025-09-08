import Joi from "joi";

const validationSignup=(req,res,next)=>{
    const Schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(35).required(),
        confirm_password:Joi.string().valid(Joi.ref("password")).required(),
    });
    const {error}=Schema.validate(req.body);

     if (error) {
    return res.status(404).json({
      message: "Bad request!",
      error: error.details.map((err) => err.message),
    });
  }
    next();
}

const validationLogin=(req,res,next)=>{
    const Schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(35).required(),
    });
    const {error}=Schema.validate(req.body);

     if (error) {
    return res.status(404).json({
      message: "Bad request!",
      error: error.details.map((err) => err.message),
    });
  }
    next();
}


const validationEventcreate=(req,res,next)=>{
    const Schema=Joi.object({
        title:Joi.string().min(4).max(65).required(),
        dateTime: Joi.date().required(), 
        location:Joi.string().min(3).max(55).required(),
        description:Joi.string().min(8).max(315).required()
    });
    const {error}=Schema.validate(req.body);

     if (error) {
    return res.status(404).json({
      message: "Bad request!",
      error: error.details.map((err) => err.message),
    });
  }
    next();
}

export {validationSignup, validationLogin, validationEventcreate};