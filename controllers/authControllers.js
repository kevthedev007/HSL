const { User, Client_Details, Nutrient_Form } = require('../models/index');
const generator = require('generate-password');
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../utils/sendmail')

const clientRegister = async (req, res) => {
    const { username, whatsapp_number, email, family_size, payment_option } = req.body;
    const { nickname, gender, age, weight, height, habits, current_health_complaints, current_medication, health_fear, family_history, allergies, preferred_drug_form, usual_health_spending, proposed_monthly_budget } = req.body;

    const referral_code = req.query.referral_code;



    try {
        //check if referrer exists
        const checkRef = await User.findOne({ where: { referral_code } })
        if (!checkRef || null) return res.status(400).json({
            success: "false",
            code: 400,
            message: "invalid link/referral code"
        })

        //check if email is unique
        const checkEmail = await User.findOne({ where: { email } })
        if (checkEmail) return res.status(400).json({
            success: "false",
            code: 400,
            message: "Email Already Exists"
        });

        //check if username is unique
        const checkUsername = await User.findOne({ where: { username } })
        if (checkUsername) return res.status(400).json({
            success: "false",
            code: 400,
            message: "Username Already Exists"
        });

        //create password
        var password = generator.generate({ length: 10 });
        console.log(password);

        //send mail
        sendMail(email, username, password);

        //save to user table
        const user = await User.create({
            username,
            email,
            password,
            roleId: 1,
            referral_code: nanoid(),
            referrer: referral_code
        })

        //save details to client_details table
        const details = await Client_Details.create({
            userId: user.id,
            nickname,
            gender,
            age,
            whatsapp_number,
            family_size,
            payment_option
        })

        //save NTR to Nutrient_Form Table
        const NTR = await Nutrient_Form.create({
            userId: user.id,
            weight,
            height,
            habits,
            current_health_complaints,
            current_medication,
            health_fear,
            family_history,
            allergies,
            preferred_drug_form,
            usual_health_spending,
            proposed_monthly_budget
        })

        return res.status(200).json({
            success: true,
            cod3: 200,
            message: 'A mail has been sent to your registered mail with your login details'
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const clientSignin = async (req, res) => {
    const { username, password } = req.body

    try {
        //check if username exists in database and role
        const user = await User.findOne({ where: { username, roleId: 1 } })
        if (!user) return res.status(200).send({
            success: false,
            code: 400,
            message: "user does not exist, please register"
        })

        //compare password
        if (user.password !== password) return res.status(200).send({
            success: false,
            code: 400,
            message: "Invalid password"
        });

        //assign jwt token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

        //send token
        res.status(200).json({
            success: true,
            code: 200,
            message: "successful",
            data: {
                token
            }
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const adminSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        //check if email exists in database and role
        const user = await User.findOne({ where: { email, roleId: 4 } })
        if (!user) return res.status(200).send({
            success: false,
            code: 400,
            message: "Invalid admin email"
        })

        //compare password
        if (user.password !== password) return res.status(200).send({
            success: false,
            code: 400,
            message: "Invalid password"
        });

        //assign jwt token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

        //send token
        res.status(200).json({
            success: true,
            code: 200,
            message: "successful",
            data: {
                token
            }
        })

    } catch (error) {
        res.status(400).json(error.message)
    }
}

const createAdmin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password, roleId: 4 });
        res.status(200).send('admin created')
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = { clientRegister, clientSignin, adminSignin, createAdmin }