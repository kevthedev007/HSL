const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const verifyToken = (req, res, next) => {
    if (!req.headers['authorization']) return res.status(401).send('Access Denied!')
    const token = req.headers['authorization']

    if (!token) return res.status(401).send('Access Denied!')

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = user;
        next()
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
}

//TODO: admin role

//TODO: principal role


module.exports = { verifyToken }