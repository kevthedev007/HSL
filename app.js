const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors')

const app = express();

//importing routes
const authRoutes = require('./routes/authRoutes')



//adding middlewares
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false, limit: '60mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(compression())




//routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to HSL API' })
})
app.use('/auth', authRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    res.status(404).json(`404: ${error.message}`)
})




let port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})
