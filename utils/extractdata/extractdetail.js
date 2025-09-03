import HTTPSTATUSENUM from '../enums/httpstatusenum.js'

import path from 'path'

const extractDetail = ($) => {
  try {
    const _comicInfo = $('div.site-content > div').children('div').eq(0)
    const _comicEpisodes = $('div.site-content > div').children('div').eq(1)
    const _mainInfo = _comicInfo.find("div[class*='tab-summary']")
    const info = _mainInfo.find('div.summary_content_wrap')

    const data = {}

    // 📌 Title
    data.title =
      info.find('.rate-title').attr('title') ||
      info.find('.rate-title').text().trim()

    // 📌 Rating
    data.ratingValue = info.find('#averagerate').text().trim()
    data.bestRating = info.find('[property="bestRating"]').text().trim()
    data.ratingCount = info.find('#countrate').text().trim()

    // 📌 Rank & Views
    data.rank = info
      .find('h5:contains("Rank")')
      .parent()
      .next('.summary-content')
      .text()
      .trim()

    // 📌 Alternative Name
    data.altName = info
      .find('h5:contains("Nombre alternativo")')
      .parent()
      .next('.summary-content')
      .text()
      .trim()

    // 📌 Authors
    data.authors = []
    info
      .find('h5:contains("Autores")')
      .parent()
      .parent()
      .find('div.summary-content')
      .each((i, el) => {
        data.authors.push({
          name: $(el).text().trim(),
          url: $(el).attr('href'),
        })
      })

    // 📌 Artists
    data.artists = []

    info
      .find('h5:contains("Artistas")')
      .parent()
      .parent()
      .find('div.summary-content')
      .each((i, el) => {
        data.artists.push({
          name: $(el).text().trim(),
          url: $(el).attr('href'),
        })
      })

    // 📌 Genres
    data.genres = []
    info
      .find('h5:contains("Género")')
      .parent()
      .parent()
      .find('div.summary-content')
      .each((i, el) => {
        data.genres.push({
          name: $(el).text().trim(),
          url: $(el).attr('href'),
        })
      })

    // 📌 Type
    data.type = info
      .find('h5:contains("Tipo")')
      .parent()
      .next('.summary-content')
      .text()
      .trim()

    // 📌 Publication Year
    data.publication = info
      .find('h5:contains("Publicación")')
      .parent()
      .parent()
      .find('.summary-content')
      .text()
      .trim()

    // 📌 Status
    data.status = info
      .find('h5:contains("Estado")')
      .parent()
      .next('.summary-content')
      .text()
      .trim()

    // 📌 Description / Excerpt
    data.excerpt = info
      .find('.manga-excerpt p')
      .map((i, el) => $(el).text().trim())
      .get()
      .join('\n')

    data.image = _mainInfo.find('div.summary_image').find('img').attr('src')

    const episodes = _comicEpisodes
      .find("li[class*='wp-manga-chapter']")
      .map((i, el) => {
        const number = $(el)
          .find('a')
          .text()
          .trim()
          .match(/#\d+(.\d)?/)[0]
          .replace('#', '')

        const slug = path.basename($(el).find('a').attr('href').trim())
        return {
          number,
          slug,
        }
      })
      .get()
    data.episodes = episodes
    // const title = _comicInfo.find('div.post-title > h1').text().trim()

    return {
      status: HTTPSTATUSENUM.SUCCESS,
      data: data,
    }
  } catch (error) {
    throw error
  }
}
export default extractDetail
