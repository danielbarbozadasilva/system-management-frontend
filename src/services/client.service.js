import http from '~/config/http'

const baseUrl = '/client'

export const ServiceListAllClient = () => http.get(baseUrl)

export const ServiceSearchByIdClient = id => http.get(`${baseUrl}/${id}`)

export const ServiceCreateClient = data => http.post(baseUrl, data)
