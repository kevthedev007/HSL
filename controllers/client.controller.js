const { User, Client_Details, Nutrient_Form, Product } = require('../models/index');
const sequelize = require('sequelize');
const createError = require('http-errors');

const dashboard = async (req, res, next) => {
  try {
    const detail = await Client_Details.findOne({
      where: { userId: req.user.id },
      attributes: ['nickname']
    })
    return res.status(200).json({ detail })
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req, res, next) => {
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
      profile,
      nutrient
    })
  } catch (error) {
    next(error)
  }
}

const editProfile = async (req, res, next) => {
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
      return res.status(200).json({ message: "Profile Updated Successfully" })
    } else {
      //if email was changed
      //check if the new email exists already on the database
      const checkEmail = await User.findOne({ where: { email: req.body.email } });

      if (checkEmail) {
        throw createError.Conflict("Email already exists")

      } else {
        const edit = await Client_Details.update(match, { where: { userId: req.user.id } })
        const user = await User.update({ email: req.body.email }, { where: { id: req.user.id } })
        return res.status(200).json({ message: "Profile Updated Successfully" })
      }
    }

  } catch (error) {
    next(error)
  }
}

const updateNutrient = async (req, res, next) => {
  const id = req.params.id

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
      allergies: req.body.allergies || nutrient.allergies || null,
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
      return res.status(201).json({ message: "Nutrient Form updated successfully" })
    } else {
      //create a new nutrient form
      match.userId = req.user.id
      const nutrient = await Nutrient_Form.create(match)
      return res.status(201).json({ message: "Nutrient Form created successfully" })
    }

  } catch (error) {
    next(error)
  }
}

const getReport = async (req, res, next) => {
  try {
    const nutrient = await Nutrient_Form.findOne({
      where: { userId: req.user.id },
      include: ['nutrient_result', 'suggested_nutrient', 'recommended_supplement', 'supplement_discount'],
      order: [['createdAt', 'DESC']]
    })

    if (nutrient.endorsed == false) return res.status(200).json({ message: 'form is not ready' })

    //get products
    const products = await Product.findAll();

    const goldPackage = products.filter(x => nutrient.recommended_supplement.gold_package.includes(x.id))
    const platinumPackage = products.filter(x => nutrient.recommended_supplement.platinum_package.includes(x.id))
    const diamondPackage = products.filter(x => nutrient.recommended_supplement.diamond_package.includes(x.id))

    return res.status(200).json({
      Beneficiary_Overview: nutrient.nutrient_result.beneficiary_overview,
      Research_Suggestion: nutrient.nutrient_result.research_suggestion,
      Suggested_Nutrients: nutrient.suggested_nutrient,
      Recommended_Supplement: {
        Gold_Package: goldPackage,
        Platinum_Package: platinumPackage,
        Diamond_Package: diamondPackage
      },
      Supplement_Discounts: nutrient.supplement_discount,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { dashboard, getProfile, editProfile, updateNutrient, getReport }


