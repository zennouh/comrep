import axios, { AxiosError } from 'axios'

export const fetchHtml = async (url, query) => {
  try {
    let response
    if (!query) {
      response = await axios.get(url)
    } else {
      const config = {
        params: { s: query },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          Referer: 'https://marmota.me/',
          'Cache-Control': 'no-cache',
        },
      }
      response = await axios.get(url, config)
    }

    return response.data
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      error.statusCode ||= error.response.status
      error.httpstatus || HTTPSTATUSENUM.ERROR
      error.message ||= `Error in fetching, ${error.response.message}`
    }
    throw error
  }
}
