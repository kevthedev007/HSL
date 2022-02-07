const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const createError = require('http-errors')

const app = express();

//importing routes
const authRoutes = require('../routes/auth.route')
const adminRoutes = require('../routes/admin.route')
const clientRoutes = require('../routes/client.route')
const blogRoutes = require('../routes/blog.route')
const productRoutes = require('../routes/product.route')
const hslTestimonialRoutes = require('../routes/hsl_testimonial.route')
const healthTestimonialRoutes = require('../routes/health_testimonial.route')


//adding middlewares
app.use(cors({
  origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false, limit: '60mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(compression());

//routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to HSL API' })
})
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/client', clientRoutes)
app.use('/blog', blogRoutes)
app.use('/product', productRoutes)
app.use('/hsl-testimonial', hslTestimonialRoutes)
app.use('/health-testimonial', healthTestimonialRoutes)

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

module.exports = app;

