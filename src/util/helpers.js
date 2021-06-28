import queryString from 'query-string'

export const parsedToQuery = (data) => queryString.stringify(data)
