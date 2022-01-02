const { User, Client_Details, Nutrient_Form } = require('../models/index');
const sequelize = require('sequelize');


const getForms = async (req, res) => {
    try {
        const forms = await Nutrient_Form.findAll({
            include: 'client',
        });

        const data = forms.map(form => {
            return {
                username: form.client.username,
                email: form.client.email,
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
                proposed_monthly_budget: form.proposed_monthly_budget
            }
        })
        return res.status(200).json(data)

    } catch (error) {
        res.status(400).json(error.messsage)
    }
}



module.exports = { getForms }