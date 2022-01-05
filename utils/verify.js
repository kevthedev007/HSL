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
const admin_role = async (req, res, next) => {

    try {
        const admin = await User.findOne({ where: { id: req.user.id, roleId: 4 } })

        if (admin) {
            next()
        } else {
            return res.status(403).send('Page restricted! Admin role required!')
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}

//TODO: principal role


module.exports = { verifyToken, admin_role }