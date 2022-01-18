const { User, Client_Details, Nutrient_Form } = require('../models/index');
const generator = require('generate-password');
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sendMail } = require('../utils/sendmail')

const clientRegister = async (req, res) => {
  const { username, whatsapp_number, family_size, payment_option, nickname, gender, age, weight, height, habits, current_health_complaints, current_medication, health_fear, family_history, allergies, preferred_drug_form, usual_health_spending, proposed_monthly_budget } = req.body;

  const email = req.body.email.toLowerCase();

  const referral_code = req.query.referral_code;

  try {
    //check if referrer exists
    if (referral_code) {
      const checkRef = await User.findOne({ where: { referral_code } })
      if (!checkRef || null) return res.status(400).json({ message: "invalid link/referral code" })
    }

    //check if email is unique
    const checkEmail = await User.findOne({ where: { email } })
    if (checkEmail) return res.status(400).json({ message: "Email Already Exists" });

    //check if username is unique
    const checkUsername = await User.findOne({ where: { username } })
    if (checkUsername) return res.status(400).json({ message: "Username Already Exists" });

    //create password
    let password = generator.generate({ length: 10 });
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    //send mail
    sendMail(email, username, password);

    //save to user table
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
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

    return res.status(201).json({
      message: 'A mail has been sent to your registered mail with your login details'
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const clientSignin = async (req, res) => {
  const { username, password } = req.body

  try {
    //check if username exists in database and role
    const user = await User.findOne({ where: { username, roleId: 1 } })
    if (!user) return res.status(400).send({ message: "user does not exist, please register" })

    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({ message: "Invalid password" })

    //assign jwt token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    //send token
    return res.status(200).json({ token })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}


const createAdmin = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    //check email
    const checkEmail = await User.findOne({
      where: { email }
    })
    if (checkEmail) return res.status(400).json({ message: "Email Already Exists" });

    //hash password
    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, roleId: 4 });
    return res.status(201).json({ message: 'admin created' })
  } catch (error) {
    return res.status(400).json(error.message)
  }
}


const adminSignin = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password

  try {
    //check if email exists in database and role
    const user = await User.findOne({ where: { email, roleId: 4 } })
    if (!user) return res.status(400).send({ message: "Invalid admin email" })

    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({ message: "Invalid password" });

    //assign jwt token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

    //send token
    return res.status(200).json({ token })

  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}


module.exports = { clientRegister, clientSignin, adminSignin, createAdmin }