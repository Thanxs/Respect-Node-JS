const UsersModel = require('./users.model');

exports.registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = new UsersModel({ email, password });
        await user.save();
        res.send({ message: "Create successfully", id: user._id});
    } catch (e) {
        next(e);
    }    
};