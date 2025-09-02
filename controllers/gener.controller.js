import appUrls from '../utils/constence/urls.js'
import HTTPSTATUSENUM from '../utils/enums/httpstatusenum.js'
import { fetchHtml } from '../utils/fetch/axios.js'
// import { fetchHtml } from '../utils/fetch/localax.js'
import * as cheerio from 'cheerio'
import { extractedHomeData } from '../utils/extractdata/homedata.js'

const generController = async (req, res, next) => {
  try {
    const { page = 1, slug } = req.params
    if (!slug) {
      const error = new Error('gener is required in the path')
      error.statusCode = 400
      error.httpstatus = HTTPSTATUSENUM.ERROR
      return next(error)
    }
    const url = appUrls.gener + `/${slug}/` + 'page/' + page
    const html = await fetchHtml(url)
    const $ = cheerio.load(html)

    const extractedData = extractedHomeData($)

    res.status(200).json(extractedData)
  } catch (error) {
    error.statusCode ||= 500
    error.httpstatus || HTTPSTATUSENUM.ERROR
    error.message ||= 'Internal Server Error'
    next(error)
  }
}

export default generController
