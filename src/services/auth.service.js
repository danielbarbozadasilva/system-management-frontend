import http from '~/config/http'

const authService = async (data) => {
  const result = await http.post('/auth', data)
  return {
    ...result,
    usuarioDTO: {
      id: '60a271b13a6f75319c90b65f',
      email: 'daniel@gmail.com',
      nome: 'daniel',
      tipoUsuario: 2
    }
  }
}

export { authService }
