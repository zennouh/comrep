import express from 'express'
import homeController from '../controllers/home.controller'

const comicsRouter = express.Router()

comicsRouter.get('/home', homeController)

export default comicsRouter
