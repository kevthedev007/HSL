if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = require('./server/index')

let port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started at port ${port}`)
})