const UsersModel = require('./users.model');
const bc = require('bcryptjs');

exports.registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let errors = [];
        if (!email || !password) {
            errors.push({ msg: "Please fill in all fields" });
        }

        if (password.length < 6) {
            errors.push({ msg: "Password should be at least 6 characters" });
        }

        if (errors.length > 0) {
            res.render("register", {
                errors,
                email,
                password
            })
        } else {
            UsersModel.findOne({email}).then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already exists' });
                    res.render('register', {
                        errors,
                        email,
                        password
                    });
                } else {
                    const new_user = new UsersModel({
                        email,
                        password
                    });
                    new_user.save().then(user => {
                        req.flash('success_msg', 'You are now registered and can log in!');
                        res.redirect('/users/login');
                    }).catch(err => {
                        console.log(err);                        
                    });
                }
            })
        }
    } catch (e) {
        next(e);
    }    
};