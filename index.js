import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import studyTimeRouter from './routes/studyTimeRoute.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/studyTimes', studyTimeRouter)

const PORT = process.env.PORT || 8000

mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    app.listen(PORT, console.log(`Serer running on port: ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
  })
