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
        const match = {};

        if (req.body.nickname) {
            match.nickname = req.body.nickname
        }

        if (req.body.whatsapp_number) {
            match.whatsapp_number = req.body.whatsapp_number
        }

        if (req.body.address) {
            match.address = req.body.address
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
            //check if email exists already
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
        const match = {};

        if (req.body.weight) {
            match.weight = req.body.weight
        }

        if (req.body.height) {
            match.height = req.body.height
        }

        if (req.body.habits) {
            match.habits = req.body.habits
        }

        if (req.body.current_health_complaints) {
            match.current_health_complaints = req.body.current_health_complaints
        }

        if (req.body.current_medication) {
            match.current_medication = req.body.current_medication
        }

        if (req.body.health_fear) {
            match.health_fear = req.body.health_fear
        }

        if (req.body.family_history) {
            match.family_history = req.body.family_history
        }

        if (req.body.desired_lifestyle) {
            match.desired_lifestyle = req.body.desired_lifestyle
        }

        if (req.body.preferred_drug_form) {
            match.preferred_drug_form = req.body.preferred_drug_form
        }

        if (req.body.usual_health_spending) {
            match.usual_health_spending = req.body.husual_health_spending
        }

        if (req.body.proposed_monthly_budget) {
            match.proposed_monthly_budget = req.body.proposed_monthly_budget
        }

        //check if nutrient-form already has a report(result)
        //if yes, create new form
        //if no, update current form

        const checkResult = await Nutrient_Form.findOne({ where: { id } })
        if (checkResult.result == false) {
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


