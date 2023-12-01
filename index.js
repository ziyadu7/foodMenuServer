const express = require('express')
const { connectDb } = require('./config/dbConfig')
const adminRouter = require('./router/adminRouter')
const userRouter = require('./router/userRouter')
const cors = require('cors')
const app = express()

app.use(express.json({ limit: '100mb', extended: true }))
app.use(cors('*'))
connectDb()
app.listen(process.env.PORT || 4000, () => {
    console.log('Server Started');
})

app.use('/admin', adminRouter)
app.use('/', userRouter)