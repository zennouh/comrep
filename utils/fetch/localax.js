import fs from 'fs'

export const fetchHtml = async (url) => {
  try {
    const data = fs.readFileSync('./index.html', 'utf-8')
    return data
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      error.statusCode ||= error.response.status
      error.httpstatus || HTTPSTATUSENUM.ERROR
      error.message ||= `Error in fetching, ${error.response.message}`
    }
    throw error
  }
}
