const { Schema, model } = require('mongoose');
const { hashSync } = require('bcryptjs');

const userSchema = new Schema({
    email: {
        type: String, required: true, trim: true, lowercase: true, index: true, unique: true
    },
    password: {
        type: String, required: true, trim: true, 
    },

    role: { type: String, default: 'user', enum: ['user', 'admin']}
}, {
    collection: 'users',
    timestamps: true
});

userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = hashSync(this.password, 8);
    }
    next();
});

module.exports = model('UsersModel', userSchema);