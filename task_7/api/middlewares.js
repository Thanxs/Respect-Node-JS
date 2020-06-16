const { celebrate } = require('celebrate');

exports.validate = (schema) => {
    return (req, res, next) => {
        celebrate(schema, {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: {
                objects: true
            }
        })(req, res, next);
    }
}

exports.isAuthorized = (req, res, next) => {    
    if (req.isAuthenticated()) {
       return next();
    }
    next(JSON.stringify({ status: 401, message: 'Not authorized!' }));
}

exports.isAdmin = (req, res, next) => {    
    if (req.user.role === 'admin') {
        return next();
    }
    next(JSON.stringify({ status: 403, message: 'Sorry, but you dont have a permission!' }));
}