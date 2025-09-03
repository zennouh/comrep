import HTTPSTATUSENUM from '../enums/httpstatusenum.js'

const extractPages = ($) => {
  try {
    const pages = $('div[class*="page-break"]')
      .map((i, el) => {
        return {
          number: $(el).children('img').attr('src').trim(),
          image: $(el).children('img').attr('id').trim(),
        }
      })
      .get()
    return {
      status: HTTPSTATUSENUM.SUCCESS,
      data: pages,
    }
  } catch (error) {
    throw error
  }
}

export default extractPages
