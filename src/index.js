const express = require('express')
const app = express()
const staffRouter = require('./routes/staff')
const historyRouter = require('./routes/history')
const patientRouter = require('./routes/patient')
const studentRouter = require('./routes/student')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(staffRouter)
app.use(historyRouter)
app.use(patientRouter)
app.use(studentRouter)

app.listen(port, () => {
    console.log('Server now up and running on port ' + port)
    console.log(process.env.PORT)
    console.log(process.env.JWT_SECRET)
    console.log(process.env.MONGODB_URL)
})