import HTTPSTATUSENUM from '../enums/httpstatusenum.js'

const extractSearchData = ($) => {
  try {
    // console.log($('div.search-wrap').html())
    const nextPage =
      $('div[class=c-blog__inner] > nav')
        .find('div.nav-links')
        .find("div[class*='nav-previous']").length !== 0

    const comics = $('div[id*="loop-content"]')
      .find("div[id*='post-']")
      .map((i, el) => {
        const element = $(el)

        // title
        const titleEl = element.find('.post-title h4 a')
        const title = titleEl.text().trim()

        // slug (take last part of URL path)
        const href = titleEl.attr('href') || ''
        const slug = href.split('/').filter(Boolean).pop() || null

        // thumbnail
        const imgEl = element.find('.c-blog__thumbnail img')
        const thumbnail = imgEl.attr('data-src') || imgEl.attr('src') || null

        // id
        const postId = element.attr('id')?.replace('post-', '') || null

        return {
          id: postId,
          title,
          slug,
          thumbnail,
        }
      })
      .get()

    return {
      status: HTTPSTATUSENUM.SUCCESS,
      nextPage,
      data: comics,
    }
  } catch (error) {
    throw error
  }
}

export default extractSearchData
