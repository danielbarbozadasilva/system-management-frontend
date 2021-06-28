import http from '~/config/http'

const baseUrl = '/cliente'

export const getAll = () => http.get(baseUrl)
export const create = (data) => http.post(baseUrl, data)

// export const create = (data) => http.post(baseUrl, {...data, realizarLogin:true});
