import appUrls from '../utils/constence/urls.js'
import HTTPSTATUSENUM from '../utils/enums/httpstatusenum.js'
// import { fetchHtml } from '../utils/fetch/axios.js'
import { fetchHtml } from '../utils/fetch/localax.js'
import * as cheerio from 'cheerio'
import extractDetail from '../utils/extractdata/extractdetail.js'

const detailController = async (req, res, next) => {
  try {
    const { slug } = req.params
    if (!slug) {
      const error = new Error('gener is required in the path')
      error.statusCode = 400
      error.httpstatus = HTTPSTATUSENUM.ERROR
      return next(error)
    }
    const url = appUrls.detail + `/${slug}/`
    const html = await fetchHtml(url)
    const $ = cheerio.load(html)

    const extractedData = extractDetail($)

    res.status(200).json(extractedData)
  } catch (error) {
    error.statusCode ||= 500
    error.httpstatus || HTTPSTATUSENUM.ERROR
    error.message ||= 'Internal Server Error'
    next(error)
  }
}

export default detailController
