import express from 'express'
import homeController from '../controllers/home.controller.js'
import generController from '../controllers/gener.controller.js'
import detailController from '../controllers/detail.controller.js'

const comicsRouter = express.Router()

comicsRouter.get('/home', homeController)

comicsRouter.get('/gener/:slug{/:page}', generController)

comicsRouter.get('/comics/:slug', detailController)

export default comicsRouter
