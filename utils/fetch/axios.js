import axios, { AxiosError } from 'axios'

export default fetchHtml = async (url) => {
  try {
    const response = await axios.get(url)
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
