import HTTPSTATUSENUM from '../enums/httpstatusenum.js'

export const extractedHomeData = ($) => {
  try {
    const nextPage =
      $('div[role=tabpanel] > nav')
        .find('div.nav-links')
        .find("div[class*='nav-previous']").length !== 0
    const comics = $('div[role=tabpanel] > div')
      .children('div.page-listing-item')
      .find('div[class*="page-item-detail"]')
      .map((i, el) => {
        const _divImage = $(el).children("div[id*='manga-item']")
        const _infoDiv = $(el).children('div.item-summary')
        const _link = _divImage.children('a').attr('href')

        const image = _divImage.find('a > img').attr('data-src')
        const chapterNumber = _divImage
          .find('a > span')
          .text()
          .trim()
          .replace(/chapter/gi, '')
          .trim()
        const chapterSlug = _link.match(/\/([^\/]+)\/?$/)[1]

        const comicName = _infoDiv.children('div').eq(0).find('a').text().trim()
        const comicSlug = _infoDiv
          .children('div')
          .eq(0)
          .find('a')
          .attr('href')
          .trim()
          .match(/\/([^\/]+)\/?$/)[1]
        const comicRate = _infoDiv
          .children('div')
          .eq(1)
          .find("span[class*='score']")
          .text()
          .trim()

        return {
          image,
          chapterNumber,
          chapterSlug,
          comicName,
          comicSlug,
          comicRate,
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
