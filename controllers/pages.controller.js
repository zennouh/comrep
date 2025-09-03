import appUrls from '../utils/constence/urls.js'
import HTTPSTATUSENUM from '../utils/enums/httpstatusenum.js'
import { fetchHtml } from '../utils/fetch/localax.js'
// import { fetchHtml } from '../utils/fetch/axios.js'
import * as cheerio from 'cheerio'
import extractPages from '../utils/extractdata/extractpages.js'

const pagesController = async (req, res, next) => {
  try {
    const { slug, eslug } = req.params
    if (!slug || !eslug) {
      const error = new Error('gener is required in the path')
      error.statusCode = 400
      error.httpstatus = HTTPSTATUSENUM.ERROR
      return next(error)
    }
    const url = appUrls.gener + `/${slug}/` + `${eslug}/`
    const html = await fetchHtml(url)
    const $ = cheerio.load(html)

    const extractedData = extractPages($)

    res.status(200).json(extractedData)
  } catch (error) {
    error.statusCode ||= 500
    error.httpstatus || HTTPSTATUSENUM.ERROR
    error.message ||= 'Internal Server Error'
    next(error)
  }
}

export default pagesController
