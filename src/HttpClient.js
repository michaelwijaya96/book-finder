import axios from "axios"

const HttpClient = {
  get: (path, headers = null, params = null) => {
    return axios
      .get(`${path}`, {
        headers: headers,
        params: params,
        withCredentials: false,
      })
      .then((res) => {
        return Promise.resolve(res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}

export default HttpClient
