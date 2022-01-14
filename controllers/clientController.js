const { User, Client_Details, Nutrient_Form } = require('../models/index');
const sequelize = require('sequelize');

const dashboard = async (req, res) => {
  try {
    const detail = await Client_Details.findOne({
      where: { userId: req.user.id },
      attributes: ['nickname']
    })
    return res.status(200).json({
      success: true,
      code: 200,
      message: "successful",
      data: {
        detail
      }
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getProfile = async (req, res) => {
  try {
    const profile = await Client_Details.findOne({
      where: {
        userId: req.user.id
      },
      attributes: ['nickname', 'whatsapp_number', 'address'],
      include: {
        model: User, as: 'client',
        attributes: ['email']
      }
    })

    //get latest record of nutrient_form
    const nutrient = await Nutrient_Form.findOne({
      limit: 1,
      where: {
        userId: req.user.id
      },
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json({
      success: true,
      code: 200,
      message: "successful",
      data: {
        profile,
        nutrient
      }
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const editProfile = async (req, res) => {
  try {
    const client = await Client_Details.findOne({ where: { userId: req.user.id } });

    const match = {
      nickname: req.body.nickname || client.nickname,
      whatsapp_number: req.body.whatsapp_number || client.whatsapp_number,
      address: req.body.address || client.address
    }

    //check user's email to see if it wasn't changed
    const userEmail = await User.findOne({ where: { id: req.user.id } })
    if (userEmail.email == req.body.email) {
      const edit = await Client_Details.update(match, { where: { userId: req.user.id } })
      return res.status(200).json({
        success: true,
        code: 200,
        message: "Profile Updated Successfully"
      })
    } else {
      //if email was changed
      //check if the new email exists already on the database
      const checkEmail = await User.findOne({ where: { email: req.body.email } });

      if (checkEmail) {
        return res.status(200).json({
          success: true,
          code: 200,
          message: "Email already exists"
        })

      } else {
        const edit = await Client_Details.update(match, { where: { userId: req.user.id } })
        const user = await User.update({ email: req.body.email }, { where: { id: req.user.id } })
        return res.status(200).json({
          success: true,
          code: 200,
          message: "Profile Updated Successfully"
        })
      }
    }

  } catch (error) {
    res.status(400).json(error.message)
  }
}

const updateNutrient = async (req, res) => {
  const id = req.query.id

  try {
    const nutrient = await Nutrient_Form.findOne({
      where: { id },
      order: [['createdAt', 'DESC']]
    })

    const match = {
      weight: req.body.weight || nutrient.weight || null,
      height: req.body.height || nutrient.height || null,
      habits: req.body.habits || nutrient.habits || null,
      current_health_complaints: req.body.current_health_complaints || nutrient.current_health_complaints || null,
      current_medication: req.body.current_medication || nutrient.current_medication || null,
      health_fear: req.body.health_fear || nutrient.health_fear || null,
      family_history: req.body.family_history || nutrient.family_history || null,
      desired_lifestyle: req.body.desired_lifestyle || nutrient.desired_lifestyle || null,
      preferred_drug_form: req.body.preferred_drug_form || nutrient.preferred_drug_form || null,
      usual_health_spending: req.body.usual_health_spending || nutrient.usual_health_spending || null,
      proposed_monthly_budget: req.body.proposed_monthly_budget || nutrient.proposed_monthly_budget || null
    }

    //check if nutrient-form already has a report(result)
    //if yes, create new form
    //if no, update current form

    if (nutrient.endorsed == false) {
      //update nutrient_form
      const update = await Nutrient_Form.update(match, { where: { id } })
      res.status(200).json({
        success: true,
        code: 200,
        message: "Nutrient Form updated successfully"
      })
    } else {
      //create a new nutrient form
      match.userId = req.user.id
      const nutrient = await Nutrient_Form.create(match)
      res.status(200).json({
        success: true,
        code: 200,
        message: "Nutrient Form created successfully"
      })
    }

  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = { dashboard, getProfile, editProfile, updateNutrient }


