import appUrls from '../utils/constence/urls.js'
import HTTPSTATUSENUM from '../utils/enums/httpstatusenum.js'
import { fetchHtml } from '../utils/fetch/axios.js'
// import { fetchHtml } from '../utils/fetch/localax.js'
import * as cheerio from 'cheerio'
import extractSearchData from '../utils/extractdata/extractsearch.js'

const seachController = async (req, res, next) => {
  try {
    const page = req.query.page || 1
    const q = req.query.q || ''
    const url = appUrls.home + 'page/' + page
    // console.log(url)

    const html = await fetchHtml(url, q)

    const $ = cheerio.load(html)

    const extractedData = extractSearchData($)

    res.status(200).json(extractedData)
  } catch (error) {
    error.statusCode ||= 500
    error.httpstatus || HTTPSTATUSENUM.ERROR
    error.message ||= 'Internal Server Error'
    next(error)
  }
}

export default seachController
