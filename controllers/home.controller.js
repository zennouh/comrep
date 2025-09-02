import appUrls from '../utils/constence/urls.js'
import HTTPSTATUSENUM from '../utils/enums/httpstatusenum.js'
import fetchHtml from '../utils/fetch/axios.js'
import * as cheerio from 'cheerio'
import extractedHomeData from '../utils/extractdata/homedata.js'

const homeController = async (req, res, next) => {
  try {
    const html = await fetchHtml(appUrls.home)
    const $ = cheerio.load(html)
    const extractedData = extractedHomeData($)

    res.status(200).json({
      status: HTTPSTATUSENUM.SUCCESS,
      data: extractedData,
    })
  } catch (error) {
    error.statusCode ||= 500
    error.httpstatus || HTTPSTATUSENUM.ERROR
    error.message ||= 'Internal Server Error'
    next(error)
  }
}

export default homeController
