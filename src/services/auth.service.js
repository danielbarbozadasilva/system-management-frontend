import http from '~/config/http'

const authService = async (data) => {
  const result = await http.post('/auth', data)
  return {
    ...result,
    usuarioDTO: {
      id: '60b7d8abe536e8407017542b',
      email: 'daniel80@gmail.com',
      senha: 'daniel',
      nome: 'asdas',
      tipoUsuario: 2,
      nomeFantasia: 'xyz'
    }
  }
}

export { authService }
