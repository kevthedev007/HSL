const { User, Client_Details, Nutrient_Form, Nutrient_Result, Suggested_Nutrient, Recommended_Supplement } = require('../models/index');
const sequelize = require('sequelize');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');


const getForms = async (req, res) => {
  try {
    const forms = await Nutrient_Form.findAll({
      include: 'client',
    });

    const data = forms.map(form => {
      return {
        id: form.id,
        username: form.client.username,
        email: form.client.email,
        weight: form.weight,
        height: form.height,
        habits: form.habits,
        current_health_complaints: form.current_health_complaints,
        report: form.result,
        endorsed: form.endorsed
      }
    })
    return res.status(200).json({
      success: true,
      code: 200,
      message: "successful",
      data: {
        data
      }
    })

  } catch (error) {
    res.status(500).json(error.messsage)
  }
}


const getFormsByReport = async (req, res) => {
  try {
    //return forms that dont have reports
    const forms = await Nutrient_Form.findAll({
      where: { result: false },
      include: 'client',
    });

    const data = forms.map(form => {
      return {
        id: form.id,
        username: form.client.username,
        email: form.client.email,
        weight: form.weight,
        height: form.height,
        habits: form.habits,
        current_health_complaints: form.current_health_complaints,
        report: form.result,
        endorsed: form.endorsed
      }
    })
    return res.status(200).json({
      success: true,
      code: 200,
      message: "successful",
      data: {
        data
      }
    })
  } catch (error) {
    res.status(500).json(error.messsage)
  }
}


const getFormsByEndorsed = async (req, res) => {
  try {
    const forms = await Nutrient_Form.findAll({
      where: { endorsed: false },
      include: 'client',
    });

    const data = forms.map(form => {
      return {
        id: form.id,
        username: form.client.username,
        email: form.client.email,
        weight: form.weight,
        height: form.height,
        habits: form.habits,
        current_health_complaints: form.current_health_complaints,
        report: form.result,
        endorsed: form.endorsed
      }
    })
    return res.status(200).json({
      success: true,
      code: 200,
      message: "successful",
      data: {
        data
      }
    })

  } catch (error) {
    res.status(500).json(error.messsage)
  }
}


const getFormById = async (req, res) => {
  try {
    const id = req.params.id;

    const form = await Nutrient_Form.findOne({
      where: { id },
      include: 'client',
    })

    const details = await Client_Details.findOne({ where: { userId: form.userId } })

    const data = {
      id: form.id,
      username: form.client.username,
      email: form.client.email,
      age: details.age,
      gender: details.gender,
      whatsapp_number: details.whatsapp_number,
      weight: form.weight,
      height: form.height,
      habits: form.habits,
      current_health_complaints: form.current_health_complaints,
      current_medication: form.current_medication,
      health_fear: form.health_fear,
      family_history: form.family_history,
      allergies: form.allergies,
      desired_lifestyle: form.desired_lifestyle,
      preferred_drug_form: form.preferred_drug_form,
      usual_health_spending: form.usual_health_spending,
      proposed_monthly_budget: form.proposed_monthly_budget,
      report: form.result,
      endorsed: form.endorsed
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "successful",
      data: {
        data
      }
    })

  } catch (error) {
    res.status(500).json(error.messsage)
  }
}


const writeReport = async (req, res) => {
  const { beneficiary_overview, research_suggestion, vitamins, minerals, herbs, foods, fruits, gold_package, platinum_package, diamond_package } = req.body;

  try {
    const formId = req.params.formId;
    //check if form exists
    const form = await Nutrient_Form.findOne({
      where: { id: formId, result: false }
    })

    if (!form) return res.status(200).json({
      success: false,
      code: 400,
      message: "Nutrient Form doesnt exist",
    })

    const result = await Nutrient_Result.create({
      formId: req.params.formId,
      endorsed: true,
      beneficiary_overview, research_suggestion
    })

    const nutrients = await Suggested_Nutrient.create({
      formId: req.params.formId,
      resultId: result.id,
      vitamins, minerals, herbs, foods, fruits
    })

    const supplements = await Recommended_Supplement.create({
      formId: req.params.formId,
      resultId: result.id,
      gold_package, platinum_package, diamond_package
    })

    //update form result and endorse
    const updateForm = await Nutrient_Form.update({ result: true, endorsed: true }, { where: { id: formId } })

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Report has been generated and endorsed",
    })

  } catch (error) {
    res.status(500).json(error.message)
  }
}


const endorseReport = async (req, res) => {
  try {
    const formId = req.params.formId;

    //check if form exists
    const form = await Nutrient_Form.findOne({
      where: { id: formId, result: true, endorsed: false }
    })

    if (!form) return res.status(200).json({
      success: false,
      code: 400,
      message: "Nutrient Form doesnt exist",
    })
    //update form and endorse
    console.log('here')
    //find report
    const report = await Nutrient_Result.findOne({ where: { formId } })
    report.endorsed = true
    await report.save();

    const updateForm = await Nutrient_Form.update({ result: true, endorsed: true }, { where: { id: formId } })

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Report has been endorsed",
    })

  } catch (error) {
    res.status(500).send(error.message)
  }
}




module.exports = { getForms, getFormsByReport, getFormsByEndorsed, getFormById, writeReport, endorseReport }