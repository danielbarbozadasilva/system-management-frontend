import http from '~/config/http'

const baseUrl = '/produto'

const transformarURL =(objeto)=>{
  let urlQuery = ''  
  if(objeto){
      if(objeto.nomeLike){
        urlQuery += '/?nomeLike='+objeto.nomeLike
      }
    }
    return urlQuery
}

export const getAll = (objeto) => http.get(`${baseUrl}${transformarURL(objeto)}`)

export const remove = (id) => http.delete(`${baseUrl}/${id}`)

export const create = (fornecedorId, data, config = {}) =>
  http.post(`fornecedor/${fornecedorId}/produto`, data, config)

export const getAllProdutoCategoria = (id) =>
  http.get(`${baseUrl}/advanced/categoria/${id}`)
