import express from 'express'
import homeController from '../controllers/home.controller.js'
import generController from '../controllers/gener.controller.js'
import detailController from '../controllers/detail.controller.js'
import pagesController from '../controllers/pages.controller.js'
import comicsListController from '../controllers/comicslist.controller.js'
import seachController from '../controllers/search.controller.js'

const comicsRouter = express.Router()

comicsRouter.get('/home', homeController)

comicsRouter.get('/gener/:slug{/:page}', generController)

comicsRouter.get('/search', seachController)

comicsRouter.get('/comics', comicsListController)

comicsRouter.get('/comics/:slug', detailController)

comicsRouter.get('/comics/:slug/:eslug', pagesController)

export default comicsRouter
