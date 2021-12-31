const { User, Client_Details, Nutrient_Form } = require('../models/index');

const getForms = async (req, res) => {
    try {
        const results = await Nutrient_Form.findAll();
        return res.json(results)

    } catch (error) {
        res.status(400).json(error.messsage)
    }
}