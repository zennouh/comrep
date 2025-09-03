import appUrls from '../utils/constence/urls.js'
import HTTPSTATUSENUM from '../utils/enums/httpstatusenum.js'
import { fetchHtml } from '../utils/fetch/axios.js'
// import { fetchHtml } from '../utils/fetch/localax.js'
import * as cheerio from 'cheerio'
import { extractedHomeData } from '../utils/extractdata/homedata.js'

const comicsListController = async (req, res, next) => {
  try {
    // const page = req.query.page || 1
    // const order=  req.query.page || 1;
    const { page = 1, order = 'latest' } = req.query

    if (!checkValue(order)) {
      const error = new Error('Invalid filter type')
      error.statusCode = 400
      error.httpstatus = HTTPSTATUSENUM.FAIL
      return next(error)
    }

    const url = appUrls.home + 'page/' + page + '/?m_orderby=' + order
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

function checkValue(order) {
  return [
    'latest',
    'alphabet',
    'rating',
    'trending',
    'views',
    'new-manga',
  ].includes(order)
}

export default comicsListController
