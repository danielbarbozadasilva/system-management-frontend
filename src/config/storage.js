const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

const getToken = () => {
  const data = JSON.parse(localStorage.getItem(TOKEN_KEY))
  if (data && data.token) {
    return data.token
  }
  return false
}

const getUser = () => {
  const data = JSON.parse(localStorage.getItem(TOKEN_KEY))
  if (data && data.usuarioDTO) {
    return data.usuarioDTO
  }
  return false
}

const isAuthenticated = () => {
  console.log(getToken() !== false)
  return getToken() !== false
}

const clearStorage = () => localStorage.removeItem(TOKEN_KEY)

const saveAuth = (data) => localStorage.setItem(TOKEN_KEY, JSON.stringify(data))

export { saveAuth, getToken, getUser, isAuthenticated, clearStorage }
