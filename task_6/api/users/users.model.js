const { Schema, model } = require('mongoose');
const { hashSync } = require('bcryptjs'); 

const userSchema = new Schema({
    email: { type: String, required: true, lowercase: true, trim: true, index: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, {
    collection: 'users',
});

userSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        this.password = hashSync(this.password, 8);
    }
    this.updatedAt = new Date();
    next();
});

module.exports = model('UsersModel', userSchema);