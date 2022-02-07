const axios = require('axios');

const verify = async (req, res, next) => {
  console.log(req.body.ref)
  const ref = req.body.ref;
  const MySecretKey = process.env.PAYSTACK_SECRET;

  try {
    const data = await axios({
      url: 'https://api.paystack.co/transaction/verify/' + ref,
      headers: {
        Authorization: MySecretKey
      }
    })

    let response = data.data;

    if (response.data.status == "failed") {
      return res.status(200).json({ status: false })
    }

    if (response.data.status == "success") {
      const { reference, amount } = response.data;
      const { email } = response.data.customer;
      const { id, purpose, description } = response.data.metadata;

      //check if ref already exists in payment
      const checkReference = await Payment.findOne({ where: { reference } })
      if (checkReference) {
        console.log(reference)
        return res.status(200).json({ status: true })
      } else {
        //add to database

      }
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error.message
    })
  }
}


const webhook = async (req, res) => {
  const event = req.body
  try {
    if (event.event == "charge.success" && event.data.status == "failed") {
      return res.status(200).json({ status: false })
    }

    if (event.event == "charge.success" && event.data.status == "success") {
      const { reference, amount } = event.data;
      const { email } = event.data.customer;
      const { id, purpose, description } = event.data.metadata;

      //check if ref already exists in payment
      const checkReference = await Payment.findOne({ where: { reference } })
      if (checkReference) {
        console.log(reference)
        return res.status(200).json({ status: true })
      } else {
        //add to database

      }
    }

  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.mesage
    })
  }
}

module.exports = { verify, webhook }