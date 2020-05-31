const UsersModel = require('../users/users.model');
const { compareSync } = require('bcryptjs');

exports.authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UsersModel.findOne({ email }).lean().exec();

        if (!user) {
            throw { status: 404, message: "User is not exist!" };
        }

        if (!compareSync(password, user.password)) {
            throw { status: 403, message: "Password is not correct" };
        }

        req.session.user = user;
        req.session.save();
        
        res.json({ _id: user._id, role: user.role });
    } catch (e) {
        next(e);
    }    
};