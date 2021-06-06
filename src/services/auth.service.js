import http from '~/config/http'

const authService = async (data) => {
  const result = await http.post('/auth', data)
  return {
    ...result,
    usuarioDTO: {
      id: '60b7d8abe536e8407017542b',
      email: 'daniel@gmail.com',
      senha: 'daniel',
      nome: 'daniel',
      tipoUsuario: 2
    }
  }
}

export { authService }
