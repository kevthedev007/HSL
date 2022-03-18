const { User, Client_Details, Nutrient_Form } = require('../models/index');
const generator = require('generate-password');
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sendMail } = require('../utils/sendmail')
const createError = require('http-errors');
const sequelize = require("sequelize");

const clientRegister = async (req, res, next) => {
  const { username, whatsapp_number, family_size, payment_option, nickname, gender, age, weight, height, habits, current_health_complaints, current_medication, health_fear, family_history, allergies, preferred_drug_form, usual_health_spending, proposed_monthly_budget } = req.body;

  const email = req.body.email.toLowerCase();

  const referral_code = req.query.referral_code;

  try {
    //check if referrer exists
    if (referral_code) {
      const checkRef = await User.findOne({ where: { referral_code } })
      if (!checkRef || null) throw createError.BadRequest("Invalid link/referral code")
    }

    //check if email is unique
    const checkEmail = await User.findOne({ where: { email } })
    if (checkEmail) throw createError.Conflict("Email Already Exists")

    //check if username is unique
    const checkUsername = await User.findOne({ where: { username } })
    if (checkUsername) throw createError.Conflict("Username Already Exists")

    //create password
    let password = generator.generate({ length: 10 });
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    //send mail
    sendMail(email, username, password);

    const transaction = await sequelize.transaction();
    //save to user table
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roleId: 1,
      referral_code: nanoid(),
      referrer: referral_code
    }, { transaction });

    //save details to client_details table
    const details = await Client_Details.create({
      userId: user.id,
      nickname,
      gender,
      age,
      whatsapp_number,
      family_size,
      payment_option
    }, { transaction })

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
    }, { transaction })

    await transaction.commit();
    return res.status(201).json({
      message: 'A mail has been sent to your registered mail with your login details'
    })
  } catch (error) {
    await transaction.rollback();
    next(error)
  }
}

const clientSignin = async (req, res, next) => {
  const { username, password } = req.body

  try {
    //check if username exists in database and role
    const user = await User.findOne({ where: { username, roleId: 1 } })
    if (!user) throw createError.NotFound("user does not exist, please register")

    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw createError.Unauthorized("Invalid password")

    //assign jwt token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    //send token
    return res.status(200).json({ token })
  } catch (error) {
    next(error)
  }
}


const createAdmin = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    //check email
    const checkEmail = await User.findOne({
      where: { email }
    })
    if (checkEmail) throw createError.Conflict("Email Already Exists")

    //hash password
    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, roleId: 4 });
    return res.status(201).json({ message: 'admin created' })
  } catch (error) {
    next(error)
  }
}


const adminSignin = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password

  try {
    //check if email exists in database and role
    const user = await User.findOne({ where: { email, roleId: 4 } })
    if (!user) throw createError.NotFound("Invalid admin email")

    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw createError.Unauthorized("Invalid password")

    //assign jwt token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

    //send token
    return res.status(200).json({ token })

  } catch (error) {
    next(error)
  }
}


module.exports = { clientRegister, clientSignin, adminSignin, createAdmin }