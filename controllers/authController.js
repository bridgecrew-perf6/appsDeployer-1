import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password } = req.body;
        // Validation
        if(!name) return res.status(400).send('Name is required.');
        if(!email) return res.status(400).send('Email is required.');
        if(!password || password.length < 6) return res.status(400).send('Password is required and should be minimum 6 characters long.');
        
        let userExist = await User.findOne({ email }).exec();
        if(userExist) return res.status(400).send('Email is already taken!');
        // Register
        const user = new User(req.body);
        user.verified = false;
        await user.save();
        // console.log('USER CREATED', user);
        return res.json({ ok: true });
    } catch (err) {
        console.log('CREATE USER FAILED',err);
        return res.status(400).send('Error. Try again!');
    }
};

export const login = async (req, res) => {
    //console.log(req.body);
    const { email, password } = req.body;
    try {
        // Check if user with that email exists
        let user = await User.findOne({ email: email}).exec();
        // console.log('USER EXISTS', user);
        if(!user) res.status(400).send('User with that email does not exist');
        // Compare password
        user.comparePassword(password, (err, match) => {
            if(!match || err) {
                console.log('COMPARE PASSWORD IN LOGIN ERR', err);
                return res.status(400).send('Wrong Password');
            }
            // GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT
             let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                 expiresIn: '7d'
             });
             res.json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    verified: user.verified,
             },
            });
        });
    } catch (err) {
        console.log('LOGIN ERROR', err);
        res.status(400).send('Sign in failed');
    }
}

export const update = async (req, res) => {
    // console.log('IN UPDATE ', req.body);
    try {
        const { name, email, password } = req.body;
        if(!name) return res.status(400).send('Name is required.');
        if(!email) return res.status(400).send('Email is required.');
        if(!password || password.length < 6) return res.status(400).send('Password is required and should be minimum 6 characters long.');

        let user = await User.findOne({ email: email}).exec();

        user.name = name;
        user.password = password;
        await user.save();
        return res.json({ ok: true });

    } catch (err) {
        console.log('UPDATE USER FAILED',err);
        return res.status(400).send('Error. Try again!');
    }
}

export const sendMail = async (req, res) => {
    try {
        const user = req.body;
        const { email } = user;
        const otp = Math.round(Math.random()*1000000+1);

        // let testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'hulda.fahey93@ethereal.email',
                pass: 'rcp49sgykvKjAJdajt'
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"AppsDeployer 👻" <admin@appsdeployer.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "OTP Verfication ", // Subject line
        text: `${otp} is your OTP for email verification.`, // plain text body
        // html: "<b></b>", // html body
        });

        // console.log("Message sent: %s", info.messageId);
        return res.json({ ok: true, otp });
    } catch (err) {
        console.log('SEND OTP FAILED',err);
        return res.status(400).send('Error. Try again!');
    }
}

export const verifyStatus = async (req, res) => {
    let user = req.body;
    const { email } = user;
    user = await User.findOne({ email: email}).exec();
    user.verified = true;
    await user.save();
}