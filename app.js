import express from 'express'
import HTTPSTATUSENUM from './utils/enums/httpstatusenum.js'
import comicsRouter from './routes/comics.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../'))

app.use('/api/v1', comicsRouter)

app.all('/{*any}', (req, res, next) => {
  res.status(404).json({
    status: HTTPSTATUSENUM.FAIL,
    message: `Route ${req.url}, with ${req.method} method, not found`,
  })
})

app.use((error, req, res, next) => {
  error.statusCode ||= 500
  error.httpstatus || HTTPSTATUSENUM.ERROR
  error.message ||= 'Internal Server Error'
  res.status(error.statusCode).json({
    status: error.httpstatus,
    message: error.message,
  })
})

export default app
