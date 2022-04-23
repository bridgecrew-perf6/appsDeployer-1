import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
    },
    password: {
        type: String,
        required: 'Password is required',
        min: 6,
        max: 64
    },
    verified: {
        type: Boolean,
    },
    otp: {
        type: Number,
        length: 6
    }
},
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    let user = this;
    if(user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function (err, hash) {
            if(err) {
                console.log('BCRYPT HASH ERR ', err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (password, next) {
    try {
        bcrypt.compare(password, this.password, function (err, match) {
            if (err) {
                console.log('COMPARE PASSWORD ERR', err);
                return next(err, false);
            }
            // if no err, we get null
            console.log('MATCH PASSWORD', match);
            return next(null, match); //true
        });
    } catch (err) {
        console.log('ERROR: ', err);
        return next();
    }
};

export default mongoose.model('User', userSchema);